import { NavigationBar } from "@/components/navigation/navigation-bar";

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full">
      <NavigationBar />

      <main className="flex h-[calc(100dvh-68px)] w-full items-center justify-center">
        {children}
      </main>
    </div>
  );
};
