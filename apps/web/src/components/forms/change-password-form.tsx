"use client";

import { useAuth } from "@/context/auth";
import { changePasswordFormSchema } from "@/data/form-schemas";
import { toast } from "@repo/ui/hooks/use-toast";
import { auth } from "@/lib/firebase/client";
import { firebaseAuthErrors } from "@/utils/firebaseAuthErrors";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  User,
} from "firebase/auth";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@repo/ui/components/ui/button";
import { DialogClose } from "@repo/ui/components/ui/dialog";
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

export const ChangePasswordForm = () => {
  // * HOOKS
  const { t } = useTranslationHandler();
  const { user } = useAuth();
  const router = useRouter();
  const form = useForm<z.infer<typeof changePasswordFormSchema>>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  // * STATES
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);

  // * HANDLERS
  const onSubmit = (values: z.infer<typeof changePasswordFormSchema>) => {
    // * login and change password
    signInWithEmailAndPassword(
      auth,
      user?.email as string,
      values.currentPassword,
    )
      .then((userCredential) => {
        // Signed in
        const updatedUser = userCredential.user;
        updatePassword(updatedUser as User, values.newPassword)
          .then(() => {
            // Password updated
            signOut(auth).then(() => {
              // Sign-out successful
              router.replace("/home");
            });
            toast({
              variant: "default",
              title: t("toasts.userSettings.passwordChanged.title"),
              description: t("toasts.userSettings.passwordChanged.description"),
            });
          })
          .catch((error) => {
            console.log(error.code);
            toast({
              variant: "destructive",
              title: t("toasts.globals.error.title"),
              description: t("toasts.globals.error.description", {
                message: firebaseAuthErrors[error.code],
              }),
            });
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        toast({
          variant: "destructive",
          title: t("toasts.globals.error.title"),
          description: t("toasts.globals.error.description", {
            message: firebaseAuthErrors[errorCode],
          }),
        });
      });
  };

  const handlePaswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <FormField
          control={form.control}
          name={"currentPassword"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("manageAccount.changePassword.dialog.currentPassword.label")}
              </FormLabel>
              <FormControl>
                <div className="relative flex items-center rounded-md border border-border bg-background text-foreground">
                  <Input
                    type={passwordVisibility ? "text" : "password"}
                    placeholder={t(
                      "manageAccount.changePassword.dialog.currentPassword.placeholder",
                    )}
                    {...field}
                    className="border-0 bg-transparent px-4 py-3 text-sm shadow-none"
                  />
                  <button
                    onClick={handlePaswordVisibility}
                    type="button"
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
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"newPassword"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("manageAccount.changePassword.dialog.newPassword.label")}
              </FormLabel>
              <FormControl>
                <div className="relative flex items-center rounded-md border border-border bg-background text-foreground">
                  <Input
                    type={passwordVisibility ? "text" : "password"}
                    placeholder={t(
                      "manageAccount.changePassword.dialog.newPassword.placeholder",
                    )}
                    {...field}
                    className="border-0 bg-transparent px-4 py-3 text-sm shadow-none"
                  />
                  <button
                    onClick={handlePaswordVisibility}
                    type="button"
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
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"confirmNewPassword"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("manageAccount.changePassword.dialog.confirmPassword.label")}
              </FormLabel>
              <FormControl>
                <div className="relative flex items-center rounded-md border border-border bg-background text-foreground">
                  <Input
                    type={passwordVisibility ? "text" : "password"}
                    placeholder={t(
                      "manageAccount.changePassword.dialog.confirmPassword.placeholder",
                    )}
                    {...field}
                    className="border-0 bg-transparent px-4 py-3 text-sm shadow-none"
                  />
                  <button
                    onClick={handlePaswordVisibility}
                    type="button"
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
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full items-center justify-end gap-4">
          <DialogClose className="px-4 py-2 text-sm">
            {t("manageAccount.changePassword.dialog.buttons.cancelButtonLabel")}
          </DialogClose>
          <Button size="lg" type="submit" className="">
            {t(
              "manageAccount.changePassword.dialog.buttons.confirmButtonLabel",
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
