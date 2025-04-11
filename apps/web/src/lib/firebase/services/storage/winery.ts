import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../../client";

export const winery: any = {
  upload: async (
    file: File,
    path: string,
    onProgress: (progress: number) => void,
    onError: (error: any) => void,
    onSuccess: (url: string) => void,
  ) => {
    try {
      const storageRef = ref(storage, path + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              onError(error);
              break;
            case "storage/canceled":
              // User canceled the upload
              onError(error);
              break;
            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              onError(error);
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            onSuccess(downloadURL);
          });
        },
      );
    } catch (error) {
      console.log("ERROR", error);
    }
  },
};
