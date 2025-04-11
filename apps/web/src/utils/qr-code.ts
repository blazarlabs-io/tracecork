export const base64ToFile = (base64String: any, fileName: string) => {
  // Split the base64 string to get the data
  const arr = base64String.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  // Create a File object
  return new File([u8arr], fileName, { type: mime });
};

export const getQrCodeImageData = (id: string) => {
  const canvas: any = document.getElementById(id);
  if (canvas) {
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    return pngUrl;
  }
};
