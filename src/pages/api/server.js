import { chunckGenerator } from "../../utils/chunkGenerator";

async function handler(req, res) {
  if (req.method === "GET") {
    const chunk = chunckGenerator();
    res.json(chunk);
  }
}

export default handler;
