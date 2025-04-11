import { useSystemVariables } from "@/context/system-variables";
import { useSortIngredients } from "@/hooks/use-sort-ingredients";
import { Wine } from "@/types/db";
import MarkdownPreviewer from "../markdown-previewer/MarkdownPreviewer";
import { useTranslationHandler } from "@/hooks/use-translation-handler";

export interface DynamicIngredientsProps {
  wine: Wine;
}

export const DynamicIngredients = ({ wine }: DynamicIngredientsProps) => {
  // * HOOKS
  const { t } = useTranslationHandler();
  const { allergens } = useSystemVariables();
  const { acidityRegulators, stabilizers, finingAgents, antioxidants } =
    useSortIngredients(wine, allergens);

  return (
    <>
      {allergens &&
        antioxidants &&
        acidityRegulators &&
        stabilizers &&
        finingAgents && (
          <span className="text-justify">
            <span>
              {t(
                `systemVariables.dictRawMaterials.${wine.ingredients.rawMaterial}`,
              )}
            </span>
            ;{" "}
            {acidityRegulators.length > 0 && (
              <span>
                acidity regulators:{" "}
                {acidityRegulators.map((item: any, index: number) => (
                  <span key={item.name}>
                    {item.isAllergen ? (
                      <span className="font-bold">
                        {item.name.toLowerCase()}
                      </span>
                    ) : (
                      <span>{item.name.toLowerCase()}</span>
                    )}
                    {index !== acidityRegulators.length - 1 && ", "}
                  </span>
                ))}
                ;{" "}
              </span>
            )}
            {stabilizers.length > 0 && (
              <span>
                stabilizing agents:{" "}
                {stabilizers.map((item: any, index: number) => (
                  <span key={item.name}>
                    {item.isAllergen ? (
                      <span className="font-bold">
                        {item.name.toLowerCase()}
                      </span>
                    ) : (
                      <span>{item.name.toLowerCase()}</span>
                    )}
                    {index !== stabilizers.length - 1 && ", "}
                  </span>
                ))}
                ;{" "}
              </span>
            )}
            {finingAgents.length > 0 && (
              <span>
                fining agents:{" "}
                {finingAgents.map((item: any, index: number) => (
                  <span key={item.name}>
                    {item.isAllergen ? (
                      <span className="font-bold">
                        {item.name.toLowerCase()}
                      </span>
                    ) : (
                      <span>{item.name.toLowerCase()}</span>
                    )}
                    {index !== finingAgents.length - 1 && ", "}
                  </span>
                ))}
                ;{" "}
              </span>
            )}
            {antioxidants.length > 0 && (
              <span>
                antioxidants:{" "}
                {antioxidants.map((item: any, index: number) => (
                  <span key={item.name}>
                    {item.isAllergen ? (
                      <span className="font-bold">
                        {item.name.toLowerCase()}
                      </span>
                    ) : (
                      <span>{item.name.toLowerCase()}</span>
                    )}
                    {index !== antioxidants.length - 1 && ", "}
                  </span>
                ))}
                ;{" "}
              </span>
            )}
            {t("wineDetails.bottledText")}
          </span>
        )}
      <span className="text-sm">
        <MarkdownPreviewer content={t("wineDetails.reminderText")} />
      </span>
    </>
  );
};
