import { ContactForm } from "@/components/forms/contact-form";
import { useTranslationHandler } from "@/hooks/use-translation-handler";

export interface ContactPageProps {}

export const ContactPage = ({}: ContactPageProps) => {
  const { t } = useTranslationHandler();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 px-8 py-8">
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <h2 className="text-3xl font-bold">
          {t("publicPages.contactPage.headline")}
        </h2>
        <p className="text-center">
          {t("publicPages.contactPage.subHeadline")}
        </p>
      </div>
      <div className="flex w-full items-center justify-center gap-8">
        <ContactForm />
      </div>
    </div>
  );
};
