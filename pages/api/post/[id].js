import { pool } from "../../../config/database";

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "GET":
        return await get(req, res);
      case "PUT":
        return await put(req, res);
      case "DELETE":
        return await deletef(req, res);
    }
  } catch (error) {
    console.log(error);
  }
}

const get = async (req, res) => {
  const id = req.query.id;
  try {
    const [result] = await pool.query(
      `select posts.*,us.username,us.image,com.community_name,com.community_id,sec.section_name,sec.section_id 
      from posts 
      join section as sec on sec.section_id = posts.section_id
      join communities as com on com.community_id = sec.community_id
      join communities_users as cu on cu.community_id = com.community_id
      join users as us on us.user_id = posts.creator_user_id
      where posts.post_id = ?`,
      [id]
    );
    for (const post of result) {
      const [files] = await pool.query(
        `select * from post_files where post_id = ?`, [post.post_id]
      );
      post.files = files
    }
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

const put = async (req, res) => {
  const id = req.query.id;
  const {
    post_title,
    post_body,
    creation_date,
    creator_user_id,
    community_id,
    section_id,
  } = req.body;

  try {
    const [result] = await pool.query(
      `UPDATE posts SET
        post_title=?,
         post_body=?,
         creation_date=?,
         creator_user_id=?,
         community_id=?,
         section_id=?
         WHERE post_id = ?`,

      [
        post_title,
        post_body,
        creation_date,
        creator_user_id,
        community_id,
        section_id,
        id,
      ]
    );
    return res.status(200).json(result);
  } catch (error) {
    console.log({ error });
  }
};

const deletef = async (req, res) => {
  const id = req.query.id;
  try {
    const [result] = await pool.query(`DELETE FROM posts WHERE post_id = ?`, [
      id,
    ]);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};
