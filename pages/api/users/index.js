import { pool } from "../../../config/database";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      const [result] = await pool.query("SELECT * FROM users");
      return res.status(200).json(result);
  }
}
