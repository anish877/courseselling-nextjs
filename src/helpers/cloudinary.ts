import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from "cloudinary";
import { exec } from "child_process";

// Ensure environment variables are properly typed
if (
  !process.env.CLOUDINARY_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET
) {
  throw new Error("Cloudinary config values are missing.");
}

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Define type for local file paths
type FilePath = string;

// Define types for the functions
type UploadResponse = UploadApiResponse | null;
type UploadError = UploadApiErrorResponse | Error;

// Utility to delete file using system commands
const deleteFileUsingCommand = (filePath: FilePath): void => {
  const command =
    process.platform === "win32" ? `del /f "${filePath}"` : `rm -f "${filePath}"`;
  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error deleting file with command:`, stderr);
    } else {
      console.log("File deleted successfully with command.");
    }
  });
};

// Upload a file to Cloudinary
const uploadOnCloudinary = async (
  localFilePath: FilePath
): Promise<UploadResponse> => {
  console.log("The cloudinary file.....");
  if (!localFilePath) return null;

  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log(`File uploaded on cloudinary successfully: ${response.url}`);
    deleteFileUsingCommand(localFilePath); // Delete after successful upload
    return response;
  } catch (error) {
    deleteFileUsingCommand(localFilePath); // Attempt to delete on upload failure as well
    console.log(`Error in file upload :: cloudinary :: ${(error as UploadError).message}`);
    return null;
  }
};

// Delete an image from Cloudinary by URL
const deleteFromcloudinary = async (url: string): Promise<void> => {
  if (!url) return;
  try {
    const first = url.slice(url.indexOf("upload") + 7);
    const second = first.slice(first.indexOf("/") + 1, first.lastIndexOf("."));
    await cloudinary.uploader.destroy(second, {
      resource_type: "image",
    });
  } catch (error) {
    console.log(
      `An error occurred in removing previous file(s): ${(error as Error).message}`
    );
  }
};

// Delete a video from Cloudinary by URL
const deleteVideoFromcloudinary = async (url: string): Promise<void> => {
  if (!url) return;
  try {
    const first = url.slice(url.indexOf("upload") + 7);
    const second = first.slice(first.indexOf("/") + 1, first.lastIndexOf("."));
    await cloudinary.uploader.destroy(second, {
      resource_type: "video",
    });
  } catch (error) {
    console.log(
      `An error occurred in removing previous file(s): ${(error as Error).message}`
    );
  }
};

export { uploadOnCloudinary, deleteFromcloudinary, deleteVideoFromcloudinary };
