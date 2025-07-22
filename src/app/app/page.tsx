"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";
import {
    SparklesIcon,
    DocumentMagnifyingGlassIcon,
    ArrowPathIcon,
    InformationCircleIcon
} from "@heroicons/react/24/outline";
import FileUploadZone from "@/components/modern/FileUploadZone";
import ComparisonResults from "@/components/modern/ComparisonResults";
import LoadingSpinner from "@/components/modern/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { extractZipEntries, compareZipEntries, DiffResult } from "@/services/zipDiff";

export default function HomePage() {
    const [zip1, setZip1] = useState<File | null>(null);
    const [zip2, setZip2] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<DiffResult | null>(null);
    const [progress, setProgress] = useState(0);

    const handleCompare = async () => {
        if (!zip1 || !zip2) {
            toast.error("Please upload both ZIP files.");
            return;
        }

        setLoading(true);
        setProgress(0);
        setResult(null);

        try {
            setProgress(20);
            toast.loading("Extracting ZIP files...", { id: "compare" });

            const [entries1, entries2] = await Promise.all([
                extractZipEntries(await zip1.arrayBuffer()),
                extractZipEntries(await zip2.arrayBuffer())
            ]);

            setProgress(60);
            toast.loading("Comparing files...", { id: "compare" });

            const diffResult = compareZipEntries(entries1, entries2);

            setProgress(100);
            setResult(diffResult);

            toast.success(
                `Comparison complete! Found ${diffResult.stats.addedCount} added, ${diffResult.stats.removedCount} removed, and ${diffResult.stats.modifiedCount} modified files.`,
                { id: "compare", duration: 4000 }
            );
        } catch (error: unknown) {
            const errorMessage =
                typeof error === "object" && error !== null && "message" in error
                    ? String((error as { message?: unknown }).message)
                    : "Failed to compare ZIP files.";
            toast.error(errorMessage, { id: "compare" });
        } finally {
            setLoading(false);
            setProgress(0);
        }
    };

    const handleReset = () => {
        setZip1(null);
        setZip2(null);
        setResult(null);
        setProgress(0);
    };
    console.log(result);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            <Toaster
                position="top-right"
                toastOptions={{
                    className: "dark:bg-slate-800 dark:text-slate-100",
                }}
            />

            <div className=" mx-auto px-4 py-8 ">
                {/* Header */}

                <div className={"container"}>


                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12 "
                    >
                        <div className="flex items-center justify-center mb-4">
                            <motion.div
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                            >
                                <SparklesIcon className="w-12 h-12 text-blue-600 dark:text-blue-400 mr-3" />
                            </motion.div>
                            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                                Diff Check
                            </h1>
                        </div>
                        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                            Compare ZIP files with precision. Identify added, removed, and modified files with beautiful visual diffs.
                        </p>
                    </motion.div>
                    </div>

                <AnimatePresence mode="wait">
                    {!result ? (
                        <motion.div
                            key="upload"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="max-w-4xl mx-auto"
                        >
                            <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-800/80 border-0 shadow-2xl">
                                <CardHeader className="text-center pb-6">
                                    <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                                        <DocumentMagnifyingGlassIcon className="w-6 h-6 text-blue-600" />
                                        Upload ZIP Files
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {loading ? (
                                        <LoadingSpinner
                                            message="Comparing ZIP files..."
                                            progress={progress}
                                        />
                                    ) : (
                                        <>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <FileUploadZone
                                                    label="First ZIP File"
                                                    onFileSelect={setZip1}
                                                    file={zip1}
                                                    disabled={loading}
                                                />
                                                <FileUploadZone
                                                    label="Second ZIP File"
                                                    onFileSelect={setZip2}
                                                    file={zip2}
                                                    disabled={loading}
                                                />
                                            </div>

                                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                                <Button
                                                    onClick={handleCompare}
                                                    disabled={!zip1 || !zip2 || loading}
                                                    size="lg"
                                                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                                                >
                                                    <DocumentMagnifyingGlassIcon className="w-5 h-5 mr-2" />
                                                    Compare Files
                                                </Button>

                                                {(zip1 || zip2) && (
                                                    <Button
                                                        onClick={handleReset}
                                                        variant="outline"
                                                        size="lg"
                                                        className="border-slate-300 dark:border-slate-600"
                                                    >
                                                        <ArrowPathIcon className="w-5 h-5 mr-2" />
                                                        Reset
                                                    </Button>
                                                )}
                                            </div>

                                            <div className="bg-blue-50 dark:bg-blue-950/50 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                                                <div className="flex items-start gap-3">
                                                    <InformationCircleIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                                                    <div className="text-sm text-blue-800 dark:text-blue-200">
                                                        <p className="font-medium mb-1">Supported Features:</p>
                                                        <ul className="list-disc list-inside space-y-1 text-blue-700 dark:text-blue-300">
                                                            <li>Text file diff visualization (.js, .ts, .json, .md, .txt, etc.)</li>
                                                            <li>Binary file comparison by size</li>
                                                            <li>Directory structure analysis</li>
                                                            <li>Export results as JSON</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </CardContent>
                            </Card>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                                    Comparison Results
                                </h2>
                                <Button
                                    onClick={handleReset}
                                    variant="outline"
                                    className="flex items-center gap-2"
                                >
                                    <ArrowPathIcon className="w-4 h-4" />
                                    New Comparison
                                </Button>
                            </div>

                            <ComparisonResults result={result} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}