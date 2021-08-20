import fs from "fs";
import path from "path";

export function readDocuments(filePath) {
  const documentsDataPath = path.join(process.cwd(), ...filePath);
  let data = fs
    .readFileSync(documentsDataPath, {
      encoding: "utf-8",
    })
    .trim()
    .split(" ");

  return data;
}

export function readJsonFile(filePath) {
  const documentPath = path.join(process.cwd(), ...filePath);
  let data = fs.readFileSync(documentPath, {
    encoding: "utf-8",
  });
  // console.log("json data: ", JSON.parse(data));
  return JSON.parse(data);
}
