import { pool } from "../../../../../config/database";

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
      `SELECT COUNT(comments.comment_id) AS total_comments
      FROM comments 
      JOIN users AS us ON us.user_id = comments.creator_user_id
      WHERE comments.post_id = ?`,
      [post_id]
    );
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};
