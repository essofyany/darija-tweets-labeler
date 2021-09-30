/** @format */

import { dbConnect, disconnect } from "../../utils/dbConnect";
import PosLexicon from "../../models/posLexicon";
import NegLexicon from "../../models/negLexicon";
import NeuLexicon from "../../models/neuLexicon";

async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const text = req.body;
      const wordList = text.split(" ");

      dbConnect();
      const { pos } = await PosLexicon.findOne();
      const { neg } = await NegLexicon.findOne();
      const { neu } = await NeuLexicon.findOne();

      let polarity = 0;
      wordList.forEach((word) => {
        if (Object.keys(pos).includes(word.trim())) {
          polarity += pos[word.trim()];
          console.log(word, pos[word.trim()]);
        }
        if (Object.keys(neg).includes(word.trim())) {
          polarity += neg[word.trim()];
          console.log(word, neg[word.trim()]);
        }
        if (Object.keys(neu).includes(word.trim())) {
          polarity += neu[word.trim()];
          console.log(word, neu[word.trim()]);
        }
      });

      console.log("sentance: ", text, " polarity: ", polarity);

      disconnect().then(() => console.log("MongoDB is disconnected"));

      res.status(200).json(polarity);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default handler;
