import { Wine } from "~/src/types/db";

export const storage: any = {
  uploadFile: async (file: File, wine: Wine) => {
    try {
      const imageFile = await getImageFileFromUrl(
        wine.generalInfo.image,
        `${wine.generalInfo.collectionName.replace(" ", "-").toLocaleLowerCase()}-cover.jpg`,
      );

      // TODO: In order to make pinata work, use the code in the comment bellow <await uploadFile(imageFile as File)>
      const imgUploadRes = await uploadFile(imageFile as File); // "xxx/ipfs/0195b9b2-3fb3-74e0-ace6-53807d2c7014"; //

      // console.log("\n====================================\n");
      const splittedUrl = imgUploadRes?.split("/ipfs/");
      const imgIpfs = `ipfs://${splittedUrl?.[1]}`;
      // console.log("imageFile", imageFile);
      // console.log("imgUploadRes", imgUploadRes);
      // console.log("splittedUrl", splittedUrl);
      // console.log("imgIpfs", imgIpfs);
      // console.log("\n====================================\n");
      return imgIpfs;
    } catch (error) {
      console.log(error as any);
      return null;
    }
  },
};

const uploadFile = async (imgFile: File) => {
  try {
    if (!imgFile) {
      alert("No file selected");
      return;
    }

    //   setUploading(true);
    const data = new FormData();
    data.set("file", imgFile);
    const uploadRequest = await fetch("/api/files", {
      method: "POST",
      body: data,
    });
    const signedUrl = await uploadRequest.json();
    //   setUrl(signedUrl);
    //   setUploading(false);
    return signedUrl;
  } catch (e) {
    console.log(e);
    //   setUploading(false);
    alert("Trouble uploading file");
    return null;
  }
};

const getImageFileFromUrl = async (imageUrl: string, fileName: string) => {
  try {
    // Fetch the image from the URL
    const response = await fetch(imageUrl);

    // Check if the response is OK
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    // Get the image as a Blob
    const blob = await response.blob();

    // Create a File object from the Blob
    const file = new File([blob], fileName, { type: blob.type });

    return file;
  } catch (error) {
    console.error("Error fetching or converting image:", error);
    return null;
  }
};
