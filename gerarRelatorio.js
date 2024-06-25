// src/gerarRelatorio.js
function gerarRelatorio(partidas) {
    partidas.forEach((partida, index) => {
        console.log(`game_${index + 1}:`);
        console.log(`\n  total_kills: ${partida.totalKills}`);
        console.log(`\n  jogadores: ${partida.jogadores.sort().join(', ')}`);
        console.log('\n  kills:');
        for (const [jogador, kills] of Object.entries(partida.kills)) {
            console.log(`    ${jogador}: ${kills}`);
        }
        console.log('\n  Mortes por jogador: ');
        for (const [meio, total] of Object.entries(partida.killsPorMeio)) {
            console.log(`    ${meio}: ${total}`);
        }
        console.log('\n  Ranking: ');
        const assassinosOrdenados = Object.entries(partida.kills)
            .filter(([jogador, kills]) => kills > 0)
            .sort((a, b) => b[1] - a[1]);

        assassinosOrdenados.forEach(([jogador, kills]) => {
            console.log(`    ${jogador} matou ${kills} vezes. `);
        });
    });
}

module.exports = gerarRelatorio;
