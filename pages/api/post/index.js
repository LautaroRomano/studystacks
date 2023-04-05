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
        const [result] = await pool.query(`SELECT * FROM Posts`);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
}

const post = async (req, res) => {
    const { post_title, post_body, creation_date, creator_user_id, community_id, section_id } = req.body
    try {
        const [result] = await pool.query(`INSERT INTO Posts SET ?`, {
            post_title,
            post_body,
            creation_date,
            creator_user_id,
            community_id,
            section_id
        });
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
}