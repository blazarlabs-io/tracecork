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

export interface TextFieldProps {
  name: string;
  label: string;
  description: string;
  form: any;
  placeholder?: string;
  autosave: boolean;
  onSubmit: (data: z.infer<typeof wineFormSchema>) => void;
}

export const WineTextField = ({
  name,
  label,
  description,
  onSubmit,
  placeholder,
  form,
  autosave,
}: TextFieldProps) => {
  // console.log(autosave);
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
              <Input
                type="text"
                placeholder={placeholder || ""}
                className="w-full shadow-none"
                value={field.value || ""}
                onChange={field.onChange}
                onBlur={(e) => {
                  if (autosave) {
                    onSubmit(
                      form.getValues() as z.infer<typeof wineFormSchema>,
                    );
                  }
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
