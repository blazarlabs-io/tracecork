import {
  FormField,
  FormLabel,
  FormDescription,
  FormItem,
  FormControl,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { wineFormSchema } from "@/data/form-schemas";
import { dynamicYears } from "@/utils/dynamic-years";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@repo/ui/components/ui/select";
import { X, Plus } from "lucide-react";
import { Input } from "@repo/ui/components/ui/input";
import { Button } from "@repo/ui/components/ui/button";
import { z } from "zod";
import { useFieldArray } from "react-hook-form";
import { useTranslationHandler } from "@/hooks/use-translation-handler";

export interface WineGrapeVarietiesFieldProps {
  form: any;
  name: string;
  autosave: boolean;
  onSubmit: (data: z.infer<typeof wineFormSchema>) => void;
}

export const WineGrapeVarietiesField = ({
  form,
  name,
  autosave,
  onSubmit,
}: WineGrapeVarietiesFieldProps) => {
  const { t } = useTranslationHandler();
  const { fields, append, remove } = useFieldArray({
    name: name,
    control: form.control,
  });

  return (
    <FormField
      control={form.control}
      name="generalInfo.grapeVarieties"
      render={() => (
        <div className="col-span-2 flex w-full flex-col gap-3 rounded-lg border p-4">
          <div className="space-y-0.5">
            <FormLabel className="text-xl">
              {t(
                "wineStepper.wineryDetails.generalInformation.grapeVarieties.label",
              )}
            </FormLabel>
            <FormDescription className="text-sm">
              {t(
                "wineStepper.wineryDetails.generalInformation.grapeVarieties.description",
              )}
            </FormDescription>
          </div>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex w-full items-center justify-between gap-3"
            >
              <div className="flex w-full flex-col gap-1">
                <FormLabel className="text-sm">
                  {t(
                    "wineStepper.wineryDetails.generalInformation.grapeVarieties.name.label",
                  )}
                </FormLabel>
                <FormField
                  control={form.control}
                  name={`${name}.${index}.name`}
                  render={({ field }) => {
                    return (
                      <FormItem className="flex w-full flex-col items-start">
                        <FormControl className="">
                          <Input
                            {...field}
                            id={`grapeVarieties.${index}.name`}
                            type="text"
                            placeholder="Name"
                            onBlur={(e) => {
                              if (autosave) {
                                onSubmit(
                                  form.getValues() as z.infer<
                                    typeof wineFormSchema
                                  >,
                                );
                              }
                              form.trigger();
                            }}
                            className="w-full shadow-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div className="flex w-full flex-col gap-1">
                <FormLabel className="text-sm">
                  {t(
                    "wineStepper.wineryDetails.generalInformation.grapeVarieties.percentage.label",
                  )}
                </FormLabel>
                <div className="flex w-full items-center gap-2">
                  <FormField
                    control={form.control}
                    name={`${name}.${index}.percentage`}
                    render={({ field }) => {
                      return (
                        <FormItem className="flex w-full flex-col items-start">
                          <FormControl className="">
                            <Input
                              {...field}
                              id={`grapeVarieties.${index}.percentage`}
                              min={0}
                              max={100}
                              placeholder="0"
                              type="number"
                              onBlur={(e) => {
                                if (autosave) {
                                  onSubmit(
                                    form.getValues() as z.infer<
                                      typeof wineFormSchema
                                    >,
                                  );
                                }
                                form.trigger();
                              }}
                              className="w-full shadow-none"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <p>%</p>
                </div>
              </div>
              <div className="flex w-full flex-col gap-1">
                <FormLabel className="text-sm">
                  {t(
                    "wineStepper.wineryDetails.generalInformation.grapeVarieties.vintage.label",
                  )}
                </FormLabel>
                <FormField
                  control={form.control}
                  name={`${name}.${index}.vintage`}
                  render={({ field }) => {
                    return (
                      <FormItem className="flex w-full flex-col items-start">
                        <FormControl className="">
                          <Select
                            onValueChange={(value) => {
                              if (value) {
                                field.onChange(value);
                                if (autosave) {
                                  onSubmit(
                                    form.getValues() as z.infer<
                                      typeof wineFormSchema
                                    >,
                                  );
                                }
                                form.trigger();
                              }
                            }}
                            value={field.value}
                          >
                            <SelectTrigger className="w-full shadow-none">
                              <SelectValue placeholder="Select a year" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {dynamicYears()
                                  .reverse()
                                  .map((year: number) => (
                                    <SelectItem
                                      key={year}
                                      value={year.toString()}
                                    >
                                      {year}
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
              </div>
              <button
                type="button"
                onClick={() => remove(index)}
                className="mt-5"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          ))}
          <Button
            type="button"
            variant="dashed"
            onClick={() => {
              append({
                name: "",
                percentage: "",
                vintage: "",
              });
              form.trigger();
            }}
            className=""
          >
            <Plus />
            Add
          </Button>
          <FormMessage />
        </div>
      )}
    />
  );
};
