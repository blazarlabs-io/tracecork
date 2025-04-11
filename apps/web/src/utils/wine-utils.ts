import isEmpty from "lodash.isempty";

export const generateWineId = (length: number = 16) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let key = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    key += characters[randomIndex];
  }

  return key;
};

const isWineReadyToPublish = async (form: any) => {
  // * make sure there are no errors in form
  // * If no errors
  if (isEmpty(form.formState.errors)) {
    return true;
  } else {
    return false;
  }
};
