"use client";

import React, { useState, useEffect } from "react";
import { NextSeo } from "next-seo";
import { motion, AnimatePresence } from "framer-motion";
import { PlusIcon, StarIcon, EyeIcon, ExclamationCircleIcon, CodeBracketIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import DiffSummaryBar from "../components/DiffSummaryBar";
import { Tooltip } from "../components/Tooltip";
import AlertBanner from "../components/AlertBanner";

interface GitHubStats {
  stars: number;
  forks: number;
  issues: number;
  watchers: number;
}

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
  const [githubStats, setGithubStats] = useState<GitHubStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    async function fetchGithubStats() {
      try {
        const res = await fetch("https://api.github.com/repos/udaypankhaniya/diff-check", {
          headers: {
            Accept: "application/vnd.github.v3+json",
            ...(process.env.NEXT_PUBLIC_GITHUB_TOKEN && {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
            }),
          },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch GitHub stats");
        }
        const data = await res.json();
        setGithubStats({
          stars: data.stargazers_count || 0,
          forks: data.forks_count || 0,
          issues: data.open_issues_count || 0,
          watchers: data.watchers_count || 0,
        });
        setError(null);
      } catch (err) {
        setError("Unable to fetch GitHub stats. Please try again later.");
        setShowAlert(true);
      } finally {
        setIsLoading(false);
      }
    }

    // Check local storage for cached stats
    const cachedStats = localStorage.getItem("githubStats");
    if (cachedStats) {
      setGithubStats(JSON.parse(cachedStats));
      setIsLoading(false);
    } else {
      fetchGithubStats();
    }

    // Refresh stats every 5 minutes
    const interval = setInterval(fetchGithubStats, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Cache stats in local storage
  useEffect(() => {
    if (githubStats) {
      localStorage.setItem("githubStats", JSON.stringify(githubStats));
    }
  }, [githubStats]);

  return (
    <>
      <NextSeo
        title="Diff-Check: Open-Source File Comparison Tool"
        description="Diff-Check is an open-source Next.js application for comparing ZIP files with a modern UI, real-time diff analysis, and detailed file tree views."
        canonical="https://diff-check.vercel.app"
        openGraph={{
          url: "https://diff-check.vercel.app",
          title: "Diff-Check: Open-Source File Comparison Tool",
          description:
            "Diff-Check is an open-source Next.js application for comparing ZIP files with a modern UI, real-time diff analysis, and detailed file tree views.",
          images: [
            {
              url: "https://diff-check.vercel.app/og-image.jpg",
              width: 1200,
              height: 630,
              alt: "Diff-Check Preview",
            },
          ],
          site_name: "Diff-Check",
        }}
        twitter={{
          handle: "@udaypankhaniya",
          cardType: "summary_large_image",
        }}
      />
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-100 dark:from-gray-900 dark:via-gray-950 dark:to-slate-900">
        {/* Hero Section */}
        <header className="w-full px-4 pt-10 pb-8 md:pt-20 md:pb-16 flex flex-col items-center text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 drop-shadow-lg mb-4"
          >
            Diff-Check
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-2xl text-gray-700 dark:text-gray-200 max-w-2xl mx-auto mb-6"
          >
            Effortlessly compare ZIP files, visualize changes, and collaborate with the open-source community.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="/app"
              className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform text-lg flex items-center gap-2"
            >
              Try the App <ArrowRightIcon className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/udaypankhaniya/diff-check"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-full bg-white/80 dark:bg-slate-800/80 text-blue-700 dark:text-white font-semibold shadow-lg border border-blue-200 dark:border-slate-700 hover:scale-105 transition-transform text-lg flex items-center gap-2"
            >
              <StarIcon className="w-5 h-5" /> GitHub
            </a>
          </motion.div>
        </header>

        {/* GitHub Stats Section */}
        <section className="w-full max-w-2xl mx-auto px-4 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-2xl bg-white/80 dark:bg-slate-900/80 shadow-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            {isLoading ? (
              <div className="flex-1 flex justify-center items-center">
                <div className="loading-spinner w-8 h-8 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin" />
              </div>
            ) : githubStats ? (
              <div className="flex flex-wrap gap-6 justify-center w-full">
                <Tooltip content="GitHub Stars">
                  <span className="flex items-center gap-2 text-yellow-500 font-bold text-lg">
                    <StarIcon className="w-6 h-6" /> {githubStats.stars} <span className="hidden sm:inline">Stars</span>
                  </span>
                </Tooltip>
                <Tooltip content="GitHub Forks">
                  <span className="flex items-center gap-2 text-green-500 font-bold text-lg">
                    <PlusIcon className="w-6 h-6" /> {githubStats.forks} <span className="hidden sm:inline">Forks</span>
                  </span>
                </Tooltip>
                <Tooltip content="Open Issues">
                  <span className="flex items-center gap-2 text-red-500 font-bold text-lg">
                    <ExclamationCircleIcon className="w-6 h-6" /> {githubStats.issues} <span className="hidden sm:inline">Issues</span>
                  </span>
                </Tooltip>
                <Tooltip content="GitHub Watchers">
                  <span className="flex items-center gap-2 text-blue-500 font-bold text-lg">
                    <EyeIcon className="w-6 h-6" /> {githubStats.watchers} <span className="hidden sm:inline">Watchers</span>
                  </span>
                </Tooltip>
              </div>
            ) : (
              <p className="text-[var(--muted-foreground)]">Unable to fetch GitHub stats.</p>
            )}
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="w-full max-w-5xl mx-auto px-4 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
          >
            {features.map((f, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white/80 dark:bg-slate-900/80 shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform"
              >
                {f.icon}
                <h4 className="mt-4 text-xl font-bold text-[var(--foreground)] mb-2">{f.title}</h4>
                <p className="text-gray-600 dark:text-gray-300 text-base">{f.desc}</p>
              </div>
            ))}
          </motion.div>
        </section>

        {/* Call to Action Section */}
        <section className="w-full px-4 mb-10 flex flex-col items-center">
          <motion.a
            href="/app"
            className="px-10 py-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-500 text-white font-bold shadow-xl text-xl flex items-center gap-3 hover:scale-105 transition-transform"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Start Comparing ZIPs <ArrowRightIcon className="w-6 h-6" />
          </motion.a>
        </section>

        {/* Footer */}
        <footer className="w-full py-8 px-4 text-center text-gray-500 dark:text-gray-400 mt-auto">
          <div className="mb-2">
            <a
              href="https://github.com/udaypankhaniya/diff-check"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
            >
              View on GitHub
            </a>
            {" | "}
            <span>MIT License</span>
          </div>
          <div>
            &copy; {new Date().getFullYear()} Diff-Check. Created by {" "}
            <a
              href="https://github.com/udaypankhaniya"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
            >
              Uday Pankhaniya
            </a>
            .
          </div>
        </footer>
      </div>
    </>
  );
}