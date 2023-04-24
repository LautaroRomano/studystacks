import { botQuery } from './botQuery'
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
          if (data.newMessage) {
            let mensaje = data.newMessage.message
            let index = mensaje.indexOf('@bot');
            if (index !== -1) {
              let mensajeBot = mensaje.substring(index + 5);
              (async function () {
                botQuery(mensajeBot, (data) => {
                  for (const connection of connections) {
                    connection.send(JSON.stringify(data));
                  }
                }, data.newMessage.chat_id)
              })();
            }
          }
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
