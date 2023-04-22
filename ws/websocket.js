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
                const botMessage = await botQuery(mensajeBot)
                for (const connection of connections) {
                  const sendObj = {
                    message_id: Math.floor(Math.random() * 100000),
                    date: new Date(),
                    message: botMessage,
                    chat_id: Math.floor(Math.random() * 100000),
                    user_id: Math.floor(Math.random() * 100000),
                    username: 'Bot',
                    image: 'https://www.gacelaweb.com/wp-content/uploads/que_es_un_bot_en_internet.jpg',
                    section_name: '',
                    section_id: mensaje.section_id,
                  }
                  connection.send(JSON.stringify(sendObj));
                }
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
