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
    const [result] = await pool.query(`SELECT * FROM Communities`);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

const post = async (req, res) => {
  const {
    community_name,
    community_description,
    creator_user_id,
  } = req.body;
  try {
    const [result] = await pool.query(
      `INSERT INTO Communities SET creation_date=now(), ?`,
      {
        community_name,
        community_description,
        creator_user_id,
      }
    );
    pool.query(`INSERT INTO Section SET creation_date=now(), ?`, {
      section_name: "Inicio",
      section_description: `Pagina de inicio de la comunidad ${community_name}`,
      creator_user_id,
      community_id: result.insertId,
    });
    pool.query(`INSERT INTO communities_users SET entry_date=now(), ?`, {
      community_id: result.insertId,
      user_id: creator_user_id,
    });
    return res.status(200).json({ succes: true });
  } catch (error) {
    console.log(error);
  }
};
