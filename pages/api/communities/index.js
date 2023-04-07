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
    creation_date,
    creator_user_id,
  } = req.body;
  try {
    const [result] = await pool.query(`INSERT INTO Communities SET ?`, {
      community_name,
      community_description,
      creation_date: new Date(creation_date).toISOString().slice(0, 10),
      creator_user_id,
    });
    pool.query(`INSERT INTO Section SET ?`, {
      section_name: "Inicio",
      section_description: `Pagina de inicio de la comunidad ${community_name}`,
      creation_date: new Date(creation_date).toISOString().slice(0, 10),
      creator_user_id,
      community_id: result.insertId,
    });
    pool.query(`INSERT INTO communities_users SET ?`, {
      community_id: result.insertId,
      user_id: creator_user_id,
      entry_date: new Date(creation_date).toISOString().slice(0, 10),
    });
    return res.status(200).json({ succes: true });
  } catch (error) {
    console.log(error);
  }
};
