import handler from '../../ws/websocket';

export default function websocketHandler(req, res) {
    if (req.method === 'GET') {
        handler(req, res);
    } else {
        res.status(405).end();
    }
}
