"use client";

import { forgotPasswordSchema } from "@/data/form-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@repo/ui/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";
import { useTranslationHandler } from "@/hooks/use-translation-handler";
import { useState } from "react";
import { sendPasswordRecoveryEmailService } from "@/services/auth/auth-emails-services";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/local-storage";
import { ForgotPassStorage } from "@/types/authTypes";
import { FORGOT_PASS_KEY } from "@/utils/authConstants";
import { cn } from "@repo/ui/lib/utils";

export const ForgotPasswordForm = () => {
  // * HOOKS
  const { t } = useTranslationHandler();
  const router = useRouter();
  const [isSubmiting, setIsSubmiting] = useState(false);
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email:
        getFromLocalStorage<ForgotPassStorage>(FORGOT_PASS_KEY)?.email || "",
    },
  });

  // * HANDLERS
  const onSubmit = async (values: z.infer<typeof forgotPasswordSchema>) => {
    try {
      if (!values.email) return;
      setIsSubmiting(true);
      await sendPasswordRecoveryEmailService(values.email);
      setToLocalStorage<ForgotPassStorage>(FORGOT_PASS_KEY, {
        email: values.email,
      });
      router.push("/password-reset-sent");
    } catch (error) {
      console.error("Error submiting forgot password request");
    } finally {
      setIsSubmiting(false);
    }
  };

  return (
    <div
      className={cn(
        "w-full sm:w-[360px] max-w-[360px]",
        "flex flex-col gap-3",
        "rounded-[12px] border px-2 py-4 sm:p-6",
      )}
    >
      <div className="flex flex-col items-center justify-center gap-2">
        <h2 className="text-2xl font-bold">
          {t("authPages.forgotPassword.title")}
        </h2>
        <span className="text-muted-foreground">
          {t("authPages.forgotPassword.message")}
        </span>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <FormField
            control={form.control}
            name="email"
            disabled={isSubmiting}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("authPages.forgotPassword.email.label")}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t(
                      "authPages.forgotPassword.email.placeholder",
                    )}
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmiting || !form.formState.isValid}
          >
            {t("authPages.forgotPassword.sendButtonLable")}
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="flex w-full items-center gap-2"
            onClick={() => router.back()}
            disabled={isSubmiting}
          >
            <ArrowLeft className="h-4 w-4" />
            {t("authPages.forgotPassword.backButtonLable")}
          </Button>
        </form>
      </Form>
    </div>
  );
};
