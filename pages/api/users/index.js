import { pool } from "../../../config/database";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await get(req, res)
    case "POST":
      return await post(req, res)

  }
}

  const get = async () => {
    try {
      const [result] = await pool.query(`SELECT * FROM Users`);
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
    }
  }

  const post = async () => {
    const { username, email, password, last_login_date } = req.body
    try {
      const [result] = await pool.query(`INSERT INTO Users SET ?`,{
          username,
          email,
          password,
          last_login_date
      });
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
    }
  }