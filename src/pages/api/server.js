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
      // [tweet,  ...labeledTweets.filter((item) => item._id !== tweet._id)]
      [tweet, ...labeledTweets]
    );

    console.log("post method requested");
    res.status(201).json({ message: "tweet is labeled successfully." });
  }
}

export default handler;
