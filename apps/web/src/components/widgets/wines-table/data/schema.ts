import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  uid: z.string(),
  qrCode: z.string(),
  publicUrl: z.string(),
  status: z.string(),
  lastUpdated: z.string(),
  generalInfo: z.object({
    image: z.string(),
    wineryName: z.string(),
    collectionName: z.string(),
    volume: z.string(),
    type: z.string(),
    grapeVarieties: z.array(
      z.object({
        name: z.string(),
        percentage: z.string(),
        vintage: z.string(),
      }),
    ),
    country: z.string(),
    cdo: z.string(),
    collectionSize: z.string(),
  }),
  ingredients: z.object({
    rawMaterial: z.string(),
    alcoholByVolume: z.string(),
    sugar: z.string(),
    acidityRegulators: z.array(z.string()),
    stabilizers: z.array(z.string()),
    finingAgents: z.array(z.string()),
    antioxidants: z.array(z.string()),
  }),
});

export type TaskType = z.infer<typeof taskSchema>;
