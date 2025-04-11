import {
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormControl,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { wineFormSchema } from "@/data/form-schemas";
import { volumes } from "@/data/systemVariables";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@repo/ui/components/ui/select";
import { z } from "zod";
import { KeyValueType } from "@/types/db";

export interface WineSelectFieldProps {
  name: string;
  label: string;
  description: string;
  form: any;
  placeholder?: string;
  options: string[];
  autosave: boolean;
  onSubmit: (data: z.infer<typeof wineFormSchema>) => void;
}

export const WineSelectStringField = ({
  name,
  label,
  description,
  options,
  placeholder,
  onSubmit,
  autosave,
  form,
}: WineSelectFieldProps) => {
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
                  <SelectValue placeholder={placeholder || ""} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {options.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
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
