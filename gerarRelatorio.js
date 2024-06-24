// src/gerarRelatorio.js
function gerarRelatorio(partidas) {
    partidas.forEach((partida, index) => {
        console.log(`game_${index + 1}:`);
        console.log(`  total_kills: ${partida.totalKills}`);
        console.log(`  jogadores: ${partida.jogadores.sort().join(', ')}`);
        console.log('  kills:');
        for (const [jogador, kills] of Object.entries(partida.kills)) {
            console.log(`    ${jogador}: ${kills}`);
        }
        console.log('  Mortes por jogador:');
        for (const [meio, total] of Object.entries(partida.killsPorMeio)) {
            console.log(`    ${meio}: ${total}`);
        }
        console.log('  Ranking:');
        const assassinosOrdenados = Object.entries(partida.kills)
            .filter(([jogador, kills]) => kills > -5) // Afim de desconsiderar outros itens como assasinos (lava/suicide) e mostrar quem está negativo
            .sort((a, b) => b[1] - a[1]);

        assassinosOrdenados.forEach(([jogador, kills]) => {
            console.log(`    ${jogador} matou ${kills} vezes`);
        });
    });
}

module.exports = gerarRelatorio;
