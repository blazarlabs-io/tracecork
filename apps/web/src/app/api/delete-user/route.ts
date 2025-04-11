import { adminAuth, initAdmin } from "@/lib/firebase/admin";
import {
  NEXT_PUBLIC_SENDGRID_API_KEY,
  NEXT_PUBLIC_TRACECORK_EMAIL,
} from "@/utils/envConstants";
import * as sgMail from "@sendgrid/mail";
import admin from "firebase-admin";

export async function POST(request: Request) {
  // await initAdmin();
  // const adminAuth = admin.auth();

  sgMail.setApiKey(NEXT_PUBLIC_SENDGRID_API_KEY);

  const data = await request.json();

  if (!data) {
    return Response.json({
      success: false,
    });
  }

  const msg: any = {
    to: data.email,
    from: NEXT_PUBLIC_TRACECORK_EMAIL, // Use the email address or domain you verified above
    templateId: data.templateId,
    personalizations: [
      {
        to: [{ email: data.email }],
        dynamic_template_data: {
          user: data.email,
        },
      },
    ],
  };
  adminAuth
    .updateUser(data.uid, {
      email: data.email,
      disabled: true,
    })
    .then(async () => {
      await sgMail.send(msg);
    });

  return Response.json({
    success: true,
  });
}
