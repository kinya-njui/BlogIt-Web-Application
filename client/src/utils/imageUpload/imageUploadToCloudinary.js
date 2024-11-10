import { uploadPreset, cloudName } from "../secretDetails.js";

const imageUploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    console.log("Cloudinary response", response);
    if (!response.ok) {
      console.error("Failed to upload image to Cloudinary");
      return null;
    }

    const data = await response.json();
    console.log("Cloudinary response data", data.secure_url); // Corrected access to `secure_url`
    return data.secure_url; // Corrected return value
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};

export default imageUploadToCloudinary;
