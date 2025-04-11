import { writeFile } from "fs/promises";
import path from "path";

export const writeLocalFile = async (jsonData: any, jsonName: string) => {
  const filePath1 = path.join(process.cwd(), "public", `${jsonName}.json`);
  const jsonData1 = JSON.stringify(jsonData, null, 2);
  await writeFile(filePath1, jsonData1, "utf-8");
};
