import React from "react";
import { useFetchStore } from "@/store/useFetchStore";
import UploadCard from "../ui/Card"; // the modern card I gave earlier
import Loader from "@/comman/Loader";

const Analysis = () => {
  const {
    fetchImage,
    fetchVideo,
    fetchText,
    imageUploads,
    videoUploads,
    textUploads,
    imageLoading,
    videoLoading,
    textLoading,
  } = useFetchStore();

  React.useEffect(() => {
    fetchImage();
    fetchVideo();
    fetchText();
  }, [fetchImage, fetchVideo, fetchText]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6  h-[calc(100vh-80px)]">
      {/* Video Section */}
      <div className="bg-[#121212] border border-zinc-800 rounded-xl p-4 flex flex-col max-h-[85vh]">
        <h2 className="text-lg font-semibold text-white mb-4">Video Uploads</h2>
        <div className="overflow-y-auto flex-1 space-y-4 pr-2 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900">
          {videoLoading ? (
            <Loader />
          ) : videoUploads.length > 0 ? (
            videoUploads.map((upload) => (
              <UploadCard key={upload._id} upload={upload} />
            ))
          ) : (
            <p className="text-zinc-500 text-sm">No video uploads yet.</p>
          )}
        </div>
      </div>

      {/* Image Section */}
      <div className="bg-[#121212] border border-zinc-800 rounded-xl p-4 flex flex-col max-h-[85vh]">
        <h2 className="text-lg font-semibold text-white mb-4">Image Uploads</h2>
        <div className="overflow-y-auto flex-1 space-y-4 pr-2 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900">
          {imageLoading ? (
            <Loader />
          ) : imageUploads.length > 0 ? (
            imageUploads.map((upload) => (
              <UploadCard key={upload._id} upload={upload} />
            ))
          ) : (
            <p className="text-zinc-500 text-sm">No image uploads yet.</p>
          )}
        </div>
      </div>

      {/* Text Section */}
      <div className="bg-[#121212] border border-zinc-800 rounded-xl p-4 flex flex-col max-h-[85vh]">
        <h2 className="text-lg font-semibold text-white mb-4">Text Uploads</h2>
        <div className="overflow-y-auto flex-1 space-y-4 pr-2 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900">
          {textLoading ? (
            <Loader />
          ) : textUploads.length > 0 ? (
            textUploads.map((upload) => (
              <UploadCard key={upload._id} upload={upload} />
            ))
          ) : (
            <p className="text-zinc-500 text-sm">No text uploads yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analysis;
