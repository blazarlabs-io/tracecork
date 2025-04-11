import {
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormControl,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { wineryInfoFormSchema } from "@/data/form-schemas";
import { Input } from "@repo/ui/components/ui/input";
import { z } from "zod";

export interface WineryTextFieldProps {
  name: string;
  label: string;
  description: string;
  onSubmit: (data: z.infer<typeof wineryInfoFormSchema>) => void;
  placeholder?: string;
  form: any;
  autosave: boolean;
}

export const WineryTextField = ({
  name,
  label,
  description,
  onSubmit,
  placeholder,
  form,
  autosave,
}: WineryTextFieldProps) => {
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
                value={(field.value as string) || ""}
                onChange={field.onChange}
                onBlur={(e) => {
                  if (autosave) {
                    onSubmit(form.getValues());
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
