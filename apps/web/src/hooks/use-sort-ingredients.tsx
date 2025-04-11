import { Ingredient, KeyValueType, Wine } from "@/types/db";
import { useEffect, useState } from "react";
import { useTranslationHandler } from "./use-translation-handler";

export const useSortIngredients = (wine: Wine, allergens: KeyValueType[]) => {
  const [acidityRegulators, setAcidityRegulators] = useState<
    Ingredient[] | null
  >(null);

  const [stabilizers, setStabilizers] = useState<Ingredient[] | null>(null);
  const [finingAgents, setFiningAgents] = useState<Ingredient[] | null>(null);
  const [antioxidants, setAntioxidants] = useState<Ingredient[] | null>(null);

  const { t } = useTranslationHandler();

  const checkAllergens = (
    allergens: KeyValueType[],
    ingredients: Ingredient[],
  ): Ingredient[] => {
    const allergenSet = new Set(
      allergens.map((a) => {
        return t(`systemVariables.dictAllergens.${a.key}`).toLowerCase();
      }),
    ); // Normalize allergens to lowercase
    return ingredients.map((ingredient) => ({
      ...ingredient,
      isAllergen: allergenSet.has(ingredient.name.toLowerCase()), // Check case-insensitively
    }));
  };

  useEffect(() => {
    if (wine) {
      setAcidityRegulators(
        checkAllergens(
          allergens,
          wine.ingredients.acidityRegulators as Ingredient[],
        ),
      );
      setStabilizers(
        checkAllergens(allergens, wine.ingredients.stabilizers as Ingredient[]),
      );
      setFiningAgents(
        checkAllergens(
          allergens,
          wine.ingredients.finingAgents as Ingredient[],
        ),
      );
      setAntioxidants(
        checkAllergens(
          allergens,
          wine.ingredients.antioxidants as Ingredient[],
        ),
      );
    }
  }, [wine, allergens]);

  return {
    acidityRegulators,
    stabilizers,
    finingAgents,
    antioxidants,
  };
};
