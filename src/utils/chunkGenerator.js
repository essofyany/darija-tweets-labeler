import { readJsonFile } from "./readFs";
import { writeJsonResults } from "./writeFs";

export function chunckGenerator() {
  const helpers = readJsonFile(["data", "helpers.json"]);
  const chunckIndicator = helpers.chunckIndicator;

  const tweets = readJsonFile(["data", "tweets.json"]).tweets;

  const chunk = tweets.slice(
    (chunckIndicator.length - 1) * 10,
    chunckIndicator.length * 10
  );

  const newChunckIndicator = {
    chunckIndicator: [...chunckIndicator, chunckIndicator.length],
  };

  writeJsonResults(["data", "helpers.json"], newChunckIndicator);

  return chunk;
}