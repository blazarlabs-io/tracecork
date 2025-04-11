export const base64ToImageFile = (base64: string, fileName: string): File => {
  // Split the base64 string to get the mime type and the actual data
  const [mimeInfo, data] = base64.split(",");
  const mimeType = mimeInfo?.match(/:(.*?);/)?.[1] || "image/png";

  // Decode base64 data to binary
  const binary = atob(data || "");
  const array = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    array[i] = binary.charCodeAt(i);
  }

  // Create a blob from the binary data
  const blob = new Blob([array], { type: mimeType });

  // Convert Blob to File
  return new File([blob], fileName, { type: mimeType });
};
