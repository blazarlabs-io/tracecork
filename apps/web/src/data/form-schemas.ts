import { z } from "zod";
import { initialCoordinates } from "./templates";
import { isValidPhoneNumber } from "react-phone-number-input";

export const signUpFormSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .regex(new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/), {
        message:
          "Password must be at least 8 characters and contain an uppercase letter, lowercase letter, and number",
      }),
    confirmPassword: z.string(),
    // .regex(new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/), {
    //   message:
    //     "Password must be at least 8 characters and contain an uppercase letter, lowercase letter, and number",
    // }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email().min(1),
});

export const contactFormSchema = z.object({
  email: z.string().email(),
  message: z.string().min(8, "Required"),
});

export const changePasswordFormSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8)
      .regex(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$"), {
        message:
          "Password must be at least 8 characters and contain an uppercase letter, lowercase letter, and number",
      }),
    newPassword: z
      .string()
      .min(8)
      .regex(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$"), {
        message:
          "Password must be at least 8 characters and contain an uppercase letter, lowercase letter, and number",
      }),
    confirmNewPassword: z
      .string()
      .min(8)
      .regex(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$"), {
        message:
          "Password must be at least 8 characters and contain an uppercase letter, lowercase letter, and number",
      }),
  })
  .superRefine(({ confirmNewPassword, newPassword }, ctx) => {
    if (confirmNewPassword !== newPassword) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

export const passwordResetFormSchema = z
  .object({
    newPassword: z
      .string()
      .min(8)
      .regex(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$"), {
        message:
          "Password must be at least 8 characters and contain an uppercase letter, lowercase letter, and number",
      }),
    confirmNewPassword: z
      .string()
      .min(8)
      .regex(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$"), {
        message:
          "Password must be at least 8 characters and contain an uppercase letter, lowercase letter, and number",
      }),
  })
  .superRefine(({ confirmNewPassword, newPassword }, ctx) => {
    if (confirmNewPassword !== newPassword) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

export const autosaveFormSchema = z.object({
  autosave: z.boolean().default(true).optional(),
});

export const coordinatesSchema = z.object({
  lat: z.string().transform((value) => (value === undefined ? "" : value)),
  lng: z.string().transform((value) => (value === undefined ? "" : value)),
});

export const representativeSchema = z.object({
  name: z
    .string()
    .optional()
    .transform((value) => value ?? ""),
  email: z
    .string()
    .email()
    .optional()
    .or(z.literal(""))
    .transform((value) => value ?? ""),
  phone: z
    .string()
    .optional()
    .refine((value) => isValidPhoneNumber(value as string), {
      message: "Invalid phone number",
    }),
});

export const wineryInfoFormSchema = z.object({
  avatar: z
    .string()
    .url()
    .optional()
    .transform((value) => (value === undefined ? "" : value)),
  name: z.string().min(3, "Required"),
  foundedIn: z
    .string()
    .optional()
    .transform((value) => (value === undefined ? "" : value)),
  wineCollections: z
    .string()
    .optional()
    .transform((value) => (value === undefined ? "" : value))
    .refine((value) => Number(value) >= 0, {
      message: "Wine collections must be 0 or greater",
    }),
  bottlesProduced: z
    .string()
    .optional()
    .transform((value) => (value === undefined ? "" : value))
    .refine((value) => Number(value) >= 0, {
      message: "Bottles produced must be 0 or greater",
    }),
  vineyardsSurface: z
    .string()
    .optional()
    .transform((value) => (value === undefined ? "" : value))
    .refine((value) => Number(value) >= 0, {
      message: "Vineyards surface must be 0 or greater",
    }),
  grapeVarieties: z
    .string()
    .optional()
    .transform((value) => (value === undefined ? "" : value))
    .refine((value) => Number(value) >= 0, {
      message: "Grape varieties must be 0 or greater",
    }),
  certifications: z
    .array(z.object({ name: z.string() }))
    .optional()
    .transform((value) => value ?? []),
  headquarters: coordinatesSchema
    .optional()
    .transform((value) =>
      value === undefined || value === null ? initialCoordinates : value,
    ),
  representative: representativeSchema.optional().transform(
    (value) =>
      value ?? {
        name: z
          .string()
          .optional()
          .transform((value) => value ?? ""),
        email: z
          .string()
          .email()
          .optional()
          .or(z.literal(""))
          .transform((value) => value ?? ""),
        phone: z
          .string()
          .optional()
          .refine((value) => isValidPhoneNumber(value as string), {
            message: "Invalid phone number",
          }),
      },
  ),
});

export const grapeVarietiesSchema = z.object({
  name: z.string().min(1, "Required"),
  percentage: z
    .string()
    .min(1, "Required")
    .refine(
      (value) => {
        return Number(value) >= 0 && Number(value) <= 100;
      },
      {
        message: "Percentage must be between 0 and 100",
      },
    ),
  vintage: z.string().min(1, "Required"),
});

export const wineGeneralInfoSchema = z.object({
  image: z
    .string()
    .optional()
    .transform((value) => (value === undefined ? "" : value)),
  wineryName: z.string().min(3, "Required"),
  collectionName: z.string().min(3, "Required"),
  volume: z.string().min(1, "Required"),
  type: z.string().min(1, "Required"),
  grapeVarieties: z.array(grapeVarietiesSchema).superRefine((args, ctx) => {
    if (args.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `At least one grape variety is required`,
      });
    }
  }),
  country: z.string().min(1, "Required"),
  cdo: z
    .string()
    .optional()
    .transform((value) => (value === undefined ? "" : value)),
  collectionSize: z
    .string()
    .optional()
    .transform((value) => (value === undefined ? "" : value))
    .refine(
      (value) => {
        return Number(value) >= 0;
      },
      {
        message: "Collection size must be 0 or greater",
      },
    ),
});

