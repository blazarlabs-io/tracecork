type SendEmailProps = {
  toEmail: string;
  templateId: string;
  dynamicTemplateData: { [key: string]: any };
};

export const sendEmailService = async ({
  toEmail,
  templateId,
  dynamicTemplateData,
}: SendEmailProps) => {
  await fetch(`/api/send-email`, {
    method: "POST",
    body: JSON.stringify({
      to: toEmail,
      templateId,
      dynamicTemplateData,
    }),
  });
};
