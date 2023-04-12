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
        const [result] = await pool.query(`SELECT * FROM communities WHERE community_id = ?`, [id]);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
};

const put = async (req, res) => {
    const id = req.query.id
    const { community_name, community_description, creation_date, creator_user_id } = req.body

    try {
        const [result] = await pool.query(`UPDATE communities SET
    community_name=?,
    community_description=?,
    creation_date=?,
    creator_user_id=?
    WHERE community_id = ?`,
            [community_name, community_description, creation_date, creator_user_id, id])
        return res.status(200).json(result)
    } catch (error) {
        console.log({ error })
    }

};

const deletef = async (req, res) => {
    const id = req.query.id
    try {
        const [result] = await pool.query(`DELETE FROM communities WHERE community_id = ?`, [id]);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
};
