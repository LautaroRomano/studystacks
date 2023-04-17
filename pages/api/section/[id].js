import { pool } from '../../../config/database'

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
    const id = req.query.id
    try {
        const [result] = await pool.query(`SELECT * FROM section WHERE section_id = ?`, [id]);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
};

const put = async (req, res) => {
    const id = req.query.id
    const { section_name, section_description, creation_date, creator_user_id, community_id } = req.body

    try {
        const [result] = await pool.query(`UPDATE section SET
        section_name=?, 
        section_description=?,
        creation_date=?, 
        creator_user_id=?, 
        community_id=?
    WHERE section_id = ?`,
            [section_name, section_description, creation_date, creator_user_id, community_id, id])
        return res.status(200).json(result)
    } catch (error) {
        console.log({ error })
    }

};

const deletef = async (req, res) => {
    const id = req.query.id
    try {
        const [result] = await pool.query(`DELETE FROM section WHERE section_id = ?`, [id]);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
};
