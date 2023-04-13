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
  const user_id = req.query.user_id;
  try {
    const [result] = await pool.query(
      `select com.* from communities as com 
      join communities_users as cu on cu.community_id = com.community_id
      where cu.user_id = ?`,
      [user_id]
    );
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};
