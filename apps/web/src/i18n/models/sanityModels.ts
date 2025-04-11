export type BlockChildrenType = {
  _key: string;
  _type: string;
  marks: string[];
  text: string;
};

export type MarkRefType = {
  _key: string;
  _type: string;
  href: string;
};

export type SanityBlockType = {
  _key: string;
  _type: "block";
  children: BlockChildrenType[];
  markDefs: MarkRefType[];
  style: string;
};

export type SanityLinkType = {
  _key: string;
  _type: "link";
  label: string;
  url: string;
};

export type SanityStatCardType = {
  title: string;
  _type: "statCard";
  icon: string;
  description: string;
  _key: string;
};
