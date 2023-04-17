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
  const community_id = req.query.community_id;
  try {
    const [result] = await pool.query(
      `select * from section where community_id = ?`,
      [community_id]
    );
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};
