"use client";

import React, { useState } from "react";
import FileUploadArea from "../components/FileUploadArea";
import AlertBanner from "../components/AlertBanner";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [zip1, setZip1] = useState<File | null>(null);
  const [zip2, setZip2] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCompare = async () => {
    if (!zip1 || !zip2) {
      setError("Please upload both ZIP files.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("zip1", zip1);
      formData.append("zip2", zip2);
      const res = await fetch("/api/compare", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to compare ZIP files.");
      }
      const data = await res.json();
      // Store diff result in localStorage for /compare page
      localStorage.setItem("zipDiffResult", JSON.stringify(data.diff));
      router.push("/compare");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="w-full max-w-2xl p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md mt-12">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">ZIP Diff Checker</h1>
        {error && <AlertBanner message={error} onClose={() => setError(null)} />}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <FileUploadArea label="ZIP File 1" onFileSelect={setZip1} file={zip1} />
          <FileUploadArea label="ZIP File 2" onFileSelect={setZip2} file={zip2} />
        </div>
        <button
          className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition-colors disabled:opacity-50"
          onClick={handleCompare}
          disabled={!zip1 || !zip2 || loading}
        >
          {loading ? "Comparing..." : "Compare"}
        </button>
      </div>
      <footer className="mt-10 text-gray-400 text-sm">MIT Licensed. Built with Next.js & Tailwind CSS.</footer>
    </main>
  );
}
