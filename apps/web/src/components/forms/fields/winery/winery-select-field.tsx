import {
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormControl,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { wineryInfoFormSchema } from "@/data/form-schemas";
import { dynamicYears } from "@/utils/dynamic-years";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@repo/ui/components/ui/select";
import { z } from "zod";

export interface WinerySelectFieldProps {
  name: string;
  label: string;
  description: string;
  form: any;
  placeholder?: string;
  options: string[] | number[];
  onSubmit: (data: z.infer<typeof wineryInfoFormSchema>) => void;
  autosave: boolean;
}

export const WinerySelectField = ({
  name,
  label,
  description,
  form,
  placeholder,
  options,
  onSubmit,
  autosave,
}: WinerySelectFieldProps) => {
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
                    if (autosave) onSubmit(form.getValues());
                  }
                }}
                value={field.value}
              >
                <SelectTrigger className="w-full shadow-none">
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {options.map((option: string | number) => (
                      <SelectItem
                        key={option}
                        value={
                          typeof option === "string"
                            ? option
                            : option.toString()
                        }
                      >
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
