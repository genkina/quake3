// src/analisarLog.js
const fs = require('fs');
const readline = require('readline');

// Regex para ler
const regexInicioJogo = /^\s*\d+:\d+\s+InitGame:/;
const regexMatar = /^\s*\d+:\d+\s+Kill:\s+\d+\s+\d+\s+\d+:\s+(.+?)\s+killed\s+(.+?)\s+by\s+(.+)/;

// Lista de tipos de morte
const tiposDeMorte = [
    'MOD_UNKNOWN',
    'MOD_SHOTGUN',
    'MOD_GAUNTLET',
    'MOD_MACHINEGUN',
    'MOD_GRENADE',
    'MOD_GRENADE_SPLASH',
    'MOD_ROCKET',
    'MOD_ROCKET_SPLASH',
    'MOD_PLASMA',
    'MOD_PLASMA_SPLASH',
    'MOD_RAILGUN',
    'MOD_LIGHTNING',
    'MOD_BFG',
    'MOD_BFG_SPLASH',
    'MOD_WATER',
    'MOD_SLIME',
    'MOD_LAVA',
    'MOD_CRUSH',
    'MOD_TELEFRAG',
    'MOD_FALLING',
    'MOD_SUICIDE',
    'MOD_TARGET_LASER',
    'MOD_TRIGGER_HURT',
    'MOD_GRAPPLE'
];

// Função ler log
function analisarLog(caminhoArquivo) {
    return new Promise((resolver, rejeitar) => {
        const partidas = [];
        let partidaAtual = null;

        const ll = readline.createInterface({
            input: fs.createReadStream(caminhoArquivo),
            output: process.stdout,
            terminal: false
        });

        ll.on('line', (linha) => {
            let tipoLinha = null;

            switch (true) {
                case regexInicioJogo.test(linha):
                    tipoLinha = 'InitGame';
                    break;
                case regexMatar.test(linha):
                    tipoLinha = 'Kill';
                    break;
                default:
                    tipoLinha = 'Item';
            }

            switch (tipoLinha) {
                case 'InitGame':
                    if (partidaAtual) {
                        partidas.push(partidaAtual);
                    }
                    partidaAtual = {
                        totalKills: 0,
                        jogadores: new Set(),
                        kills: {},
                        killsPorMeio: {}
                    };
                    // Zerar contador de kills
                    tiposDeMorte.forEach(tipo => {
                        partidaAtual.killsPorMeio[tipo] = 0;
                    });
                    break;
                case 'Kill':
                    let match = regexMatar.exec(linha);
                    let assassino = match[1];
                    let vitima = match[2];
                    let arma = match[3];

                    partidaAtual.totalKills += 1;

                    if (assassino !== '<world>') {
                        partidaAtual.jogadores.add(assassino);
                        partidaAtual.kills[assassino] = (partidaAtual.kills[assassino] || 0) + 1;
                    }
                    if (vitima !== '<world>') {
                        partidaAtual.jogadores.add(vitima);
                        partidaAtual.kills[vitima] = (partidaAtual.kills[vitima] || 0) - 1;
                    }

                    // Incrementar contador de kills por meio de morte
                    if (tiposDeMorte.includes(arma)) {
                        partidaAtual.killsPorMeio[arma] += 1;
                    }
                    break;
                case 'Item':
                    // chamar função para printar na tela do player caso bandeira capturada
                    break;
            }
        });

        ll.on('close', () => {
            if (partidaAtual) {
                partidas.push(partidaAtual);
            }
            // Converter Set para Array antes de retornar
            partidas.forEach(partida => {
                partida.jogadores = Array.from(partida.jogadores);
            });
            resolver(partidas);
        });

        ll.on('error', (err) => {
            rejeitar(err);
        });
    });
}

module.exports = analisarLog;
