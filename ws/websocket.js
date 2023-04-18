const WebSocket = require('ws');

export default function handler(req, res) {
    try {
        const wss = new WebSocket.Server({ port: 8080 });
        wss.on('connection', function connection(ws) {
            ws.on('message', function incoming(message) {
                ws.send(message);
            });
        });
        return res.status(200).json({ succes: 'Web socket iniciado' });
    } catch (error) {
        console.log(error)
        return res.status(200).json({ fail: error });
    }
}
