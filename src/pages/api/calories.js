const API_KEY = process.env.API_KEY
export default async function handler(req, res) {
    if(req.method === "GET") {
        const {food} = req.query
        const url = `https://api.calorieninjas.com/v1/nutrition?query=${food}`
        const response = await fetch(url, {headers: {'X-Api-Key': API_KEY}})

        try {
            const data = await response.json()
            res.status(200).send(data)
        } catch {
            return res.status(500).send("Failed")
        }
    }
    
}
