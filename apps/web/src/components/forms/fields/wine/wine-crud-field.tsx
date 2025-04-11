import {
  FormLabel,
  FormDescription,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { wineFormSchema } from "@/data/form-schemas";
import { X, Plus } from "lucide-react";
import { Input } from "@repo/ui/components/ui/input";
import { Button } from "@repo/ui/components/ui/button";
import { useFieldArray } from "react-hook-form";
import { z } from "zod";
import { useTranslationHandler } from "@/hooks/use-translation-handler";

export interface WineCrudFieldProps {
  form: any;
  name: string;
  label: string;
  description: string;
  placeholder?: string;
  autosave: boolean;
  onSubmit: (data: z.infer<typeof wineFormSchema>) => void;
}

export const WineCrudField = ({
  form,
  name,
  label,
  description,
  placeholder,
  autosave,
  onSubmit,
}: WineCrudFieldProps) => {
  const { t } = useTranslationHandler();
  const { fields, append, remove } = useFieldArray({
    name: name,
    control: form.control,
  });

  return (
    <div className="col-span-1 flex w-full flex-col gap-3 rounded-lg border p-4">
      <div className="space-y-0.5">
        <FormLabel className="text-xl">{label}</FormLabel>
        <FormDescription className="text-sm">{description}</FormDescription>
      </div>
      {fields.map((field, index) => (
        <FormField
          control={form.control}
          key={field.id}
          name={`${name}.${index}.name`}
          render={({ field }) => (
            <FormItem className="flex w-full flex-col items-start">
              <div className="flex w-full items-center gap-3">
                <FormControl className="">
                  <Input
                    {...field}
                    className="w-full shadow-none"
                    onBlur={(e) => {
                      if (autosave) {
                        onSubmit(
                          form.getValues() as z.infer<typeof wineFormSchema>,
                        );
                      }
                    }}
                  />
                </FormControl>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className=""
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
      <Button
        type="button"
        variant="dashed"
        onClick={() => append({ name: "" })}
        className=""
      >
        <Plus />
        {t(
          "wineStepper.wineryDetails.ingredients.acidityRegulators.buttonLabel",
        )}
      </Button>
    </div>
  );
};
