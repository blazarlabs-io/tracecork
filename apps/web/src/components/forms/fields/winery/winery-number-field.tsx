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

export interface WineryNumberFieldProps {
  name: string;
  label: string;
  description: string;
  onSubmit: (data: z.infer<typeof wineryInfoFormSchema>) => void;
  placeholder?: string;
  form: any;
  min?: number;
  max?: number;
  step?: number;
  complementaryText?: string;
  autosave: boolean;
}

export const WineryNumberField = ({
  name,
  label,
  description,
  onSubmit,
  placeholder,
  form,
  min,
  max,
  step,
  complementaryText,
  autosave,
}: WineryNumberFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex w-full flex-col items-start justify-start rounded-lg border p-4">
          <div className="space-y-0.5">
            <FormLabel className="text-xl">{label}</FormLabel>
            <FormDescription className="text-sm">{description}</FormDescription>
          </div>
          <FormControl>
            <div className="flex w-full items-center gap-2">
              <Input
                type="number"
                placeholder={placeholder || ""}
                min={min}
                max={max}
                step={step}
                className="w-full shadow-none"
                value={(field.value as string) || ""}
                onChange={field.onChange}
                onBlur={(e) => {
                  if (autosave) onSubmit(form.getValues());
                }}
              />
              {complementaryText && (
                <span className="text-sm text-muted-foreground">
                  {complementaryText}
                </span>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
