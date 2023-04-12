import { pool } from "../../../../config/database";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await get(req, res);
    case "POST":
      return await post(req, res);
  }
}

const get = async (req, res) => {
  const { email } = req.query;
  try {
    const [result] = await pool.query(`SELECT * FROM users where email = ?`, [
      email,
    ]);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

const post = async (req, res) => {
  const {
    community_name,
    community_description,
    creation_date,
    creator_user_id,
  } = req.body;
  try {
    const [result] = await pool.query(`INSERT INTO communities SET ?`, {
      community_name,
      community_description,
      creation_date,
      creator_user_id,
    });
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};
