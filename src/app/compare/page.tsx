import React from "react";

const ComparePage = () => {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors">
            <div className="w-full max-w-6xl p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md mt-12">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">Compare ZIP Files</h1>
                {/* Summary Bar Placeholder */}
                <div className="mb-6">
                    <div className="bg-gray-100 dark:bg-gray-700 rounded p-4 flex justify-between">
                        <span>🟢 Added: 0</span>
                        <span>🔴 Removed: 0</span>
                        <span>🟡 Modified: 0</span>
                    </div>
                </div>
                {/* File Tree View Placeholder */}
                <div className="flex gap-8">
                    <div className="flex-1">
                        <h2 className="font-semibold mb-2 text-gray-700 dark:text-gray-200">ZIP 1</h2>
                        <div className="bg-gray-50 dark:bg-gray-900 border rounded p-4 min-h-[200px]">File Tree View (Left)</div>
                    </div>
                    <div className="flex-1">
                        <h2 className="font-semibold mb-2 text-gray-700 dark:text-gray-200">ZIP 2</h2>
                        <div className="bg-gray-50 dark:bg-gray-900 border rounded p-4 min-h-[200px]">File Tree View (Right)</div>
                    </div>
                </div>
                {/* Diff Details Panel Placeholder */}
                <div className="mt-8">
                    <div className="bg-gray-100 dark:bg-gray-700 rounded p-4 min-h-[120px]">Diff Details Panel</div>
                </div>
            </div>
        </main>
    );
};

export default ComparePage; 