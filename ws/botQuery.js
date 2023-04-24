import axios from 'axios';
import { pool } from '../config/database'

export const botQuery = async (message, send, chat_id) => {
    try {
        let config = {
            headers: {
                Authorization: 'Bearer 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',
            }
        }
        axios.post('https://api.openai.com/v1/completions', {
            model: "text-davinci-003",
            prompt: `Actua como si fueras un profesor universitario y respondeme esto: ${message}`,
            temperature: 1,
            max_tokens: 1000
        }, config)
            .then(async ({ data }) => {
                const botMss = data.choices[0].text

                const [bot] = await pool.query(
                    `select * from users where username = ?`,
                    ['bot']
                );
                if (chat_id) {
                    const [mss] = await pool.query(
                        `insert into messages values(0,now(),?,?,?)`,
                        [botMss, chat_id, bot[0].user_id]
                    );
                    const [newMessage] = await pool.query(
                        `select mes.*,us.username,us.image,sec.section_name,sec.section_id  
                        from chats as chat 
                        join messages as mes on mes.chat_id = chat.chat_id and mes.message_id = ?
                        join section as sec on sec.section_id = chat.section_id
                        join users as us on us.user_id = mes.user_id
                        `,
                        [mss.insertId]
                    );
                    send({ newMessage: newMessage[0] })
                }

            })
    } catch (error) {
        console.log(error)
        return null
    }
}