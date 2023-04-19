const WebSocket = require("ws");

const connections = new Set();

export default function handler(req, res) {
  try {
    const wss = new WebSocket.Server({ port: 8080 });

    wss.on("connection", function connection(ws, req) {
      connections.add(ws);

      ws.on("message", function incoming(message) {
        try {
          const data = JSON.parse(message);
          for (const connection of connections) {
            connection.send(JSON.stringify(data));
          }
        } catch (error) {
          console.log(error);
        }
      });

      ws.on("close", function close() {
        connections.delete(ws);
      });
    });

    return res.status(200).json({ succes: "Web socket iniciado" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ fail: error });
  }
}
