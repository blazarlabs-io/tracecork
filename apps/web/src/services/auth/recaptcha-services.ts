export const sendRecaptchaService = async (token: string) => {
  try {
    await fetch("/api/recaptcha", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
  } catch (error) {
    throw error;
  }
};
