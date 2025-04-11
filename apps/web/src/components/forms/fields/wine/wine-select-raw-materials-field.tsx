import {
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormControl,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { wineFormSchema } from "@/data/form-schemas";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@repo/ui/components/ui/select";
import { z } from "zod";
import { useTranslationHandler } from "@/hooks/use-translation-handler";
import { useSystemVariables } from "@/context/system-variables";

export interface WineSelectFieldProps {
  name: string;
  form: any;
  autosave: boolean;
  onSubmit: (data: z.infer<typeof wineFormSchema>) => void;
}

export const WineSelectRawMaterialsField = ({
  name,
  onSubmit,
  autosave,
  form,
}: WineSelectFieldProps) => {
  const { t } = useTranslationHandler();
  const { rawMaterials } = useSystemVariables();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className="flex w-full flex-col items-start justify-start rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-xl">
                {t("wineStepper.wineryDetails.ingredients.rawMaterial.label")}
              </FormLabel>
              <FormDescription className="text-sm">
                {t(
                  "wineStepper.wineryDetails.ingredients.rawMaterial.description",
                )}
              </FormDescription>
            </div>
            <FormControl>
              <Select
                onValueChange={(value) => {
                  if (value) {
                    field.onChange(value);
                    if (autosave) {
                      onSubmit(
                        form.getValues() as z.infer<typeof wineFormSchema>,
                      );
                    }
                  }
                }}
                value={field.value}
              >
                <SelectTrigger className="w-full shadow-none">
                  <SelectValue
                    placeholder={t(
                      "wineStepper.wineryDetails.ingredients.rawMaterial.placeholder",
                    )}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {rawMaterials.map((option) => (
                      <SelectItem key={option.key} value={option.key}>
                        {t(`systemVariables.dictRawMaterials.${option.key}`)}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
