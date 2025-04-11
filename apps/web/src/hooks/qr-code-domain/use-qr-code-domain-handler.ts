import { useEffect, useState } from "react";
import { NEXT_PUBLIC_APP_URL } from "../../utils/envConstants";

/*
  This hook takes care of confirming if the host is the same as the configured
  as env variable.
  If the host is not the same, the app will redirect to the app url with the same path.

  The use case here is when some one read the new wine QR code, This code has a value
  with the QR code url (static host), so when redirect to https:/static-host/explore/wine/id
  Then this hook will confirm the url host and change the host to the current assign
  to the app.
*/
export function useQrCodeDomainHandler(wineId: string) {
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (
        typeof window !== "undefined" &&
        window.location.origin !== NEXT_PUBLIC_APP_URL
      ) {
        const newUrl = `${NEXT_PUBLIC_APP_URL}/explore/wine/${wineId}`;
        window.location.href = newUrl;
      }
      setIsChecking(false);
    }, 300);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [wineId]);

  return { isChecking };
}
