// Create web server
// Run: node comments.js
// Access: http://localhost:3000/

const http = require('http');

// Utiliza a porta definida pelo ambiente ou 3000 por padrão
const port = process.env.PORT || 3000;

// Função para tratar as requisições recebidas
const requestListener = (req, res) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

    // Rota principal
    if (req.url === '/' && req.method === 'GET') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Olá, mundo!\n');
    }
    // Rota de status para verificação de saúde
    else if (req.url === '/health' && req.method === 'GET') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }));
    }
    // Caso a rota não seja reconhecida
    else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Rota não encontrada\n');
    }
};

// Cria o servidor web
const server = http.createServer(requestListener);

// Tratamento de erros do servidor
server.on('error', (err) => {
    console.error('Erro no servidor:', err);
});

// Inicia o servidor
server.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}/`);
});

// Tratamento de exceções não capturadas
process.on('uncaughtException', (err) => {
    console.error('Exceção não capturada:', err);
    process.exit(1);
});

// Tratamento de rejeições não tratadas
process.on('unhandledRejection', (reason, promise) => {
    console.error('Rejeição não tratada:', reason);
});

