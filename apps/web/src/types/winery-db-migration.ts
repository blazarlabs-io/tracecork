export interface WineryDbBackup {
  docId: string;
  docData: DocData;
  collections: string[];
  collectionData: CollectionDaum[];
}

export interface DocData {
  id: string;
  info: Info;
  settings: Settings;
  isVerified: boolean;
  billing: Billing;
}

export interface Info {
  certifications: any[];
  name: string;
  avatar: string;
  bottlesProduced: string;
  foundedIn: string;
  vineyardsSurface: string;
  wineCollections: string;
  grapeVarieties: string;
  representative: Representative;
  headquarters: Headquarters;
}

export interface Representative {
  name: string;
  email: string;
  phone: string;
}

export interface Headquarters {
  lng: number;
  lat: number;
}

export interface Settings {
  autosave: boolean;
  language: string;
  theme: string;
}

export interface Billing {
  level: string;
  plan: string;
}

export interface CollectionDaum {
  collection: string;
  docsData: DocsDaum[];
}

export interface DocsDaum {
  docId: string;
  docData: DocData2;
  collections: any[];
  collectionData: any[];
}

export interface DocData2 {
  uid: string;
  wineId?: string;
  imageUrl?: string;
  staticUrl?: string;
  redirectUrl?: string;
  createdAt: CreatedAt;
  lastUpdated: LastUpdated;
  id?: string;
  qrCode?: string;
  publicUrl?: string;
  status?: string;
  isReadyToPublish?: boolean;
  nutritionalInfo?: NutritionalInfo;
  makingTechnique?: MakingTechnique;
  terroir?: Terroir;
  likes?: number;
  generalInfo?: GeneralInfo;
  profile?: Profile;
  ingredients?: Ingredients;
}

export interface CreatedAt {
  _seconds?: number;
  _nanoseconds?: number;
  seconds?: number;
  nanoseconds?: number;
}

export interface LastUpdated {
  _seconds?: number;
  _nanoseconds?: number;
  seconds?: number;
  nanoseconds?: number;
}

export interface NutritionalInfo {
  energy: string;
  fat: string;
  carbohydrates: string;
  protein: string;
  salt: string;
}

export interface MakingTechnique {
  fermentationType: any[];
  yeastType: any[];
  vegan: any;
  organic: any;
  bioDynamic: any;
  natural: any;
  ageingPotential: string;
}

export interface Terroir {
  soilType: any[];
  irrigationPractices: any[];
  vineyardLocation: any[];
  vineyardName: string;
  cdo: string;
  sunExposure: string;
  elevation: string;
  ageOfVines: string;
  grapesHarvesing: GrapesHarvesing;
}

export interface GrapesHarvesing {
  method: string;
  yieldPerHa: string;
}

export interface GeneralInfo {
  image: string;
  wineryName: string;
  collectionName: string;
  volume: string;
  grapeVarieties: GrapeVariety[];
  country: string;
  cdo: string;
  collectionSize: string;
  type: string;
}

export interface GrapeVariety {
  name: string;
  percentage: string;
  vintage: string;
}

export interface Profile {
  aromaProfile: any[];
  flavorProfile: any[];
  barrelFermented: any[];
  awards: any[];
  color: string;
  perceivedAlcohol: string;
  acidityLevel: string;
  taningLevel: string;
  sweetness: string;
}

export interface Ingredients {
  acidityRegulators: any[];
  stabilizers: any[];
  finingAgents: FiningAgent[];
  antioxidants: Antioxidant[];
  alcoholByVolume: string;
  sugar: string;
  rawMaterial: string;
}

export interface FiningAgent {
  name: string;
}

export interface Antioxidant {
  name: string;
}
