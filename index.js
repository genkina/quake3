const gerarRelatorio = require('./controladores/controladorLog');

// Caminho para o arquivo de log (modifique conforme necessário)
const caminhoArquivo = './logs/qgames.log';

// Executar o parser e gerar o relatório
gerarRelatorio(caminhoArquivo);
