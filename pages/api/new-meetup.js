import { MongoClient } from 'mongodb';

async function hanlder(req, res) {
	// POST /api/new-meetup
	if (req.method === 'POST') {
		const data = req.body;
		const client = await MongoClient.connect('DB_URL');
		const db = client.db();

		const meetupsColletion = db.collection('meetups');
		const result = await meetupsColletion.insertOne(data);
		console.log('result:', result);
		client.close();
		res.status(201).json({ message: 'Meetup inserted!' });
	}
}

export default hanlder;
