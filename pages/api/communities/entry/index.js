import { pool } from "../../../../config/database";

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "POST":
        return await post(req, res);
      case "PATCH":
        return await deletef(req, res);
    }
  } catch (error) {
    console.log(error);
  }
}

const post = async (req, res) => {
  const { user_id, community_id } = req.body;

  try {
    const [result] = await pool.query(
      `INSERT INTO communities_users SET entry_date=now(), ?`,
      { user_id, community_id }
    );
    return res.status(200).json(result);
  } catch (error) {
    console.log({ error });
  }
};

const deletef = async (req, res) => {
  const { user_id, community_id } = req.body;

  try {
    const [result] = await pool.query(
      `DELETE FROM communities_users where user_id=? and community_id=?`,
      [user_id, community_id]
    );
    return res.status(200).json(result);
  } catch (error) {
    console.log({ error });
  }
};
