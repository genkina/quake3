const analisarLog = require('./analisarLog');
const gerarRelatorio = require('./gerarRelatorio');

const caminhoArquivo = '../logs/qgames.log'; // Ajuste o caminho conforme necessário

analisarLog(caminhoArquivo)
    .then(partidas => gerarRelatorio(partidas))
    .catch(err => console.error('Erro ao analisar o arquivo de log:', err));
