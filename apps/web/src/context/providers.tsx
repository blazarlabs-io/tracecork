"use client";

import { AuthProvider } from "./auth";
import { APIProvider } from "@vis.gl/react-google-maps";
import { Toaster } from "@repo/ui/components/ui/toaster";
import { WineryProvider } from "./winery";
import { ExplorerProvider } from "./explorer";
import { SystemVariablesProvider } from "./system-variables";
import { CmsProvider } from "./cms";
import { NEXT_PUBLIC_GOOGLE_MAPS_API_KEY } from "../utils/envConstants";
import { LocaleProvider } from "./LanguageProvider";
import { TokenizerProvider } from "./tokenizer";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Toaster />
      <CmsProvider>
        <TokenizerProvider>
          <ExplorerProvider>
            <SystemVariablesProvider>
              <AuthProvider>
                <WineryProvider>
                  <APIProvider apiKey={NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
                    <LocaleProvider>{children}</LocaleProvider>
                  </APIProvider>
                </WineryProvider>
              </AuthProvider>
            </SystemVariablesProvider>
          </ExplorerProvider>
        </TokenizerProvider>
      </CmsProvider>
    </>
  );
};
