/** @format */

import { dbConnect, disconnect } from '../../utils/dbConnect';
import Tweet from '../../models/tweets';
import Helper from '../../models/helper';
import LabeledTweet from '../../models/labeledTweets';
import PosLexicon from '../../models/posLexicon';
import NegLexicon from '../../models/negLexicon';
import NeuLexicon from '../../models/neuLexicon';

async function handler(req, res) {
	try {
		if (req.method === 'GET') {
			dbConnect();

			const chunk = await Tweet.find().limit(1000);

			disconnect().then(() => console.log('MongoDB is disconnected'));

			res.status(200).json({ chunk, chunckIndifier: [] });
		}

		if (req.method === 'POST') {
			dbConnect();

			const { tweet } = JSON.parse(req.body);

			await LabeledTweet.create(tweet);

			res.status(201).json({ message: 'tweet is labeled successfully.' });

			disconnect().then(() => console.log('MongoDB is disconnected'));
		}

		if (req.method === 'PUT') {
			dbConnect();
			let newLexicon = { pos: {}, neg: {}, neu: {} };
			const data = JSON.parse(req.body);
			// const { pos = {} } = await PosLexicon.findOne();
			// const { neg = {} } = await NegLexicon.findOne();
			// const { neu = {} } = await NeuLexicon.findOne();
			newLexicon = {
				// ...pos,
				// ...neg,
				// ...neu,
				pos: Object.assign({}, data.pos),
				neg: Object.assign({}, data.neg),
				neu: Object.assign({}, data.neu),
			};
			await PosLexicon.findOneAndUpdate({
				pos: newLexicon.pos,
			});
			await NegLexicon.findOneAndUpdate({
				neg: newLexicon.neg,
			});
			await NeuLexicon.findOneAndUpdate({
				neu: newLexicon.neu,
			});

			res.status(201).json({ message: 'tokes are labeled successfully.' });

			disconnect().then(() => console.log('MongoDB is disconnected'));
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
}

export default handler;
