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
  const section_id = req.query.section_id;
  try {
    const [result] = await pool.query(
      `select posts.*,us.username,us.image,com.community_name,com.community_id,sec.section_name,sec.section_id  
      from posts 
      join section as sec on sec.section_id = posts.section_id
      join communities as com on com.community_id = sec.community_id
      join communities_users as cu on cu.community_id = com.community_id
      join users as us on us.user_id = posts.creator_user_id
      where sec.section_id = ?`,
      [section_id]
    );
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};
