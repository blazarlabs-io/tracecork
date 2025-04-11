import { useQrCodeExists } from "@/hooks/use-qr-code-exists";
import { useQRCodesLimit } from "@/hooks/use-qr-codes-limit";
import { PublishOldWineDialog } from "./secure-publish-wine/publish-old-wine-dialog";
import { MissingFieldsDialog } from "./secure-publish-wine/missing-fields-dialog";
import { PublishNewWineDialog } from "./secure-publish-wine/publish-new-wine-dialog";
import { QrCodeQuaotaExceededDialog } from "./secure-publish-wine/qr-code-quota-excedded-dialog";

export interface SecurePublishWineDialogProps {
  uid: string;
  wineId: string;
  collectionName: string;
  isReadytoPublish: boolean;
  className?: string;
  children?: React.ReactNode;
  onChange?: (open: boolean) => void;
  onPublish?: (url: string) => void;
  onAction?: (state: string) => void;
}

export const SecurePublishWineDialog = ({
  uid,
  wineId,
  collectionName,
  isReadytoPublish,
  className,
  children,
  onPublish = async () => {},
  onAction = async () => {},
}: SecurePublishWineDialogProps) => {
  // * HOOKS

  const { qrCodesLeft } = useQRCodesLimit();
  const { qrCodeExists } = useQrCodeExists(uid, wineId);

  return (
    <>
      {qrCodeExists ? (
        <>
          {isReadytoPublish ? (
            <>
              {/* * PUBLISH WINE (OLD WINE) */}
              <PublishOldWineDialog
                uid={uid}
                wineId={wineId}
                collectionName={collectionName}
                onAction={onAction}
              >
                {children}
              </PublishOldWineDialog>
            </>
          ) : (
            <>
              {/* * MISSING FIELDS */}
              <MissingFieldsDialog wineId={wineId} onAction={onAction}>
                {children}
              </MissingFieldsDialog>
            </>
          )}
        </>
      ) : (
        <>
          {isReadytoPublish ? (
            <>
              {qrCodesLeft > 0 ? (
                <>
                  {/* * PUBLISH WINE (NEW WINE) */}
                  <PublishNewWineDialog
                    uid={uid}
                    wineId={wineId}
                    isReadytoPublish={isReadytoPublish}
                    collectionName={collectionName}
                    onPublish={onPublish}
                    onAction={onAction}
                  >
                    {children}
                  </PublishNewWineDialog>
                </>
              ) : (
                <>
                  {/* * QR CODE QUOTA EXCEEDED */}
                  <QrCodeQuaotaExceededDialog onAction={onAction}>
                    {children}
                  </QrCodeQuaotaExceededDialog>
                </>
              )}
            </>
          ) : (
            <>
              {/* * MISSING FIELDS */}
              <MissingFieldsDialog wineId={wineId} onAction={onAction}>
                {children}
              </MissingFieldsDialog>
            </>
          )}
        </>
      )}
    </>
  );
};
