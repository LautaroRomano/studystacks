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
  const post_id = req.query.post_id;
  try {
    const [result] = await pool.query(
      `select comments.*,us.username,us.image from comments 
      join users as us on us.user_id = comments.creator_user_id
      where comments.post_id = ?`,
      [post_id]
    );
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};
