import { useSystemVariables } from "@/context/system-variables";
import { useEffect, useRef, useState } from "react";

export const useExtraValidations = (form: any) => {
  // * HOOKS
  const { sweetness } = useSystemVariables();

  // * STATES
  const [selectedWineType, setSelectedWineType] = useState<string | null>(null);
  const [selectedSweetness, setSelectedSweetness] = useState<string[] | null>(
    null,
  );
  const [minimumCarbohydrates, setMinimumCarbohydrates] = useState<number>(0);
  const [carbohydrates, setCarbohydrates] = useState<number>(
    form.getValues("ingredients.carbohydrates"),
  );

  const mountRef = useRef<boolean>(false);
  let subscription: any;

  useEffect(() => {
    if (!mountRef.current) {
      mountRef.current = true;
      subscription = form.watch((values: any) => {
        if (values.generalInfo?.grapeVarieties) {
          // * Calculate total percentage
          let totalPercentage: number = 0;
          values.generalInfo.grapeVarieties.map(
            (variety: any, index: number) => {
              totalPercentage += parseInt(variety.percentage);

              if (totalPercentage > 100) {
                // form.setError(`generalInfo.grapeVarieties`, {
                //   type: "manual",
                //   message: "Total percentage must be 100%",
                // });
              } else if (
                values?.generalInfo?.grapeVarieties !== undefined &&
                values?.generalInfo?.grapeVarieties[index]?.percentage
              ) {
                // form.clearErrors(`generalInfo.grapeVarieties`);
              }
            },
          );
        }

        if (values.generalInfo?.type) {
          if (
            values.generalInfo?.type !== "" &&
            values.generalInfo?.type !== undefined
          ) {
            setSelectedWineType(values.generalInfo?.type);
            if (values.generalInfo?.type.toLowerCase() === "sparkling wine") {
              setSelectedSweetness(sweetness?.sparkling.map((d) => d.key));
            } else if (
              values.generalInfo?.type.toLowerCase() === "dessert wine"
            ) {
              setSelectedSweetness(sweetness?.dessert.map((d) => d.key));
            } else {
              setSelectedSweetness(sweetness?.other.map((d) => d.key));
            }
          }
        }

        if (
          values.ingredients?.sugar ||
          values.nutritionalInfo?.carbohydrates
        ) {
          if (
            parseFloat(values?.nutritionalInfo?.carbohydrates) >
            parseFloat(values.ingredients?.sugar)
          ) {
            // console.log("Carbohydrates is greater than sugar");
            setCarbohydrates(parseFloat(values.nutritionalInfo?.carbohydrates));
          } else {
            // console.log("Sugar is greater than carbohydrates");
            setCarbohydrates(parseFloat(values.ingredients?.sugar));
          }

          setMinimumCarbohydrates(parseFloat(values.ingredients?.sugar));
        }
      });
    }
    return () => subscription.unsubscribe();
  }, [form.watch]);

  return {
    selectedWineType,
    selectedSweetness,
    minimumCarbohydrates,
    carbohydrates,
  };
};
