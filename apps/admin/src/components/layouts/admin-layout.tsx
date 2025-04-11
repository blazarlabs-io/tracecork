import { AppSidebar } from "../navigation/app-sidebar";
import { Separator } from "@repo/ui/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@repo/ui/components/ui/sidebar";

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-start justify-start">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-14 shrink-0 items-center gap-2">
            <div className="flex flex-1 items-center gap-2 px-3">
              <SidebarTrigger />
              <Separator orientation="vertical" className="mr-2 h-4" />
            </div>
          </header>
          <main className="w-full p-4">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};
