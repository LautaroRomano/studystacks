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
  const comment_id = req.query.comment_id;
  try {
    const [result] = await pool.query(
      `SELECT * FROM Votes WHERE comment_id = ?`,
      [comment_id]
    );
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
      `UPDATE Votes SET
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
    const [result] = await pool.query(`DELETE FROM Votes WHERE vote_id = ?`, [
      id,
    ]);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};
