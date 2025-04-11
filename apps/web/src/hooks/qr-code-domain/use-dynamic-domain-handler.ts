import { useEffect } from "react";
import { NEXT_PUBLIC_APP_URL } from "../../utils/envConstants";

/*
  This hooks redirects all to the app rul to an especific path to
  explore and view the wine details.
  This is used in a dynamic pages to handle a deprecated static url,
  the static url come from a deprecated QR code that pointed to a
  dynamic path.
  Now the QR code point to the explore wine path.
*/
export function useDynamicDomainHandler(wineId: string) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const newUrl = `${NEXT_PUBLIC_APP_URL}/explore/wine/${wineId}`;
      if (typeof window !== "undefined") window.location.href = newUrl;
    }, 300);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [wineId]);
}
