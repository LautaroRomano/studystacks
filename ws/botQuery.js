import axios from 'axios';

export const botQuery = async (message) => {
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
            .then(({ data }) => {
                if (data.choices && data.choices.length > 0) return (data.choices[0].text)
            })
    } catch (error) {
        return null
    }
}