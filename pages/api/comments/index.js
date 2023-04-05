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
        const [result] = await pool.query(`SELECT * FROM Comments`);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
}

const post = async (req, res) => {
    const { comment_text, creation_date, creator_user_id, post_id } = req.body
    try {
        const [result] = await pool.query(`INSERT INTO Comments SET ?`, {
            comment_text,
            creation_date,
            creator_user_id,
            post_id
        });
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
}