import { pool } from "../../../config/database";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await get(req, res);
  }
}

const get = async (req, res) => {
  try {
    const [universities] = await pool.query(`SELECT * FROM universities`);
    const [careers] = await pool.query(`SELECT * FROM careers`);
    const [commissions] = await pool.query(`SELECT * FROM commissions`);
    return res.status(200).json({ universities, careers, commissions });
  } catch (error) {
    console.log(error);
  }
};
