"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import FileUploadZone from "@/components/modern/FileUploadZone";
import LoadingSpinner from "@/components/modern/LoadingSpinner";
import FileTreeSidebar from "@/components/diff/FileTreeSidebar";
import DiffSplitViewer from "@/components/diff/DiffSplitViewer";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { useApp } from "@/context/AppContext";
import { setUploadedFile, processZipFiles, reset as resetZip } from "@/store/zipSlice";
import { generateDiff, reset as resetDiff } from "@/store/diffSlice";
import { Button } from "@/components/ui/button";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

export default function HomePage() {
    const dispatch = useAppDispatch();
    const { addToast } = useApp();
    
    const { files, uploadedFiles, loading: zipLoading, progress, error: zipError } = useAppSelector(
        (state) => state.zip
    );
    const { result, loading: diffLoading, error: diffError } = useAppSelector(
        (state) => state.diff
    );

    // Auto-generate diff when both ZIP files are processed
    useEffect(() => {
        if (files.zip1 && files.zip2 && !result) {
            dispatch(generateDiff({ zip1: files.zip1, zip2: files.zip2 }));
        }
    }, [files.zip1, files.zip2, result, dispatch]);

    // Handle errors
    useEffect(() => {
        if (zipError) {
            addToast({ type: 'error', message: zipError });
        }
        if (diffError) {
            addToast({ type: 'error', message: diffError });
        }
    }, [zipError, diffError, addToast]);

    const handleCompare = async () => {
        if (!uploadedFiles.zip1 || !uploadedFiles.zip2) {
            addToast({ type: 'error', message: 'Please upload both ZIP files.' });
            return;
        }

        try {
            addToast({ type: 'info', message: 'Processing ZIP files...' });
            await dispatch(
                processZipFiles({ 
                    zip1: uploadedFiles.zip1, 
                    zip2: uploadedFiles.zip2 
                })
            ).unwrap();
            
            addToast({ 
                type: 'success', 
                message: 'ZIP files processed successfully!' 
            });
        } catch (error) {
            addToast({ 
                type: 'error', 
                message: error instanceof Error ? error.message : 'Failed to process ZIP files' 
            });
        }
    };

    const handleFileSelect = (key: 'zip1' | 'zip2') => (file: File | null) => {
        dispatch(setUploadedFile({ key, file }));
    };

    const handleReset = () => {
        dispatch(resetZip());
        dispatch(resetDiff());
        addToast({ type: 'info', message: 'Reset complete' });
    };

    const isLoading = zipLoading || diffLoading;
    const canCompare = uploadedFiles.zip1 && uploadedFiles.zip2 && !isLoading;
    const hasResult = result && files.zip1 && files.zip2;

    if (hasResult) {
        return (
            <div className="h-screen flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 bg-white dark:bg-blue-900 border-b border-indigo-200 dark:border-blue-700">
                    <div className="flex items-center space-x-4">
                        <h1 className="text-xl font-bold text-indigo-900 dark:text-blue-100">
                            ZIP Comparison Results
                        </h1>
                        <div className="flex items-center space-x-2 text-sm text-indigo-600 dark:text-blue-300">
                            <span>{uploadedFiles.zip1?.name}</span>
                            <span>vs</span>
                            <span>{uploadedFiles.zip2?.name}</span>
                        </div>
                    </div>
                    <Button
                        onClick={handleReset}
                        variant="outline"
                        className="flex items-center gap-2"
                    >
                        <ArrowPathIcon className="w-4 h-4" />
                        New Comparison
                    </Button>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex overflow-hidden">
                    <FileTreeSidebar />
                    <DiffSplitViewer />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            <div className="container mx-auto px-4 py-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                        Compare ZIP Files
                    </h1>
                    <p className="text-lg text-indigo-600 dark:text-blue-300 max-w-2xl mx-auto">
                        Upload two ZIP files to see a detailed comparison with visual diffs, file trees, and change summaries.
                    </p>
                </motion.div>

                {/* Upload Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-600 p-8">
                        {isLoading ? (
                            <LoadingSpinner
                                message={zipLoading ? "Processing ZIP files..." : "Generating diff..."}
                                progress={progress}
                            />
                        ) : (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                    <FileUploadZone
                                        label="First ZIP File"
                                        onFileSelect={handleFileSelect('zip1')}
                                        file={uploadedFiles.zip1}
                                        disabled={isLoading}
                                    />
                                    <FileUploadZone
                                        label="Second ZIP File"
                                        onFileSelect={handleFileSelect('zip2')}
                                        file={uploadedFiles.zip2}
                                        disabled={isLoading}
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button
                                        onClick={handleCompare}
                                        disabled={!canCompare}
                                        size="lg"
                                        className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                                    >
                                        Compare Files
                                    </Button>

                                    {(uploadedFiles.zip1 || uploadedFiles.zip2) && (
                                        <Button
                                            onClick={handleReset}
                                            variant="outline"
                                            size="lg"
                                            className="border-gray-300 dark:border-slate-600"
                                        >
                                            <ArrowPathIcon className="w-5 h-5 mr-2" />
                                            Reset
                                        </Button>
                                    )}
                                </div>

                                <div className="mt-8 bg-blue-50 dark:bg-blue-950/50 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                                    <h3 className="font-semibold text-indigo-900 dark:text-blue-100 mb-3">
                                        Supported Features:
                                    </h3>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-slate-700 dark:text-slate-300">
                                        <li className="flex items-center">
                                            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3" />
                                            Text file diff visualization
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3" />
                                            Binary file comparison
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3" />
                                            Directory structure analysis
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3" />
                                            Syntax highlighting
                                        </li>
                                    </ul>
                                </div>
                            </>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}