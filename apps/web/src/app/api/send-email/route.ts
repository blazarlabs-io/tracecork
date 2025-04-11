import * as sgMail from "@sendgrid/mail";
import {
  NEXT_PUBLIC_SENDGRID_API_KEY,
  NEXT_PUBLIC_TRACECORK_EMAIL,
} from "@/utils/envConstants";

export async function POST(request: Request) {
  const data = await request.json();

  if (!data) {
    return Response.json({
      success: false,
    });
  }

  sgMail.setApiKey(NEXT_PUBLIC_SENDGRID_API_KEY as string);

  let msg: sgMail.MailDataRequired = {
    to: data.to,
    from: NEXT_PUBLIC_TRACECORK_EMAIL as string, // Use the email address or domain you verified above
    templateId: data.templateId,
  };

  if (data.attachments !== undefined) {
    msg = {
      ...msg,
      personalizations: [
        {
          to: [{ email: data.to }],
          dynamicTemplateData: data.dynamicTemplateData,
        },
      ],
      attachments: data.attachments,
    };
  } else {
    msg = {
      ...msg,
      personalizations: [
        {
          to: [{ email: data.to }],
          dynamicTemplateData: data.dynamicTemplateData,
        },
      ],
    };
  }

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(error);
  }

  return Response.json({
    success: true,
  });
}
