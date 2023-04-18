import { pool } from "../../../../config/database";

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "GET":
        return await get(req, res);
    }
  } catch (error) {
    console.log(error);
  }
}

const get = async (req, res) => {
  const section_id = req.query.section_id;
  try {
    const [result] = await pool.query(
      `select mes.*,us.username,us.image,sec.section_name,sec.section_id  
      from chats as chat 
      join messages as mes on mes.chat_id = chat.chat_id
      join section as sec on sec.section_id = chat.section_id
      join users as us on us.user_id = mes.user_id
      where sec.section_id = ?
      order by mes.date asc
      `,
      [section_id]
    );
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};
