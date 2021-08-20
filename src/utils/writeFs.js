import fs from "fs";
import path from "path";

export function writeResults(filePath, data, gap) {
  const documentsDataPath = path.join(process.cwd(), ...filePath);
  const results = data.join(gap);
  // const results = data.join("\n");
  fs.writeFileSync(documentsDataPath, results);
}

export function writeJsonResults(filePath, data) {
  const documentsDataPath = path.join(process.cwd(), ...filePath);
  fs.writeFileSync(documentsDataPath, JSON.stringify(data));
}

export function saveResults(params) {
  params.path.push(`${params.filename}.${params.format}`);
  const resultDestination = path.join(process.cwd(), ...params.path);
  fs.writeFileSync(resultDestination, JSON.stringify(params.data));
}
