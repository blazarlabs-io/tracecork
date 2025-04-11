import { loginFormSchema } from "../../../data/form-schemas";
import type { Control, FieldPath } from "react-hook-form";
import { z } from "zod";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export interface PasswordInputFieldProps {
  name: FieldPath<z.infer<typeof loginFormSchema>>;
  label?: string;
  placeholder: string;
  description?: string;
  formControl: Control<z.infer<typeof loginFormSchema>, any>;
}

export const PasswordInputField: React.FC<PasswordInputFieldProps> = ({
  name,
  label,
  placeholder,
  description,
  formControl,
}) => {
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);

  const handlePaswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <div className="relative flex items-center rounded-md border border-border bg-background text-foreground">
              <Input
                type={passwordVisibility ? "text" : "password"}
                placeholder={placeholder}
                {...field}
                className="border-0 bg-transparent px-4 py-3 text-sm shadow-none"
              />
              <button
                type="button"
                onClick={handlePaswordVisibility}
                className="absolute right-2"
              >
                {passwordVisibility ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeOff className="h-4 w-4" />
                )}
              </button>
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
