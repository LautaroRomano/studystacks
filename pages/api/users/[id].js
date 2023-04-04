import {pool} from '../../../config/database'

export default async function handler (req,res){
    const id =req.query.id;

    switch(req.method){
        case 'GET':
            const [result] = await pool.query('SELECT * FROM users WHERE id=?', [id]);
            return res.status(200).json(result);
    }
}