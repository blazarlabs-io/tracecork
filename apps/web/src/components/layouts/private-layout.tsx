"use client";

import { AppSidebar } from "@/components/navigation/app-sidebar";
import { useTokenizer } from "~/src/context/tokenizer";
import { TokenizingLoader } from "../widgets/tokenizer/tokenizing-loder";
import { TokenizedWineDialog } from "../dialogs/tokenized-wine-dialog";
import { TokenizedWineBurnDialog } from "../dialogs/tokenized-wine-burn-dialog";
import { TokenizedWineUpdateDialog } from "../dialogs/tokenized-wine-update-dialog";

export const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
  const { tokenizing, action, previousAction, statusMonitor } = useTokenizer();
  return (
    <>
      {tokenizing ? (
        <div className="fixed z-50 flex items-center justify-center left-2 bottom-2">
          <TokenizingLoader
            action={action}
            title="Please wait..."
            message={statusMonitor.message}
          />
        </div>
      ) : (
        <>
          {previousAction === "create" ? (
            <TokenizedWineDialog />
          ) : previousAction === "update" ? (
            <TokenizedWineUpdateDialog />
          ) : previousAction === "burn" ? (
            <TokenizedWineBurnDialog />
          ) : (
            <></>
          )}
        </>
      )}
      <AppSidebar>
        <main className="overflow-hidden p-1 sm:p-2 md:p-3 lg:p-6">
          {children}
        </main>
      </AppSidebar>
    </>
  );
};
