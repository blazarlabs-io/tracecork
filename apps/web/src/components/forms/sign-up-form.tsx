"use client";

import { signUpFormSchema } from "@/data/form-schemas";
import { auth } from "@/lib/firebase/client";
import { cn } from "@/utils/shadcn";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Control, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@repo/ui/components/ui/button";
import { Form } from "@repo/ui/components/ui/form";
import { SignUpInputField } from "./fields/signup-input-field";
import { SignUpPasswordInputField } from "./signup-password-input-field";
import { useTranslationHandler } from "@/hooks/use-translation-handler";
import "./login-form-styles.css";
import MarkdownPreviewer from "../markdown-previewer/MarkdownPreviewer";
import { sendVerificationEmailService } from "@/services/auth/auth-emails-services";
import { useCaptcha, useGoogleSignIn } from "@/hooks/auth";
import { toast } from "@repo/ui/hooks/use-toast";
import { firebaseAuthErrors } from "@/utils/firebaseAuthErrors";
import { NEXT_PUBLIC_CAPTCHA_SITE_KEY } from "@/utils/envConstants";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth";

export const SignUpForm = () => {
  // * STATE
  const router = useRouter();
  const { setUserHandler } = useAuth();
  const [isSingingUp, setIsSingingUp] = useState(false);

  // * HOOKS
  const { t } = useTranslationHandler();
  const { isGoogleLogin, handleSignInWithGoogle } = useGoogleSignIn();
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });
  // This avoid doing validation and showing errors after captcha validation if the input values are not dirty (different from the default values)
  const handleRefreshForm = useCallback(() => {
    try {
      if (form.formState.isDirty) form.trigger();
      return;
    } catch (e) {
      console.error(e);
    }
  }, [form.formState.isDirty]);
  const { recaptchaRef, isVerified, handleExpired, handleChange } = useCaptcha({
    synchWithFormState: handleRefreshForm,
  });

  // * HANDLERS
  const onSubmit = async (values: z.infer<typeof signUpFormSchema>) => {
    try {
      setIsSingingUp(true);
      // * Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password,
      );
      // Signed in
      const user = userCredential.user;
      await setUserHandler(user);
      const userEmail = user.email ? user.email : values.email;

      // console.log("USER:", user);
      await sendVerificationEmailService(userEmail);
      router.replace("/verify-email");
    } catch (error: any) {
      console.error(error);
      toast({
        variant: "destructive",
        title: t("toasts.globals.error.title"),
        description: t("toasts.globals.error.description", {
          message: firebaseAuthErrors[error.code],
        }),
      });
    } finally {
      setIsSingingUp(false);
    }
  };
  const isProcessing = isSingingUp || isGoogleLogin;

  return (
    <div
      className={cn(
        "w-full sm:w-[360px] max-w-[360px]",
        "flex flex-col gap-3",
        "rounded-[12px] border px-2 py-4 sm:p-6",
      )}
    >
      <h1 className="pb-4 text-center text-2xl font-semibold">
        {t("publicComponents.signup.title")}
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <SignUpInputField
            name="email"
            placeholder={t("publicComponents.signup.email.placeholder")}
            inputType="email"
            formControl={
              form.control as Control<z.infer<typeof signUpFormSchema>>
            }
            isDisabled={isProcessing}
          />
          <SignUpPasswordInputField
            name="password"
            placeholder={t("publicComponents.signup.password.placeholder")}
            formControl={
              form.control as Control<z.infer<typeof signUpFormSchema>>
            }
            isDisabled={isProcessing}
          />
          <SignUpPasswordInputField
            name="confirmPassword"
            placeholder={t(
              "publicComponents.signup.confirmPassword.placeholder",
            )}
            formControl={
              form.control as Control<z.infer<typeof signUpFormSchema>>
            }
            isDisabled={isProcessing}
          />
          <div className="flex w-full items-center justify-center">
            <ReCAPTCHA
              sitekey={NEXT_PUBLIC_CAPTCHA_SITE_KEY}
              ref={recaptchaRef}
              onChange={handleChange}
              onExpired={handleExpired}
            />
          </div>
          <Button
            disabled={!isVerified || isProcessing || !form.formState.isValid}
            size="lg"
            type="submit"
            className="w-full"
          >
            {t("publicComponents.signup.signUpButtonLabel")}
          </Button>
          <div className="flex items-center justify-center gap-3">
            <p className="text-sm leading-[20px] text-muted-foreground">
              {t("publicComponents.signup.loginText.text")}
            </p>
            <Link
              href="/login"
              className="text-sm font-bold text-primary underline"
            >
              {t("publicComponents.signup.loginText.buttonLabel")}
            </Link>
          </div>
        </form>
      </Form>
      <div className="flex w-full items-center justify-between gap-4 py-2">
        <div className="h-[1px] w-full bg-border" />
        <span className="min-w-fit">
          {t("publicComponents.signup.separatorText")}
        </span>
        <div className="h-[1px] w-full bg-border" />
      </div>
      <button
        disabled={!isVerified || isProcessing}
        onClick={handleSignInWithGoogle}
        className={cn(
          "flex w-full sm:w-[320px]",
          "flex items-center justify-center gap-3",
          "rounded-md border border-border bg-foreground px-4 py-2 text-base text-background",
          "disabled:bg-slate-400 disabled:text-slate-300",
        )}
      >
        <Image
          src="/images/google-color-icon.svg"
          alt="Logo"
          width={24}
          height={24}
          className={cn(!isVerified && "opacity-30 grayscale")}
        />
        {t("publicComponents.signup.googleButtonLabel")}
      </button>
      <div className="mt-[16px] w-full sm:w-[320px] px-2">
        <MarkdownPreviewer
          className="text-xs leading-[20px] text-muted-foreground legal-text-container"
          content={t("publicComponents.login.legalText")}
        />
      </div>
    </div>
  );
};
