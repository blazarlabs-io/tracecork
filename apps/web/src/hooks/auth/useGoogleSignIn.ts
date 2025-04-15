import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { useState } from "react";
import { sendEmailService } from "@/services/email-services";
import { emailTemplates } from "@/utils/email-templates";

export const useGoogleSignIn = () => {
  // * STATE
  const [isGoogleLogin, setIsGoogleLogin] = useState<boolean>(false);
  const [isGoogleLoginSuccess, setIsGoogleLoginSuccess] =
    useState<boolean>(false);

  // * GOOGLE PROVIDER
  const provider = new GoogleAuthProvider();
  // Avoids doing  signIn with the current account by giving the user the option to select another account
  provider.setCustomParameters({ prompt: "select_account" });

  // * HANDLERS
  function isUserNew(createdAt: string): boolean {
    // Determines if a user is new by checking if the user was created after a certain threshold based on the NEW_USER_GRACE_PERIOD
    const NEW_USER_GRACE_PERIOD = 6 * 1000; // 6 seconds threshold
    const now = new Date().getTime();
    const created = new Date(createdAt).getTime();
    return created > now - NEW_USER_GRACE_PERIOD;
  }

  const handleSignInWithGoogle = async () => {
    setIsGoogleLoginSuccess(false);
    try {
      // Sets the popup state of the google modal to open (true) and try to get the user's data after the login
      setIsGoogleLogin(true);
      const { user } = await signInWithPopup(auth, provider);
      if (!user) return;
      const {
        email,
        displayName,
        metadata: { creationTime },
      } = user;
      console.log(email, displayName, creationTime);
      // If user has been logged successfully using Google for the first time then send a welcome email
      if (!user || !email || !displayName || !creationTime) return;
      setIsGoogleLoginSuccess(true);
      if (!isUserNew(creationTime)) return;
      await sendEmailService({
        toEmail: email,
        templateId: emailTemplates["welcome-email"],
        dynamicTemplateData: {
          user: displayName,
        },
      });
    } catch (error: any) {
      console.error(error);
      setIsGoogleLoginSuccess(false);
      setIsGoogleLogin(false);
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // const email = error.customData.email;
      // const credential = GoogleAuthProvider.credentialFromError(error);
      // console.log(errorCode, errorMessage, email, credential);
    } finally {
      setIsGoogleLogin(false);
    }
  };

  return { isGoogleLogin, isGoogleLoginSuccess, handleSignInWithGoogle };
};
