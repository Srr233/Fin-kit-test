import http from 'http';
import { getFile, __dirname } from './helpers.js';

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';
process.env.PORT = PORT;
process.env.HOST = HOST;

const server = http.createServer(async (req, res) => {
    if (req.method == 'GET' && req.url == '/') {
        const loader = '<script src="loader.js"></script>';
        res.writeHead(200, {
            'Content-Type': 'text/html',
            'Content-Length': Buffer.byteLength(loader),
        }).end(loader);
    } else {
        const endPath = req.url.split('/');
        let filename = endPath.length == 1 ? 'loader.js' : endPath.pop();
        const result = await getFile(__dirname, filename);
        if (!result) res.writeHead(404).end();
        res.writeHead(200, {
            'Access-Control-Allow-Origin': 'http://127.0.0.1:3000',
            'Content-Length': Buffer.byteLength(result)
        }).end(result);
    }
})

server.listen(PORT, HOST, () => {
    process.stdout.write(`Server has started on ${PORT}`);
})