"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  PlusIcon, 
  StarIcon, 
  EyeIcon, 
  ExclamationCircleIcon, 
  CodeBracketIcon, 
  ArrowRightIcon,
  SparklesIcon 
} from "@heroicons/react/24/outline";
import Link from "next/link";
import GitHubStats from "@/components/diff/GitHubStats";

const features = [
  {
    icon: <CodeBracketIcon className="w-8 h-8 text-blue-500" />,
    title: "Open Source",
    desc: "MIT licensed, transparent, and community-driven. Contributions welcome!",
  },
  {
    icon: <StarIcon className="w-8 h-8 text-yellow-400" />,
    title: "Live GitHub Stats",
    desc: "See real-time stars, forks, and watchers. Join our growing community.",
  },
  {
    icon: <PlusIcon className="w-8 h-8 text-green-500" />,
    title: "Modern ZIP Diff",
    desc: "Upload two ZIPs, get a beautiful, color-coded diff with file tree and unified view.",
  },
  {
    icon: <ExclamationCircleIcon className="w-8 h-8 text-red-500" />,
    title: "Error Handling",
    desc: "Friendly, clear error messages and robust validation for a smooth experience.",
  },
  {
    icon: <EyeIcon className="w-8 h-8 text-purple-500" />,
    title: "Mobile-First Design",
    desc: "Fully responsive, touch-friendly, and gorgeous on any device.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100 dark:from-blue-900 dark:via-blue-950 dark:to-indigo-900">
        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-20 pb-16 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-7xl font-extrabold mb-6"
          >
            <div className="flex items-center justify-center mb-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <SparklesIcon className="w-16 h-16 text-indigo-600 dark:text-blue-400 mr-4" />
              </motion.div>
              <span className="bg-gradient-to-r from-indigo-600 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                Diff Check
              </span>
            </div>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl md:text-2xl text-indigo-700 dark:text-blue-200 max-w-3xl mx-auto mb-8"
          >
            Professional ZIP file comparison with beautiful visual diffs. 
            Open source, privacy-focused, and built for developers.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="/app"
              className="px-10 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-bold shadow-xl hover:scale-105 transition-transform text-xl flex items-center gap-3"
            >
              Start Comparing <ArrowRightIcon className="w-6 h-6" />
            </Link>
            <a
              href="https://github.com/udaypankhaniya/diff-check"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 rounded-full bg-white/90 dark:bg-blue-800/90 text-indigo-700 dark:text-blue-200 font-bold shadow-xl border border-indigo-200 dark:border-blue-700 hover:scale-105 transition-transform text-xl flex items-center gap-3"
            >
              <StarIcon className="w-6 h-6" /> View Source
            </a>
          </motion.div>
        </section>

        {/* GitHub Stats Section */}
        <section className="container mx-auto px-4 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <GitHubStats />
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 dark:text-blue-100 mb-4">
              Why Choose Diff Check?
            </h2>
            <p className="text-lg text-indigo-600 dark:text-blue-300 max-w-2xl mx-auto">
              Built with modern web technologies and designed for professional developers
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/90 dark:bg-blue-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-indigo-200 dark:border-blue-700 text-center"
              >
                <div className="mb-6">{f.icon}</div>
                <h3 className="text-xl font-bold text-indigo-900 dark:text-blue-100 mb-4">
                  {f.title}
                </h3>
                <p className="text-indigo-600 dark:text-blue-300 leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Call to Action Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 dark:text-blue-100">
              Ready to Compare Your Files?
            </h2>
            <p className="text-lg text-indigo-600 dark:text-blue-300 max-w-2xl mx-auto">
              Join thousands of developers who trust Diff Check for their file comparison needs.
            </p>
            <Link
              href="https://github.com/udaypankhaniya/diff-check"
              className="inline-flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold rounded-full shadow-2xl hover:scale-105 transition-all duration-300 text-xl"
            >
              <SparklesIcon className="w-6 h-6" />
              Get Started Now
              <ArrowRightIcon className="w-6 h-6" />
            </Link>
          </motion.div>
        </section>
    </div>
  );
}