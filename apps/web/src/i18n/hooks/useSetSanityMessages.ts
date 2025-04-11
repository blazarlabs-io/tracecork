import { SanityDocument } from "@sanity/client";
import { client } from "../../lib/sanity/client";
import {
  cleanedObj,
  setLanguageObject,
  setMainLanguages,
  setObjectContent,
} from "../utils/objectHandlres";

// import { writeFile } from "fs/promises";
// import path from "path";

export const useSetSanityMessages = async () => {
  // const sanityData = await client.fetch<SanityDocument>(
  //   `*[_type in ["publicPages"]]`,
  // );
  // // const sanityData = await client.fetch<SanityDocument>(
  // //   `*[_type in ["publicPages", "publicComponents"] && language == ${JSON.stringify(locale)}]`,
  // // );

  const sanityData = await client.fetch<SanityDocument>("*");

  const mainData: { [key: string]: any } = {};

  const langObject: { [key: string]: Set<string> } = {};

  sanityData.forEach((page: any) => {
    if (!page["language"]) return;
    if (page["_type"] === "pages") return;
    const lang = page["language"];
    const cleanedData = cleanedObj(page);
    const formatedData = setObjectContent(cleanedData);
    mainData[`${lang}`] = {
      ...mainData[`${lang}`],
      [`${page["_type"]}`]: {
        ...formatedData,
      },
    };
    setLanguageObject(page["_type"], lang, langObject);
  });

  setMainLanguages(mainData, langObject);

  // const filePath1 = path.join(process.cwd(), "public", "sanityData.json");
  // const jsonData1 = JSON.stringify(sanityData, null, 2);
  // await writeFile(filePath1, jsonData1, "utf-8");

  // const filePath2 = path.join(process.cwd(), "public", "mainData.json");
  // const jsonData2 = JSON.stringify(mainData, null, 2);
  // await writeFile(filePath2, jsonData2, "utf-8");

  return mainData;
};
