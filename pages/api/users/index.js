import { pool } from "../../../config/database";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await get(req, res);
    case "POST":
      return await post(req, res);
  }
}

const get = async (req, res) => {
  try {
    const [result] = await pool.query(`SELECT * FROM users`);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

const post = async (req, res) => {
  const { username, email, password, last_login_date, image } = req.body;

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    const [result] = await pool.query(
      `INSERT INTO users SET registration_date=now(), ?`,
      {
        username,
        email,
        password: hashedPassword,
        last_login_date,
        image,
      }
    );
    const [user] = await pool.query(`SELECT * FROM users where user_id = ?`, [
      result.insertId,
    ]);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};
