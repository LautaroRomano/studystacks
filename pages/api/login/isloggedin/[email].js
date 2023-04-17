import { pool } from "../../../../config/database";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await get(req, res);
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

