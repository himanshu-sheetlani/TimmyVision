import React from 'react'

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const Dash = () => {
  return (
     <div className="space-y-6 bg-[#0a0a0a] min-h-screen max-w-full p-6  text-white ">
          {/* 1) Upload & Quick Actions */}
          <Card className="bg-white/5 border border-white/10">
            <CardContent className="py-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="w-full md:w-2/3">
                  <label
                    htmlFor="file"
                    className="flex h-28 w-full items-center justify-center rounded-xl border border-dashed border-white/20 bg-white/5 hover:bg-white/10 transition cursor-pointer"
                  >
                    <span className="text-sm text-white/70">
                      Drag & drop image/video here or{" "}
                      <span className="underline">browse</span>
                    </span>
                  </label>
                  <input
                    id="file"
                    type="file"
                    className="hidden"
                    accept="image/*,video/*"
                  />
                </div>
                <div className="w-full md:w-1/3 flex flex-col gap-3"></div>
              </div>
            </CardContent>
          </Card>

          {/* 2) KPI Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Total Analyzed", value: "324" },
              { label: "Deepfakes Detected (7d)", value: "18" },
              { label: "Avg Confidence", value: "86%" },
              { label: "Queue", value: "3" },
            ].map((k, i) => (
              <Card
                key={i}
                className="bg-white/5 border border-white/10 hover:bg-white/10 transition"
              >
                <CardContent className="py-4">
                  <div className="text-sm text-white/60">{k.label}</div>
                  <div className="text-2xl font-semibold">{k.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 3) Processing Queue + 4) Recent Results */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Processing Queue */}
            <Card className="bg-white/5 border border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Processing Queue</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { id: "#8123", name: "video_001.mp4", p: 35 },
                  { id: "#8124", name: "image_441.png", p: 80 },
                  { id: "#8125", name: "video_777.mov", p: 12 },
                ].map((job) => (
                  <div key={job.id} className="rounded-lg bg-white/5 p-3">
                    <div className="flex items-center justify-between">
                      <div className="text-sm">{job.name}</div>
                      <Badge
                        variant="secondary"
                        className="text-xs bg-blue-600/20 text-blue-400 border-0"
                      >
                        processing
                      </Badge>
                    </div>
                    <Progress value={job.p} className="mt-2" />
                    <div className="mt-1 text-xs text-white/60">{job.p}%</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Results */}
            <Card className="lg:col-span-2 bg-white/5 border border-white/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Recent Results</CardTitle>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Search…"
                      className="h-8 w-48 bg-white/5 border-white/10 text-white placeholder:text-white/40"
                    />
                    <select className="h-8 rounded-md bg-white/5 border border-white/10 text-sm text-white">
                      <option>All</option>
                      <option>Image</option>
                      <option>Video</option>
                    </select>
                    <select className="h-8 rounded-md bg-white/5 border border-white/10 text-sm text-white">
                      <option>Status</option>
                      <option>Completed</option>
                      <option>Processing</option>
                      <option>Failed</option>
                    </select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      thumb: "/demo.jpeg",
                      name: "frame_0091.png",
                      type: "Image",
                      prediction: "Deepfake",
                      conf: 92,
                      status: "completed",
                    },
                    {
                      thumb: "/demo.jpeg",
                      name: "clip_12.mp4",
                      type: "Video",
                      prediction: "Authentic",
                      conf: 84,
                      status: "completed",
                    },
                    {
                      thumb: "/demo.jpeg",
                      name: "image_77.jpg",
                      type: "Image",
                      prediction: "AI-Generated",
                      conf: 76,
                      status: "completed",
                    },
                    {
                      thumb: "/demo.jpeg",
                      name: "clip_13.mp4",
                      type: "Video",
                      prediction: "Deepfake",
                      conf: 67,
                      status: "completed",
                    },
                  ].map((r, i) => (
                    <div
                      key={i}
                      className="rounded-xl overflow-hidden bg-white/5 hover:bg-white/10 transition"
                    >
                      <div className="h-36 w-full">
                        <img
                          src={r.thumb}
                          alt={r.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <div className="flex items-center justify-between">
                          <div className="text-sm">{r.name}</div>
                          <Badge
                            variant="outline"
                            className="text-xs border-white/20 text-white/70"
                          >
                            {r.type}
                          </Badge>
                        </div>
                        <div className="mt-1 flex items-center justify-between">
                          <div className="text-sm font-medium">
                            {r.prediction}
                          </div>
                          <div className="text-xs text-white/70">{r.conf}%</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
  )
}

export default Dash