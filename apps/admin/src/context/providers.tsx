import { AuthProvider } from "./auth";
import { NavigationProvider } from "./navigation";
import { WineriesProvider } from "./wineries";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuthProvider>
        <WineriesProvider>
          <NavigationProvider>{children}</NavigationProvider>
        </WineriesProvider>
      </AuthProvider>
    </>
  );
};
