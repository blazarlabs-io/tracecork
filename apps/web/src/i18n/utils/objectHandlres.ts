import {
  parseDictionarySanityData,
  parseLinkSanityData,
  parseStatCardSanityData,
  sanityBlockToMarkdown,
} from "./sanityDataParser";

export const deepCopyObject = (obj: object) => JSON.parse(JSON.stringify(obj));

export const cleanedObj = (obj: object) =>
  Object.fromEntries(
    Object.entries(obj).filter(([key]) => !key.startsWith("_")),
  );

export const setObjectContent = (obj: any) => {
  if (typeof obj !== "object") return obj;
  const baseData: { [k: string]: any } = deepCopyObject(obj);
  Object.keys(obj).forEach((docKey) => {
    const docField = obj[`${docKey}`];
    if (Array.isArray(docField)) {
      baseData[`${docKey}`] = getArrayTypeData(docField);
    } else {
      baseData[`${docKey}`] = setObjectContent(docField);
    }
  });
  return baseData;
};

const getArrayTypeData = (fieldValue: any[]) => {
  const mdData = sanityBlockToMarkdown(fieldValue);
  if (!!mdData) return mdData;
  const linkData = parseLinkSanityData(fieldValue);
  if (!!linkData) return linkData;
  const statCardData = parseStatCardSanityData(fieldValue);
  if (!!statCardData) return statCardData;
  const dictionaryData = parseDictionarySanityData(fieldValue);
  if (!!dictionaryData) return dictionaryData;
  return setArrayContent(fieldValue);
};

export const setArrayContent = (fieldValue: any[]) => {
  const newArray = fieldValue.map((fValue) => {
    const baseData: { [k: string]: any } = deepCopyObject(fValue);
    Object.keys(fValue).forEach((docKey) => {
      const docField = fValue[`${docKey}`];
      if (Array.isArray(docField)) {
        baseData[`${docKey}`] = Object.assign({}, docField);
      }
    });
    return baseData;
  });
  return Object.assign({}, newArray);
};

/* This set a languas for each main section (page),
  e.g. public componests will have a set of languages like: en, es, it...
*/
export const setLanguageObject = (
  dataKey: string,
  lang: string,
  langObject: { [key: string]: Set<string> },
) => {
  if (langObject[`${dataKey}`]) {
    langObject[`${dataKey}`]?.add(lang);
  } else {
    langObject[`${dataKey}`] = new Set([lang]);
  }
};

export const setMainLanguages = (
  mainData: any,
  langObject: { [key: string]: Set<string> },
) => {
  mainData["language"] = {
    label: "Language",
  };
  /* First get all the common languages along all main sections (pages) */
  const langCollections = Object.values(langObject);
  const commonLang = [...(langCollections[0] || [])].filter((value) =>
    langCollections.every((langCollection) => langCollection.has(value)),
  );
  mainData["language"]["common-lang"] = commonLang;
  /* Second set all the available languages, even if only one pages has that language
    This is due system variables has 26 lang and other pages don't
  */
  const mergedSet = new Set(langCollections.flatMap((set) => [...set]));
  const availableLang = [...mergedSet];
  mainData["language"]["all-lang"] = availableLang;
};