export const wineIngredientsSchema = z.object({
  rawMaterial: z.string().min(1, "Required"),
  alcoholByVolume: z
    .string()
    .min(1, "Required")
    .refine((value) => Number(value) >= 0, {
      message: "Alcohol by volume must be 0 or greater",
    }),
  sugar: z
    .string()
    .min(1, "Required")
    .refine((value) => Number(value) >= 0, {
      message: "Sugar must be 0 or greater",
    }),
  acidityRegulators: z
    .array(
      z.object({
        name: z
          .string()
          .min(1, "Field can't be empty, please add it or delete the field"),
      }),
    )
    .optional(),
  stabilizers: z
    .array(
      z.object({
        name: z
          .string()
          .min(1, "Field can't be empty, please add it or delete the field"),
      }),
    )
    .optional(),
  finingAgents: z
    .array(
      z.object({
        name: z
          .string()
          .min(1, "Field can't be empty, please add it or delete the field"),
      }),
    )
    .optional(),
  antioxidants: z
    .array(
      z.object({
        name: z
          .string()
          .min(1, "Field can't be empty, please add it or delete the field"),
      }),
    )
    .optional(),
});

export const wineNutritionalInfoSchema = z.object({
  energy: z
    .string()
    .readonly()
    .transform((value) => (value === undefined ? "" : value)),
  fat: z
    .string()
    .min(1, "Required")
    .transform((value) => (value === undefined ? "" : value))
    .refine((value) => Number(value) >= 0, {
      message: "Fat must be 0 or greater",
    }),
  carbohydrates: z
    .string()
    .optional()
    .transform((value) => (value === undefined ? "" : value))
    .refine((value) => Number(value) >= 0, {
      message: "Carbohydrates must be 0 or greater",
    }),

  protein: z
    .string()
    .min(1, "Required")
    .transform((value) => (value === undefined ? "" : value))
    .refine((value) => Number(value) >= 0, {
      message: "Protein must be 0 or greater",
    }),
  salt: z
    .string()
    .min(1, "Required")
    .transform((value) => (value === undefined ? "" : value))
    .refine((value) => Number(value) >= 0, {
      message: "Salt must be 0 or greater",
    }),
});

export const wineBarrelSchema = z.object({
  woodType: z
    .string()
    .optional()
    .transform((value) => (value === undefined ? "" : value)),
  woodOrigin: z
    .string()
    .optional()
    .transform((value) => (value === undefined ? "" : value)),
  timeOfFermentation: z
    .string()
    .optional()
    .transform((value) => (value === undefined ? "" : value)),
});

export const wineProfileSchema = z.object({
  color: z
    .string()
    .optional()
    .transform((value) => (value === undefined ? "" : value)),
  aromaProfile: z.array(z.string()).optional(),
  flavorProfile: z.array(z.string()).optional(),
  perceivedAlcohol: z
    .string()
    .optional()
    .transform((value) => (value === undefined ? "" : value)),
  sweetness: z.string().min(1, "Required"),
  acidityLevel: z
    .string()
    .optional()
    .transform((value) => (value === undefined ? "" : value)),
  taningLevel: z
    .string()
    .optional()
    .transform((value) => (value === undefined ? "" : value)),
  barrelFermented: z.array(wineBarrelSchema).optional(),
  awards: z.array(z.string()).optional(),
});

export const wineMakingTechniqueSchema = z.object({
  vegan: z
    .boolean()
    .optional()
    .transform((value) => (value === undefined ? false : value)),
  organic: z
    .boolean()
    .optional()
    .transform((value) => (value === undefined ? false : value)),
  bioDynamic: z
    .boolean()
    .optional()
    .transform((value) => (value === undefined ? false : value)),
  natural: z
    .boolean()
    .optional()
    .transform((value) => (value === undefined ? false : value)),
  fermentationType: z.array(z.string()).optional(),
  description: z.array(z.string()).optional(),
  ageingPotential: z
    .string()
    .optional()
    .transform((value) => (value === undefined ? "" : value)),
});

export const terroirSchema = z.object({
  vineyardName: z
    .string()
    .optional()
    .transform((value) => value ?? ""),
  cdo: z
    .string()
    .optional()
    .transform((value) => value ?? ""),
  sunExposure: z
    .string()
    .optional()
    .transform((value) => value ?? ""),
  elevation: z
    .string()
    .optional()
    .transform((value) => value ?? ""),
  ageOfVines: z
    .string()
    .optional()
    .transform((value) => value ?? ""),
  soilType: z.array(z.string()).optional(),
  irrigationPractices: z.array(z.string()).optional(),
  vineyardLocation: z.array(coordinatesSchema).optional(),
  grapesHarvesing: z
    .object({
      method: z
        .string()
        .optional()
        .transform((value) => value ?? ""),
      yieldPerHa: z
        .string()
        .optional()
        .transform((value) => value ?? ""),
    })
    .optional(),
});

export const wineFormSchema = z.object({
  generalInfo: wineGeneralInfoSchema,
  ingredients: wineIngredientsSchema,
  nutritionalInfo: wineNutritionalInfoSchema,
  profile: wineProfileSchema,
  // makingTechnique: wineMakingTechniqueSchema,
  qrCode: z
    .string()
    .optional()
    .transform((value) => (value === undefined ? "" : value)),
  // terroir: terroirSchema,
});
