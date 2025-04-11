import {
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormControl,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { wineFormSchema } from "@/data/form-schemas";
import { Input } from "@repo/ui/components/ui/input";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useExtraValidations } from "@/hooks/use-extra-validations";

export interface WineNumberFieldProps {
  name: string;
  label: string;
  description: string;
  step?: number;
  min?: number;
  max?: number;
  form: any;
  readOnly?: boolean;
  autosave: boolean;
  complementaryText?: string;
  onSubmit: (data: z.infer<typeof wineFormSchema>) => void;
}

export const WineCarbohydratesField = ({
  name,
  label,
  description,
  step,
  min,
  max,
  form,
  readOnly = false,
  autosave,
  complementaryText,
  onSubmit,
}: WineNumberFieldProps) => {
  const { minimumCarbohydrates, carbohydrates } = useExtraValidations(form);

  // useEffect(() => {
  //   form.setValue(
  //     "ingredients.carbohydrates",
  //     form.getValues("ingredients.sugar"),
  //   );
  // }, []);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className="flex w-full flex-col items-start justify-start rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-xl">{label}</FormLabel>
              <FormDescription className="text-sm">
                {description}
              </FormDescription>
            </div>
            <FormControl>
              <div className="flex w-full items-center gap-2">
                <Input
                  type="number"
                  step={step || 1}
                  min={minimumCarbohydrates || 0}
                  max={max}
                  className="w-full shadow-none"
                  value={carbohydrates || "0"}
                  onChange={(e) => {
                    form.setValue(
                      "nutritionalInfo.carbohydrates",
                      String(e.target.value),
                    );
                  }}
                  onBlur={(e) => {
                    if (autosave) {
                      onSubmit(
                        form.getValues() as z.infer<typeof wineFormSchema>,
                      );
                    }
                  }}
                />
                {complementaryText && (
                  <p className="text-sm text-gray-500">{complementaryText}</p>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
