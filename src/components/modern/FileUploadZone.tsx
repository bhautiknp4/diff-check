import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CloudArrowUpIcon, DocumentIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { cn, formatFileSize } from "@/lib/utils";

interface FileUploadZoneProps {
  label: string;
  onFileSelect: (file: File | null) => void;
  file: File | null;
  disabled?: boolean;
  className?: string;
}

const FileUploadZone: React.FC<FileUploadZoneProps> = ({ 
  label, 
  onFileSelect, 
  file, 
  disabled = false,
  className 
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (disabled) return;
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.name.endsWith('.zip')) {
        onFileSelect(droppedFile);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFileSelect(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <motion.div
      className={cn(
        "relative group",
        className
      )}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      <div
        className={cn(
          "relative border-2 border-dashed rounded-xl p-6 transition-all duration-300 cursor-pointer",
          "bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900",
          isDragOver && !disabled && "border-blue-500 bg-blue-50 dark:bg-blue-950/50 scale-105",
          !isDragOver && !disabled && "border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500",
          file && "border-green-500 bg-green-50 dark:bg-green-950/50",
          disabled && "opacity-50 cursor-not-allowed border-slate-200 dark:border-slate-700"
        )}
        onClick={() => !disabled && inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".zip"
          className="hidden"
          onChange={handleChange}
          disabled={disabled}
        />

        <AnimatePresence mode="wait">
          {file ? (
            <motion.div
              key="file-selected"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center space-x-3"
            >
              <div className="flex-shrink-0">
                <DocumentIcon className="w-8 h-8 text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                  {file.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {formatFileSize(file.size)}
                </p>
              </div>
              <button
                onClick={handleRemove}
                className="flex-shrink-0 p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
              >
                <XMarkIcon className="w-4 h-4 text-red-500" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="upload-prompt"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center"
            >
              <motion.div
                animate={isDragOver ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <CloudArrowUpIcon className="mx-auto w-12 h-12 text-slate-400 dark:text-slate-500 mb-3" />
              </motion.div>
              <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">
                {label}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Drag & drop or click to select ZIP file
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Animated border effect */}
        <div className={cn(
          "absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300",
          "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500",
          isDragOver && !disabled && "opacity-20"
        )} />
      </div>
    </motion.div>
  );
};

export default FileUploadZone;