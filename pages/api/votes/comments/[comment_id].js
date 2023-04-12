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
  const comment_id = req.query.comment_id;
  try {
    const [result] = await pool.query(
      `SELECT * FROM votes WHERE comment_id = ?`,
      [comment_id]
    );
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};
