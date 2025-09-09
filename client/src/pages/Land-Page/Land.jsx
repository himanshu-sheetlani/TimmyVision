import React from "react";
import Navbar from "./components/Navbar";

const Land = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-indigo-950 text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center min-h-screen px-6">
        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight">
          Detect <span className="text-indigo-500">Deepfakes</span> <br />
          and Stop <span className="text-pink-500">Misinformation</span>
        </h2>
        <p className="mt-6 text-lg md:text-xl max-w-2xl text-gray-300">
          TimmyVision helps you analyze images and videos using AI-powered
          models. Upload your file and let our system reveal the truth.
        </p>
        <div className="mt-8 flex gap-4">
          <a
            href="/signup"
            className="px-6 py-3 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition"
          >
            Get Started
          </a>
          <a
            href="#how-it-works"
            className="px-6 py-3 rounded-full border border-gray-400 text-gray-200 hover:bg-white/10 transition"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-20 px-6 max-w-6xl mx-auto">
        <h3 className="text-3xl font-bold text-center mb-12">
          How It <span className="text-indigo-500">Works</span>
        </h3>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="p-6 bg-white/5 rounded-2xl shadow-lg hover:bg-white/10 transition">
            <h4 className="text-xl font-semibold mb-3">1. Upload</h4>
            <p className="text-gray-300">
              Choose an image or video you want to verify. Our system supports
              multiple formats.
            </p>
          </div>
          <div className="p-6 bg-white/5 rounded-2xl shadow-lg hover:bg-white/10 transition">
            <h4 className="text-xl font-semibold mb-3">2. Analyze</h4>
            <p className="text-gray-300">
              Our AI models process the file and run deepfake & misinformation
              detection checks.
            </p>
          </div>
          <div className="p-6 bg-white/5 rounded-2xl shadow-lg hover:bg-white/10 transition">
            <h4 className="text-xl font-semibold mb-3">3. Results</h4>
            <p className="text-gray-300">
              Get confidence scores and insights so you know whether to trust
              the content.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Land;
