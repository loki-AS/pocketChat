import { allMessageQuery } from '../../../utils/queries';
import { client } from '../../../utils/client';

export default async function handler(req, res){
    if (req.method === 'GET') {
        const query = allMessageQuery();

        const data = await client.fetch(query)

        res.status(200).json(data)
    } else if (req.method === 'POST') {
        const doc = req.body;

        client.create(doc).then(() => {
        res.status(200).json('message created');
        });    
    } 
}