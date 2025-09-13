import React, { useState } from "react";
import { useUploadStore } from "@/store/useUploadStore";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { UploadCloud, FileText, ImageIcon, Video, X } from "lucide-react";
import AnalysisDistributionPie from "../ui/AnalysisDistributionPie";
import DetectionResultsPie from "../ui/DetectionResultsPie";
import { UploadTrendBarChart } from "../ui/UploadTrendBarChart";

const Dash_Tab = () => {
  const {
    uploadImage,
    uploadVideo,
    uploadText,
    imageUploading,
    videoUploading,
    textUploading,
  } = useUploadStore();

  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [textContent, setTextContent] = useState("");

  const handleImageUpload = () => {
    if (!imageFile) return;
    uploadImage(imageFile);
    setImageFile(null);
  };

  const handleVideoUpload = () => {
    if (!videoFile) return;
    uploadVideo(videoFile);
    setVideoFile(null);
  };

  const handleTextUpload = () => {
    if (!textContent.trim()) return;
    uploadText(textContent);
    setTextContent("");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {/* Image Upload */}
      <Card className="bg-[#090909] border border-zinc-800 shadow-xl rounded-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-zinc-100">
            <ImageIcon className="w-5 h-5 text-blue-400" />
            Upload Image
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {imageFile ? (
            <div className="relative">
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Preview"
                className="w-full h-40 object-cover rounded-lg"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-6 w-6"
                onClick={() => setImageFile(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4
                         file:rounded-sm file:border-0 file:text-sm file:font-semibold
                         file:bg-blue-600/20 file:text-white hover:file:bg-white "
            />
          )}
          <Button
            onClick={handleImageUpload}
            disabled={imageUploading || !imageFile}
            className="w-full"
          >
            {imageUploading ? "Uploading..." : "Upload Image"}
          </Button>
        </CardContent>
      </Card>

      {/* Video Upload */}
      <Card className="bg-[#090909] border border-zinc-800 shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-zinc-100">
            <Video className="w-5 h-5 text-purple-400" />
            Upload Video
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {videoFile ? (
            <div className="relative">
              <video
                src={URL.createObjectURL(videoFile)}
                controls
                className="w-full h-40 object-cover rounded-lg"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-6 w-6"
                onClick={() => setVideoFile(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideoFile(e.target.files[0])}
              className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4
                         file:rounded-sm file:border-0 file:text-sm file:font-semibold
                         file:bg-purple-600/20 file:text-white hover:file:bg-purple-700"
            />
          )}
          <Button
            onClick={handleVideoUpload}
            disabled={videoUploading || !videoFile}
            className="w-full"
          >
            {videoUploading ? "Uploading..." : "Upload Video"}
          </Button>
        </CardContent>
      </Card>

      {/* Text Upload */}
      <Card className="bg-[#090909] border border-zinc-800 shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-zinc-100">
            <FileText className="w-5 h-5 text-green-400" />
            Upload Text
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <textarea
            value={textContent}
            onChange={(e) => setTextContent(e.target.value)}
            placeholder="Enter your text here..."
            className="w-full rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-100 p-3 resize-none focus:ring-2 focus:ring-green-500"
            rows={4}
          />
          <Button
            onClick={handleTextUpload}
            disabled={textUploading || !textContent.trim()}
            className="w-full"
          >
            {textUploading ? "Uploading..." : "Upload Text"}
          </Button>
        </CardContent>
      </Card>

      {/* New Row */}
      <Card className="bg-[#090909] border border-zinc-800 shadow-xl rounded-2xl col-span-1 flex flex-col">
        <CardHeader>
          <CardTitle className="text-white">📈 Upload Trends</CardTitle>
          <CardDescription className="text-gray-400">
            Last 7 days of activity
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <UploadTrendBarChart />
        </CardContent>
      </Card>

      <Card className="bg-[#090909] border border-zinc-800 shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2 text-zinc-100">
            <DetectionResultsPie />
          </CardTitle>
        </CardHeader>
      </Card>

      <Card className="bg-[#090909] border border-zinc-800 shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2 text-zinc-100 ">
            <AnalysisDistributionPie />
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
};

export default Dash_Tab;
