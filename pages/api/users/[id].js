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
        const [result] = await pool.query(`SELECT * FROM users WHERE user_id = ?`, [id]);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
};

const put = async (req, res) => {
    const id = req.query.id
    const { username, email, password, registration_date, last_login_date } = req.body

    try {
        const [result] = await pool.query(`UPDATE users SET
    username=?,
    email=?,
    password=?,
    registration_date=?,
    last_login_date=?
    WHERE user_id = ?`,
            [username, email, password, registration_date, last_login_date, id])
        return res.status(200).json(result)
    } catch (error) {
        console.log({ error })
    }

};

const deletef = async (req, res) => {
    const id = req.query.id
    try {
        const [result] = await pool.query(`DELETE FROM users WHERE user_id = ?`, [id]);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
};
