import { pool } from "../../../../config/database";

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "POST":
        return await post(req, res);
    }
  } catch (error) {
    console.log(error);
  }
}

const post = async (req, res) => {
  const user_id = req.query.user_id;
  const { message, section_id, message_reply_to } = req.body
  try {
    const [chat] = await pool.query(
      `select * from chats where section_id = ?`,
      [section_id]
    );
    if (chat[0] && chat[0].chat_id) {
      const [msg] = await pool.query(
        `insert into messages values(0,now(),?,?,?,?)`,
        [message, chat[0].chat_id, user_id, message_reply_to]
      );
      return res.status(200).json({ succes: true, message_id: msg.insertId });
    }
  } catch (error) {
    console.log(error);
  }
};
