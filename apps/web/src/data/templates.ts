import {
  DynamicQrCode,
  PricingLevel,
  Settings,
  Wine,
  Winery,
  WineryInfo,
} from "@/types/db";
import { Timestamp } from "firebase/firestore";

export const initialCoordinates = {
  lat: "47.01107733788858",
  lng: "28.85817396285048",
};

export const wineryInfoTemplate: WineryInfo = {
  name: "",
  avatar: "/images/avatar.svg",
  foundedIn: "",
  createdAt: Timestamp.fromDate(new Date()),
  lastUpdated: Timestamp.fromDate(new Date()),
  wineCollections: "",
  bottlesProduced: "",
  vineyardsSurface: "",
  grapeVarieties: "",
  certifications: [],
  headquarters: initialCoordinates,
  representative: {
    name: "",
    phone: "",
    email: "",
  },
};

export const settingsTemplate: Settings = {
  theme: "light",
  language: "en",
  autosave: true,
};

export const wineryTemplate: Winery = {
  id: "",
  info: wineryInfoTemplate,
  settings: settingsTemplate,
  billing: {
    level: "bronze",
  },
  isVerified: false,
};

export const wineTemplate: Wine = {
  uid: "",
  id: "",
  qrCode: "",
  publicUrl: "",
  status: "draft",
  isReadyToPublish: false,
  createdAt: Timestamp.fromDate(new Date()),
  lastUpdated: Timestamp.fromDate(new Date()),
  generalInfo: {
    image: "/images/wine.jpg",
    wineryName: "",
    collectionName: "",
    volume: "",
    type: "",
    grapeVarieties: [],
    country: "",
    cdo: "",
    collectionSize: "",
  },
  ingredients: {
    rawMaterial: "",
    alcoholByVolume: "",
    sugar: "",
    acidityRegulators: [],
    stabilizers: [],
    finingAgents: [],
    antioxidants: [],
  },
  nutritionalInfo: {
    energy: "",
    fat: "",
    carbohydrates: "",
    protein: "",
    salt: "",
  },
  profile: {
    color: "",
    aromaProfile: [],
    flavorProfile: [],
    perceivedAlcohol: "",
    sweetness: "",
    acidityLevel: "",
    taningLevel: "",
    barrelFermented: [],
    awards: [],
  },
  makingTechnique: {
    vegan: null,
    organic: null,
    bioDynamic: null,
    natural: null,
    fermentationType: [],
    yeastType: [],
    ageingPotential: "",
  },
  terroir: {
    vineyardName: "",
    cdo: "",
    sunExposure: "",
    elevation: "",
    ageOfVines: "",
    soilType: [],
    irrigationPractices: [],
    vineyardLocation: [],
    grapesHarvesing: {
      method: "",
      yieldPerHa: "",
    },
  },
  likes: 0,
};

export const dynamicQrCodeTemplate: DynamicQrCode = {
  uid: "",
  wineId: "",
  imageUrl: "",
  staticUrl: "",
  redirectUrl: "",
  createdAt: Timestamp.fromDate(new Date()),
  lastUpdated: Timestamp.fromDate(new Date()),
};

export const pricingTemplate: PricingLevel[] = [
  {
    name: "bronze",
    price: 0,
    qrCodes: 2,
    language: {
      description: "Availability in all 24 languages",
      available: true,
    },
    editable: {
      description: "Editable labels",
      available: true,
    },
    training: {
      description: "Group training sessions",
      available: false,
    },
    tokenization: {
      description: "Tonenized wine",
      available: false,
    },
    analytics: {
      description: "Analytics dashboard",
      available: false,
    },
    earlyAccess: {
      description: 'Early acces to "Winery Operations Management" Platform',
      available: false,
    },
  },
  {
    name: "silver",
    price: 75,
    qrCodes: 15,
    language: {
      description: "Availability in all 24 languages",
      available: true,
    },
    editable: {
      description: "Editable labels",
      available: true,
    },
    training: {
      description: "Group training sessions",
      available: true,
    },
    tokenization: {
      description: "1 Tonenized wine",
      available: true,
    },
    analytics: {
      description: "Analytics dashboard",
      available: false,
    },
    earlyAccess: {
      description: 'Early acces to "Winery Operations Management" Platform',
      available: false,
    },
  },
  {
    name: "gold",
    price: 120,
    qrCodes: 50,
    language: {
      description: "Availability in all 24 languages",
      available: true,
    },
    editable: {
      description: "Editable labels",
      available: true,
    },
    training: {
      description: "Group training sessions",
      available: true,
    },
    tokenization: {
      description: "2 Tonenized wine",
      available: true,
    },
    analytics: {
      description: "Analytics dashboard",
      available: true,
    },
    earlyAccess: {
      description: 'Early acces to "Winery Operations Management" Platform',
      available: false,
    },
  },
  {
    name: "platinum",
    price: 230,
    qrCodes: "unlimited",
    language: {
      description: "Availability in all 24 languages",
      available: true,
    },
    editable: {
      description: "Editable labels",
      available: true,
    },
    training: {
      description: "Group training sessions",
      available: true,
    },
    tokenization: {
      description: "3 Tonenized wine",
      available: true,
    },
    analytics: {
      description: "Analytics dashboard",
      available: true,
    },
    earlyAccess: {
      description: 'Early acces to "Winery Operations Management" Platform',
      available: true,
    },
  },
];
