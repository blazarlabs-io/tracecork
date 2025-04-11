import { initAdmin } from "@/lib/firebase/admin";
import { emailTemplates } from "@/utils/email-templates";
import {
  NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_SENDGRID_API_KEY,
  NEXT_PUBLIC_TRACECORK_EMAIL,
} from "@/utils/envConstants";
import * as sgMail from "@sendgrid/mail";
import admin from "firebase-admin";
import { ActionCodeSettings } from "firebase-admin/auth";

export async function POST(request: Request) {
  await initAdmin();
  const adminAuth = admin.auth();

  const data = await request.json();

  if (!data) {
    return Response.json({
      success: false,
    });
  }

  sgMail.setApiKey(NEXT_PUBLIC_SENDGRID_API_KEY as string);

  const baseUrl = NEXT_PUBLIC_APP_URL + "/confirm-email";

  const actionCodeSettings: ActionCodeSettings = {
    url: baseUrl,
    handleCodeInApp: true,
  };

  let url = "";

  try {
    url = await adminAuth.generateEmailVerificationLink(
      data.email as string,
      actionCodeSettings,
    );
  } catch (error) {
    console.log(error);
  }

  const params = url.split("?")[1];
  const verificationUrl = `${baseUrl}?${params}`;

  const msg: sgMail.MailDataRequired = {
    to: data.email,
    from: NEXT_PUBLIC_TRACECORK_EMAIL, // Use the email address or domain you verified above
    templateId: emailTemplates["confirmation-email"],
    personalizations: [
      {
        to: [{ email: data.email }],
        dynamicTemplateData: {
          verificationUrl,
        },
      },
    ],
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.log(error);
  }

  return Response.json({
    success: true,
  });
}
