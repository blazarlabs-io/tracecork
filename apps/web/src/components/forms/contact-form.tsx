"use client";

import { contactFormSchema } from "@/data/form-schemas";
import { toast } from "@repo/ui/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
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
import { Textarea } from "@repo/ui/components/ui/textarea";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/ui/dialog";
import { useTranslationHandler } from "@/hooks/use-translation-handler";
import MarkdownPreviewer from "../markdown-previewer/MarkdownPreviewer";
import "./contact-form-styles.css";
import { NEXT_PUBLIC_TRACECORK_EMAIL } from "@/utils/envConstants";
import { emailTemplates } from "@/utils/email-templates";
import { sendEmailService } from "@/services/email-services";

export const ContactForm = () => {
  const { t } = useTranslationHandler();
  // * HOOKS
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      email: "",
      message: "",
    },
  });

  // * STATE
  const [sending, setSending] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  // * HANDLERS
  const onSubmit = async (values: z.infer<typeof contactFormSchema>) => {
    // * Send email

    try {
      setSending(true);
      const toEmail = NEXT_PUBLIC_TRACECORK_EMAIL;
      if (!toEmail) return;
      await sendEmailService({
        toEmail,
        templateId: emailTemplates["contact-email"],
        dynamicTemplateData: {
          userEmail: values.email,
          userMessage: values.message,
        },
      });
      setSuccess(true);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: t("toasts.globals.somethingWentWrong.title"),
        description: t("toasts.globals.somethingWentWrong.description"),
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex w-[520px] flex-col gap-3">
      {success && (
        <Dialog open={success} onOpenChange={(open) => setSuccess(open)}>
          {/* <DialogTitle className="text-lg">
            Thanks for your message!
          </DialogTitle> */}
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {t("publicPages.contactPage.messageSuccess.title")}
              </DialogTitle>
              <DialogDescription>
                {t("publicPages.contactPage.messageSuccess.description")}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose className="rounded-md bg-primary px-4 py-2 text-primary-foreground">
                {t(
                  "publicPages.contactPage.messageSuccess.buttons.cancelButtonLabel",
                )}
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col items-start justify-start">
                  <div className="space-y-0.5">
                    <FormLabel className="text-sm">
                      {t("publicPages.contactPage.form.email.label")}
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder={t(
                        "publicPages.contactPage.form.email.placeholder",
                      )}
                      className="w-full shadow-none"
                      value={field.value || ""}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col items-start justify-start">
                  <div className="space-y-0.5">
                    <FormLabel className="text-sm">
                      {t("publicPages.contactPage.form.message.label")}
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Textarea
                      placeholder={t(
                        "publicPages.contactPage.form.message.placeholder",
                      )}
                      className="min-h-40 w-full shadow-none"
                      value={field.value || ""}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <div className="flex flex-col w-full items-center gap-4">
            <span className="text-sm text-muted-foreground copyright-container">
              <MarkdownPreviewer
                content={t("publicPages.contactPage.copyright")}
              />
            </span>
            <div className="flex items-center justify-end">
              <Button size="lg" type="submit" className="">
                {sending ? (
                  <LoaderCircle className="animate-spin text-primary-foreground" />
                ) : (
                  t("publicPages.contactPage.buttonLabel")
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
