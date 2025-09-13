import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/utils/axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import Loader from "@/comman/Loader";

const UploadDetails = () => {
  const { id } = useParams();
  const [upload, setUpload] = useState(null);

  useEffect(() => {
    const fetchUpload = async () => {
      try {
        const res = await axiosInstance.get(`/fetch/upload/${id}`);
        setUpload(res.data.upload);
      } catch (err) {
        console.error("Failed to fetch upload:", err);
      }
    };
    fetchUpload();
  }, [id]);

  if (!upload)
    return (
      <div className="bg-black h-screen w-screen">
        <Loader />
      </div>
    );

  return (
    <div className="bg-[#090909] min-h-screen p-8 text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Upload Details</h1>
        <Badge
          className={
            upload.status === "completed"
              ? "bg-green-600"
              : upload.status === "failed"
              ? "bg-red-600"
              : "bg-yellow-600"
          }
        >
          {upload.status}
        </Badge>
      </div>

      {/* Preview */}
      <Card className="mb-8 bg-zinc-950 border border-zinc-800">
        <CardHeader>
          <CardTitle className="text-lg">Preview</CardTitle>
        </CardHeader>
        <CardContent>
          {upload.fileType === "image" && (
            <img
              src={upload.fileUrl}
              alt="Upload Preview"
              className="rounded-lg max-h-96 object-contain mx-auto"
            />
          )}
          {upload.fileType === "video" && (
            <video
              controls
              src={upload.fileUrl}
              className="rounded-lg max-h-96 w-full"
            />
          )}
          {upload.fileType === "text" && (
            <pre className="bg-black/40 p-4 rounded-lg text-sm overflow-auto max-h-96">
              {upload.textContent}
            </pre>
          )}
        </CardContent>
      </Card>

      {/* Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-zinc-950 border border-zinc-800">
          <CardHeader>
            <CardTitle>General Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              <span className="text-gray-400">File Type:</span> {upload.fileType}
            </p>
            <p>
              <span className="text-gray-400">User:</span> {upload.userId}
            </p>
            <p>
              <span className="text-gray-400">Created:</span>{" "}
              {new Date(upload.createdAt).toLocaleString()}
            </p>
            <p>
              <span className="text-gray-400">Updated:</span>{" "}
              {new Date(upload.updatedAt).toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-950 border border-zinc-800">
          <CardHeader>
            <CardTitle>Prediction</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p>
              <span className="text-gray-400">Prediction:</span>{" "}
              {upload.prediction}
            </p>
            <p>
              <span className="text-gray-400">Confidence:</span>
            </p>
            {upload.confidence !== null ? (
              <Progress value={upload.confidence} className="h-2" />
            ) : (
              <span className="text-gray-500">N/A</span>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Accordion for Related Info */}
      <div className="mt-8">
        <Card className="bg-zinc-950 border border-zinc-800">
          <CardHeader>
            <CardTitle>Related Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="resources">
                <AccordionTrigger>Related Resources</AccordionTrigger>
                <AccordionContent className="text-sm text-gray-300 space-y-2">
                  <p>
                    📄 <a href="https://example.com/doc1" target="_blank" className="text-blue-400 underline">Reference Document</a>
                  </p>
                  <p>
                    🌐 <a href="https://example.com/article" target="_blank" className="text-blue-400 underline">Read More</a>
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="analysis">
                <AccordionTrigger>Extra Analysis</AccordionTrigger>
                <AccordionContent className="text-sm text-gray-300">
                  <p>{upload.extraNotes || "No additional analysis available."}</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex gap-4 mt-8">
        <Button className="bg-blue-600">Download</Button>
        <Button variant="destructive">Delete</Button>
        <Button className="bg-zinc-800">Re-analyze</Button>
      </div>
    </div>
  );
};

export default UploadDetails;
