import { auth } from "@/lib/auth";
import { uploadVideoToS3, queueVideoForProcessing } from "@/service/uploadService";

export async function createQuizFromUploadedVideo(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("User not logged in");
  }

  try {
    const videoFile = formData.get("video") as File;
    if (!videoFile || !(videoFile instanceof File)) {
      throw new Error("No video file uploaded");
    }

    const videoUrl = await uploadVideoToS3(videoFile);
    await queueVideoForProcessing(session.user.id, videoUrl, videoFile.name);

    return { success: true };
  } catch (error: any) {
    console.error("Error during video upload and processing:", error);
    return { success: false, error: error.message || "Failed to process video" };
  }
}
