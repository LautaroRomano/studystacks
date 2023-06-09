import { pool } from "../../../config/database";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await get(req, res)
    case "POST":
      return await post(req, res)

  }
}

const get = async (req, res) => {
  try {
    const [result] = await pool.query(`SELECT * FROM section`);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
}

const post = async (req, res) => {
  const { section_name, section_description, creator_user_id, community_id } = req.body
  try {
    const [result] = await pool.query(`INSERT INTO Section SET creation_date=now(), ?`, {
      section_name,
      section_description,
      creator_user_id,
      community_id
    });
    await pool.query(`insert into chats values(0,?)`, [
      result.insertId
    ]);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
}