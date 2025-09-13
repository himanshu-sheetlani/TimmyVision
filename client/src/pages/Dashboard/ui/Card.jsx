import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  FileImage,
  FileText,
  Video,
  Loader2,
  CheckCircle2,
  XCircle,
} from "lucide-react";

function toPercentage(value, decimals = 2) {
  if (typeof value !== "number") return null;
  return (value * 100).toFixed(decimals) + "%";
}

const UploadCard = ({ upload }) => {
  // Pick icon based on fileType
  const fileIcons = {
    image: <FileImage className="text-blue-400" size={22} />,
    video: <Video className="text-purple-400" size={22} />,
    text: <FileText className="text-green-400" size={22} />,
  };

  // Status badge
  const statusColors = {
    processing: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    completed: "bg-green-500/20 text-green-400 border-green-500/30",
    failed: "bg-red-500/20 text-red-400 border-red-500/30",
  };

  return (
    <Link to={`/upload/${upload._id}`}>
      <Card className="bg-[#121212] border border-zinc-800 shadow-lg hover:shadow-blue-500/10 transition-all rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center gap-3">
            {fileIcons[upload.fileType]}
            <div>
              <CardTitle className="text-white text-base">
                Upload Result
              </CardTitle>
              <CardDescription className="text-zinc-400 text-xs">
                {new Date(upload.createdAt).toLocaleString()}
              </CardDescription>
            </div>
          </div>
          <Badge
            className={`${statusColors[upload.status]} px-2 py-1 rounded-md`}
          >
            {upload.status}
          </Badge>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Prediction */}
          <div>
            <p className="text-sm text-zinc-400">Prediction</p>
            <p className="text-lg font-semibold text-white flex items-center gap-2">
              {upload.prediction}
              {upload.status === "processing" && (
                <Loader2 className="animate-spin text-yellow-400" size={16} />
              )}
              {upload.status === "completed" && (
                <CheckCircle2 className="text-green-400" size={16} />
              )}
              {upload.status === "failed" && (
                <XCircle className="text-red-400" size={16} />
              )}
            </p>
          </div>

          {/* Confidence */}
          {upload.confidence !== null && (
            <div>
              <div className="flex justify-between text-sm text-zinc-400">
                <span>Confidence</span>
                <span>{toPercentage(upload?.confidence)}</span>
              </div>
              <Progress
                value={toPercentage(upload?.confidence)}
                className="h-2 bg-zinc-200 mt-2"
              />
            </div>
          )}

          {/* Text Content (if available) */}
          {upload.textContent && (
            <div className="p-3 bg-zinc-900 rounded-lg border border-zinc-800 text-sm text-zinc-300 line-clamp-3">
              {upload.textContent}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default UploadCard;
