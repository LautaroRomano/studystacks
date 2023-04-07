import { pool } from "../../../config/database";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await get(req, res)
    case "POST":
      return await post(req, res)

  }
}

  const get = async (req,res) => {
    try {
      const [result] = await pool.query(`SELECT * FROM Votes`);
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
    }
  }

  const post = async (req,res) => {
    const { vote_value, creator_user_id, post_id, comment_id } = req.body
    try {
      const [result] = await pool.query(`INSERT INTO Votes SET creation_date=now(), ?`,{
        vote_value, 
        creator_user_id, 
        post_id, 
        comment_id
      });
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
    }
  }