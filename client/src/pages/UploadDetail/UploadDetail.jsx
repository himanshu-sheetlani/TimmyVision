import React from "react";
import { useParams } from "react-router-dom";
import { useFetchStore } from "@/store/useFetchStore";
import { toast } from "react-hot-toast";
import {
  Loader2,
  CheckCircle,
  FileImage,
  FileVideo,
  FileText,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const UploadDetail = () => {
  const { fetchOneUpload, singleUpload, loading } = useFetchStore();
  const { id } = useParams();

  React.useEffect(() => {
    if (id) {
      try {
        fetchOneUpload(id);
      } catch (error) {
        toast.error(error.message);
      }
    }
  }, [id, fetchOneUpload]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40 text-gray-300">
        <Loader2 className="animate-spin w-6 h-6 mr-2" /> Loading upload...
      </div>
    );
  }

  if (!singleUpload) {
    return (
      <div className="flex items-center justify-center h-40 text-gray-400">
        No upload found
      </div>
    );
  }

  const {
    fileType,
    fileUrl,
    textContent,
    prediction,
    confidence,
    createdAt,
    _id,
  } = singleUpload;

  const getIcon = () => {
    if (fileType === "image")
      return <FileImage className="w-5 h-5 text-blue-400" />;
    if (fileType === "video")
      return <FileVideo className="w-5 h-5 text-purple-400" />;
    if (fileType === "text")
      return <FileText className="w-5 h-5 text-green-400" />;
    return null;
  };

  // Chart Data for Prediction Confidence
  const chartData = [
    { name: "Confidence", value: confidence },
    { name: "Remaining", value: 100 - confidence },
  ];

  const COLORS = ["#22c55e", "#1e293b"]; // green + dark bg

  return (
    <div className="bg-black min-h-screen w-full flex items-center justify-center p-6">
      <Card className="bg-[#090909] border-zinc-800 text-white rounded-2xl shadow-xl w-full max-w-4xl">
        {/* Header */}
        <CardHeader className="flex items-center justify-between border-b border-gray-800 pb-3">
          <div className="flex items-center space-x-2">
            {getIcon()}
            <CardTitle className="text-lg font-semibold">
              {prediction || "Untitled Upload"}
            </CardTitle>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <span>Completed</span>
          </div>
        </CardHeader>

        {/* Body */}
        <CardContent className="p-6 space-y-6">
          {/* Metadata */}
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
            <div>
              <span className="block text-gray-500">Upload ID</span>
              <span className="break-all">{_id}</span>
            </div>
            <div>
              <span className="block text-gray-500">Created At</span>
              <span>{new Date(createdAt).toLocaleString()}</span>
            </div>
          </div>

          {/* Preview with Limit */}
          <div className="border border-gray-800 rounded-lg p-3 bg-gray-950 max-h-64 overflow-hidden flex items-center justify-center">
            {fileType === "image" && (
              <img
                src={fileUrl}
                alt="upload"
                className="rounded-lg max-h-60 object-contain"
              />
            )}
            {fileType === "video" && (
              <video
                src={fileUrl}
                controls
                className="rounded-lg max-h-60 w-full object-contain"
              />
            )}
            {fileType === "text" && (
              <p className="whitespace-pre-wrap text-gray-200 max-h-56 overflow-y-auto">
                {textContent}
              </p>
            )}
          </div>

          {/* Prediction & Confidence Visualization */}
          <div className="bg-gray-950 border border-gray-800 rounded-xl p-4">
            <h3 className="text-gray-300 font-semibold mb-3">
              Prediction Analysis
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Prediction Label */}
              <div className="space-y-2">
                <p>
                  <span className="text-gray-400">Prediction:</span>{" "}
                  <span className="font-semibold text-emerald-400">
                    {prediction}
                  </span>
                </p>
                <p>
                  <span className="text-gray-400">Confidence:</span>{" "}
                  <span className="font-semibold">{confidence}%</span>
                </p>
              </div>

              {/* Confidence Chart */}
              <div className="w-full h-40">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#111",
                        border: "1px solid #333",
                        borderRadius: "8px",
                        color: "#fff",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadDetail;
