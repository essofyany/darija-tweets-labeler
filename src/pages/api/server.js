import { chunckGenerator } from "../../utils/chunkGenerator";
import { readJsonFile } from "../../utils/readFs";
import { writeJsonResults } from "../../utils/writeFs";

async function handler(req, res) {
  if (req.method === "GET") {
    const { chunk, chunckIndifier } = chunckGenerator();
    res.status(200).json({ chunk, chunckIndifier });
  }

  if (req.method === "POST") {
    const { tweet, chunckIndifier } = JSON.parse(req.body);

    const labeledTweets = readJsonFile([
      "data",
      "results",
      "labeledTweets.json",
    ]);

    writeJsonResults(
      ["data", "results", "labeledTweets.json"],
      [tweet, ...labeledTweets]
    );

    res.status(201).json({ message: "tweet is labeled successfully." });
  }
  if (req.method === "PUT") {
    let newLexicon = { pos: {}, neg: {}, neu: {} };
    const data = JSON.parse(req.body);
    const lexicon = readJsonFile(["data", "results", "lexicon.json"]);

    newLexicon = {
      ...lexicon,
      pos: Object.assign(lexicon.pos, data.pos),
      neg: Object.assign(lexicon.neg, data.neg),
      neu: Object.assign(lexicon.neu, data.neu),
    };

    writeJsonResults(["data", "results", "lexicon.json"], newLexicon);
    res.status(201).json({ message: "tokes are labeled successfully." });

    // console.log(data);
    // console.log(lexicon);
    // console.log(newLexicon);
  }
}

export default handler;
