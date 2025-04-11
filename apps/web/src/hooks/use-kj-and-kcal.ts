import { useEffect, useRef, useState } from "react";

type WineEnergyResult = {
  kjPer100ml: number;
  kcalPer100ml: number;
};

export const useKjAndKcal = (
  bottleVolumeMl: number,
  sugarGramsPerLiter: number,
  alcoholByVolume: number,
) => {
  // * STATES
  const [kj, setKj] = useState<number>(0);
  const [kcal, setKcal] = useState<number>(0);

  // *REFS
  const mountRef = useRef<boolean>(false);

  const calculateWineEnergy = (): WineEnergyResult => {
    // Constants for energy content
    // Convert sugar content to grams per 100 ml
    const sugarPer100ml = sugarGramsPerLiter / 10;

    // Convert alcohol content to grams per 100 ml
    const alcoholGramsPer100ml = alcoholByVolume * 0.789;

    // Calculate energy in kcal per 100 ml
    const kcalPer100ml = sugarPer100ml * 4 + alcoholGramsPer100ml * 7;

    // Convert kcal to kJ
    const kjPer100ml = kcalPer100ml * 4.184;

    return {
      kjPer100ml: Math.round(parseFloat(kjPer100ml.toFixed(2))),
      kcalPer100ml: Math.round(parseFloat(kcalPer100ml.toFixed(2))),
    };
  };

  useEffect(() => {
    if (
      alcoholByVolume !== null &&
      alcoholByVolume !== undefined &&
      sugarGramsPerLiter !== null &&
      sugarGramsPerLiter !== undefined &&
      bottleVolumeMl !== null &&
      bottleVolumeMl !== undefined
    ) {
      // mountRef.current = true;
      const energy = calculateWineEnergy();
      setKj(energy.kjPer100ml);
      setKcal(energy.kcalPer100ml);
    }
  }, [alcoholByVolume, sugarGramsPerLiter, bottleVolumeMl]);

  return { kj, kcal };
};
