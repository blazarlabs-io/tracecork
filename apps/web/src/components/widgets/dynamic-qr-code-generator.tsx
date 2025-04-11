import { base64ToFile, getQrCodeImageData } from "@/utils/qr-code";
import { useCallback, useEffect, useRef } from "react";
import { QRCode } from "react-qrcode-logo";
import { NEXT_PUBLIC_QR_CODES_URL } from "@/utils/envConstants";

export interface DynamicQrCodeGeneratorProps {
  wineId: string;
  onGenerated: (file: File, base64: string) => void;
}

export const DynamicQrCodeGenerator = ({
  wineId,
  onGenerated,
}: DynamicQrCodeGeneratorProps) => {
  const mountRef = useRef<boolean>(false);

  const handleOnGenerated = useCallback(
    (file: File, base64: string) => {
      onGenerated(file as File, base64 as string);
    },
    [onGenerated],
  );

  useEffect(() => {
    if (!mountRef.current && wineId) {
      mountRef.current = true;
      const base64String = getQrCodeImageData("react-qrcode-logo");
      const file = base64ToFile(base64String, "qr-code.png");
      handleOnGenerated(file, base64String);
    }
  }, [wineId]);

  const qrCodeValue = `${NEXT_PUBLIC_QR_CODES_URL}/explore/wine/${wineId}`;

  return (
    <div className="hidden">
      <QRCode
        value={qrCodeValue}
        size={1500}
        qrStyle="squares"
        eyeRadius={4}
        id="react-qrcode-logo"
      />
    </div>
  );
};
