"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@repo/ui/components/ui/dialog";
import { Input } from "@repo/ui/components/ui/input";
import { useAuth } from "@/context/auth";
import { useResponsiveSize } from "@/hooks/use-responsive-size";
import { toast } from "@repo/ui/hooks/use-toast";
import { auth } from "@/lib/firebase/client";
import { cn } from "@/utils/shadcn";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { ChangePasswordForm } from "../forms/change-password-form";
import { PageHeader } from "@/components/layouts/page-header";
import { Separator } from "@repo/ui/components/ui/separator";
import { Button } from "@repo/ui/components/ui/button";
import { useTranslationHandler } from "@/hooks/use-translation-handler";
import MarkdownPreviewer from "../markdown-previewer/MarkdownPreviewer";

export const ManageAccountPage = () => {
  // * HOOKS
  const { t } = useTranslationHandler();

  const { user } = useAuth();
  const { device } = useResponsiveSize();
  const router = useRouter();

  // * STATES
  const [isEmailPasswordProvider, setIsEmailPasswordProvider] =
    useState<boolean>(false);
  const [deletValue, setDeletValue] = useState<string>("");
  const [disableDelete, setDisableDelete] = useState<boolean>(true);
  const [openDeleteNotification, setOpenDeleteNotification] =
    useState<boolean>(false);

  const DELETE = t(
    "manageAccount.deleteAccount.dialog.deleteInputField.placeholder",
  );

  // * HANDLERS
  const handleValidateDelete = useCallback((value: string) => {
    setDeletValue(value);
    if (value === DELETE) {
      setDisableDelete(false);
    } else {
      setDisableDelete(true);
    }
  }, []);

  const handleDeleteNoticeClose = useCallback(
    (open: boolean) => {
      setOpenDeleteNotification(open);
      if (!open) {
        signOut(auth);
        router.push("/");
      }
    },
    [router],
  );

  const handleDelete = useCallback(() => {
    // * DISABLE USER
    fetch("/api/delete-user", {
      method: "POST",
      body: JSON.stringify({
        uid: user?.uid,
        email: user?.email,
        templateId: "d-9f999f3f9f1b4c20a8d05ad9bb84c0ff",
      }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then(async (res) => {
        toast({
          title: t("toasts.userSettings.accountDeleted.title"),
          description: t("toasts.userSettings.accountDeleted.description"),
        });
        setOpenDeleteNotification(true);
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: t("toasts.userSettings.accountDeletedError.title"),
          description: t("toasts.userSettings.accountDeletedError.description"),
        });
      });
  }, []);

  useEffect(() => {
    if (user) {
      user.providerData.forEach((provider) => {
        if (provider.providerId === "password") {
          setIsEmailPasswordProvider(true);
        } else {
          setIsEmailPasswordProvider(false);
        }
      });
    }
  }, [user]);

  return (
    <div className="flex w-full flex-col gap-6">
      <PageHeader
        title={t("manageAccount.headline")}
        subtitle={t("manageAccount.subHeadline")}
      />
      <Separator className="w-full" />
      {/* * CHANGE PASSWORD */}
      {isEmailPasswordProvider && (
        <Card className="flex w-full flex-col items-start rounded-[8px] shadow-none">
          <CardHeader className="w-full">
            <div
              className={cn(
                "flex h-full w-full items-center justify-between gap-4",
                device === "mobile" && "flex-col",
              )}
            >
              <div className="space-y-1">
                <CardTitle className="text-xl">
                  {t("manageAccount.changePassword.label")}
                </CardTitle>
                <CardDescription className="text-sm">
                  {t("manageAccount.changePassword.description")}
                </CardDescription>
              </div>
              <Dialog>
                <DialogTitle></DialogTitle>
                <DialogTrigger
                  className={cn(
                    "h-10 min-w-fit rounded-md border border-border px-8 text-sm font-medium transition duration-200 ease-in-out hover:bg-muted",
                    device === "mobile" && "w-full",
                  )}
                >
                  {t("manageAccount.changePassword.buttonLabel")}
                </DialogTrigger>
                <DialogContent className="max-w-[360px]">
                  <DialogHeader>
                    <DialogTitle>
                      {t("manageAccount.changePassword.dialog.title")}
                    </DialogTitle>
                    <DialogDescription>
                      {t("manageAccount.changePassword.dialog.description")}
                    </DialogDescription>
                  </DialogHeader>
                  {/*  */}
                  <ChangePasswordForm />
                  {/*  */}
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
        </Card>
      )}

      {/* * DELETE ACCOUNT */}
      <Card className="flex w-full flex-col items-start rounded-[8px] shadow-none">
        <CardHeader className="w-full">
          <div
            className={cn(
              "flex h-full w-full items-center justify-between gap-4",
              device === "mobile" ? "flex-col" : "flex-row",
            )}
          >
            <div className="grow space-y-1">
              <CardTitle className="text-xl">
                {t("manageAccount.deleteAccount.label")}
              </CardTitle>
              <CardDescription className="text-sm">
                {t("manageAccount.deleteAccount.description")}
              </CardDescription>
            </div>
            {/* *DELETE CONFIRMATION  */}
            <Dialog>
              <DialogTitle></DialogTitle>
              <DialogTrigger
                className={cn(
                  "h-10 rounded-md border border-destructive px-8 text-sm text-destructive hover:bg-destructive hover:text-destructive-foreground",
                  device === "mobile" && "w-full",
                )}
              >
                {t("manageAccount.deleteAccount.buttonLabel")}
              </DialogTrigger>
              <DialogContent className="max-w-[360px]">
                <DialogHeader>
                  <DialogTitle>
                    {t("manageAccount.deleteAccount.dialog.title")}
                  </DialogTitle>
                  <DialogDescription>
                    <MarkdownPreviewer
                      content={t(
                        "manageAccount.deleteAccount.dialog.description",
                      )}
                    />
                  </DialogDescription>
                </DialogHeader>
                <Input
                  type="text"
                  placeholder={t(
                    "manageAccount.deleteAccount.dialog.deleteInputField.placeholder",
                  )}
                  value={deletValue || ""}
                  onChange={(e) => handleValidateDelete(e.target.value)}
                  className="border bg-transparent px-4 py-3 text-sm shadow-none"
                />
                <DialogFooter>
                  <div className="flex w-full items-center justify-end gap-2">
                    <DialogClose
                      className={cn(
                        "h-10 min-w-fit rounded-md px-8 text-sm font-medium text-muted-foreground transition duration-200 ease-in-out hover:bg-muted/90",
                        device === "mobile" && "w-full",
                      )}
                    >
                      {t(
                        "manageAccount.deleteAccount.dialog.buttons.cancelButtonLabel",
                      )}
                    </DialogClose>
                    <DialogClose
                      disabled={disableDelete}
                      className={cn(
                        "h-10 min-w-fit rounded-md bg-destructive px-8 text-sm font-medium text-destructive-foreground transition duration-200 ease-in-out hover:bg-destructive/90",
                        disableDelete && "pointer-events-none opacity-50",
                        device === "mobile" && "w-full",
                      )}
                      onClick={handleDelete}
                    >
                      {t(
                        "manageAccount.deleteAccount.dialog.buttons.confirmButtonLabel",
                      )}
                    </DialogClose>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            {/* * DELETE NOTICE AFTER CONFIRM */}
            <Dialog
              open={openDeleteNotification}
              onOpenChange={handleDeleteNoticeClose}
            >
              <DialogTitle></DialogTitle>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {t(
                      "dashboardGlobalComponents.dialogs.deleteNoticeDialog.title",
                    )}
                  </DialogTitle>
                  <DialogDescription>
                    <span className="delete-notice-description-container">
                      <MarkdownPreviewer
                        content={t(
                          "dashboardGlobalComponents.dialogs.deleteNoticeDialog.description",
                        )}
                      />
                    </span>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex justify-end">
                  <DialogClose asChild>
                    <Button type="button" variant="default">
                      {t(
                        "dashboardGlobalComponents.dialogs.deleteNoticeDialog.buttons.confirmButtonLabel",
                      )}
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};
