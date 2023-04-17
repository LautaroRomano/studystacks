import { pool } from "../../../../config/database";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await get(req, res);
  }
}

const get = async (req, res) => {
  try {
    const [result] = await pool.query(`
    SELECT p.*,us.username,us.image,com.community_name,com.community_id,sec.section_name,sec.section_id
    FROM posts p
    INNER JOIN (
        SELECT post_id, SUM(vote_value) as total_likes
        FROM votes
        WHERE creation_date >= DATE_SUB(NOW(), INTERVAL 7 DAY)
        GROUP BY post_id
        ORDER BY total_likes DESC
        LIMIT 10
    ) v ON p.post_id = v.post_id
      join section as sec on sec.section_id = p.section_id
      join communities as com on com.community_id = sec.community_id
      join communities_users as cu on cu.community_id = com.community_id
      join users as us on us.user_id = p.creator_user_id
    ORDER BY v.total_likes DESC
    `);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

