import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { NEXT_PUBLIC_APP_URL } from "../utils/envConstants";

export function urlDomailHandler() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (window.location.host === NEXT_PUBLIC_APP_URL) return;
      const queryParams = searchParams.toString();
      const newUrl = `${NEXT_PUBLIC_APP_URL}/${pathname}?${queryParams}`;
      router.replace(newUrl);
    }, 300);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [pathname]);
}
