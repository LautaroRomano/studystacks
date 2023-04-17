import { pool } from "../../../../config/database";

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "GET":
        return await get(req, res);
      case "PUT":
        return await put(req, res);
      case "DELETE":
        return await deletef(req, res);
    }
  } catch (error) {
    console.log(error);
  }
}

const get = async (req, res) => {
  const post_id = req.query.post_id;
  try {
    const [result] = await pool.query(`SELECT * FROM votes WHERE post_id = ?`, [
      post_id,
    ]);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

const put = async (req, res) => {
  const post_id = req.query.id;
  const { vote_value, creation_date, creator_user_id, comment_id } = req.body;

  try {
    const [result] = await pool.query(
      `UPDATE votes SET
        vote_value=?,
        creation_date=?,
        creator_user_id=?,
        comment_id=?
    WHERE vote_id = ?`,
      [vote_value, creation_date, creator_user_id, comment_id, id]
    );
    return res.status(200).json(result);
  } catch (error) {
    console.log({ error });
  }
};

const deletef = async (req, res) => {
  const post_id = req.query.id;
  try {
    const [result] = await pool.query(`DELETE FROM votes WHERE vote_id = ?`, [
      id,
    ]);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};
