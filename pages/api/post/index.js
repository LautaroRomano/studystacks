import { pool } from "../../../config/database";

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
    const [result] = await pool.query(`SELECT * FROM posts`);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

const post = async (req, res) => {
  const { post_title, post_body, creator_user_id, community_id, section_id } =
    req.body;
  try {
    const [result] = await pool.query(
      `INSERT INTO posts SET creation_date=now(), ?`,
      {
        post_title,
        post_body,
        creator_user_id,
        community_id,
        section_id,
      }
    );

    const { filesUploaded } = req.body;

    for (const file of filesUploaded) {
      await pool.query(`INSERT INTO post_files SET ?`, {
        post_id: result.insertId,
        path: file.path.substring(file.path.indexOf("/pdf")),
        file_name: file.originalName,
      });
    }

    return res.status(200).json({ succes: true });
  } catch (error) {
    console.log(error);
  }
};
