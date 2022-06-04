const http = require('http');

http
    .createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'application/json' })

        if (req.url === '/usuario') {
            res.end(JSON.stringify({
                message: 'rota de usuario'
            }))
        } 
        
        if (req.url === '/produto') {
            res.end(JSON.stringify({
                message: 'rota de produto'
            }))
        }

        res.end(JSON.stringify({
            message: 'qlqr outra rota'
        }))
    })
    .listen(3000, () => console.log("server rodando na porta 3000"))