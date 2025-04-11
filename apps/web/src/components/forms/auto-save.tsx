"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@repo/ui/components/ui/form";
import { Switch } from "@repo/ui/components/ui/switch";
import { toast } from "@repo/ui/hooks/use-toast";
import { autosaveFormSchema } from "@/data/form-schemas";
import { db } from "@/lib/firebase/services/db";
import { useAuth } from "@/context/auth";
import { DbResponse } from "@/types/db";
import { useWinery } from "@/context/winery";
import { useEffect, useRef } from "react";
import { useTranslationHandler } from "@/hooks/use-translation-handler";

export const AutoSave = () => {
  // * HOOKs
  const { t } = useTranslationHandler();
  const { user } = useAuth();
  const { winery } = useWinery();

  const form = useForm<z.infer<typeof autosaveFormSchema>>({
    resolver: zodResolver(autosaveFormSchema),
    defaultValues: {
      autosave: false,
    },
  });

  // * REFS
  const mountRef = useRef<boolean>(false);

  // * HANDLERS
  const onSubmit = (data: z.infer<typeof autosaveFormSchema>) => {
    // * UPDATE WINERY
    db.winery
      .update(user?.uid as string, { settings: { autosave: data.autosave } })
      .then((res: DbResponse) => {
        // console.log(res);
      })
      .catch((error: DbResponse) => {
        console.log(error);
      });

    // * TOAST
    toast({
      title: t("toasts.userSettings.autoSave.title"),
      description: t("toasts.userSettings.autoSave.description", {
        enabled: data.autosave
          ? t("toasts.userSettings.autoSave.enabled")
          : t("toasts.userSettings.autoSave.disabled"),
        turnOn: data.autosave
          ? t("toasts.userSettings.autoSave.turnOff")
          : t("toasts.userSettings.autoSave.turnOn"),
      }),
    });
  };

  useEffect(() => {
    if (!mountRef.current && winery) {
      mountRef.current = true;
      // * SET AUTOSAAVE VALUE FROM WINERY DB
      if (
        winery.settings?.autosave !== undefined &&
        winery.settings.autosave !== null
      )
        form.setValue("autosave", winery.settings.autosave);
    }
  }, [winery]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div>
          <h3 className="mb-4 text-lg font-medium">
            {t("generalSettings.saveSettings.title")}
          </h3>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="autosave"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>
                      {t("generalSettings.saveSettings.switchCard.label")}
                    </FormLabel>
                    <FormDescription>
                      {t("generalSettings.saveSettings.switchCard.description")}
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={(value) => {
                        field.onChange(value);
                        form.handleSubmit(onSubmit)();
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
};
