import { dbConnect, disconnect } from "../../utils/dbConnect";
import Tweet from "../../models/tweets";
import Helper from "../../models/helper";
import LabeledTweet from "../../models/labeledTweets";
import PosLexicon from "../../models/PosLexicon";
import NegLexicon from "../../models/NegLexicon";
import NeuLexicon from "../../models/NeuLexicon";

async function handler(req, res) {
  if (req.method === "GET") {
    dbConnect();

    const { chunckIndifier } = await Helper.findOne();

    const chunk = await Tweet.find()
      .skip(chunckIndifier * 10)
      .limit(10);

    await Helper.updateOne({
      $inc: { chunckIndifier: 1 },
    });

    disconnect().then(() => console.log("MongoDB is disconnected"));

    res.status(200).json({ chunk, chunckIndifier: [] });
  }

  if (req.method === "POST") {
    dbConnect();

    const { tweet } = JSON.parse(req.body);

    await LabeledTweet.create(tweet);

    res.status(201).json({ message: "tweet is labeled successfully." });

    disconnect().then(() => console.log("MongoDB is disconnected"));
  }

  if (req.method === "PUT") {
    dbConnect();

    let newLexicon = { pos: {}, neg: {}, neu: {} };

    const data = JSON.parse(req.body);

    const { pos } = await PosLexicon.findOne();
    const { neg } = await NegLexicon.findOne();
    const { neu } = await NeuLexicon.findOne();

    newLexicon = {
      ...pos,
      ...neg,
      ...neu,
      pos: Object.assign(pos, data.pos),
      neg: Object.assign(neg, data.neg),
      neu: Object.assign(neu, data.neu),
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

    res.status(201).json({ message: "tokes are labeled successfully." });

    disconnect().then(() => console.log("MongoDB is disconnected"));
  }
}

export default handler;
