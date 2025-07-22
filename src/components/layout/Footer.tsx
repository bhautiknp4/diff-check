'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HeartIcon } from '@heroicons/react/24/solid';

const Footer: React.FC = () => {
  return (
    <footer className="bg-indigo-50 dark:bg-blue-900 border-t border-indigo-200 dark:border-blue-800">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-indigo-900 dark:text-blue-100">
              Diff Check
            </h3>
            <p className="text-sm text-indigo-700 dark:text-blue-300">
              Professional ZIP file comparison tool with beautiful visual diffs.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-indigo-900 dark:text-blue-100">
              Product
            </h4>
            <div className="space-y-2">
              <Link 
                href="/app" 
                className="block text-sm text-indigo-600 dark:text-blue-300 hover:text-indigo-700 dark:hover:text-blue-400 transition-colors"
              >
                Compare Files
              </Link>
              <Link 
                href="/#features" 
                className="block text-sm text-indigo-600 dark:text-blue-300 hover:text-indigo-700 dark:hover:text-blue-400 transition-colors"
              >
                Features
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold text-indigo-900 dark:text-blue-100">
              Resources
            </h4>
            <div className="space-y-2">
              <a 
                href="https://github.com/udaypankhaniya/diff-check" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-sm text-indigo-600 dark:text-blue-300 hover:text-indigo-700 dark:hover:text-blue-400 transition-colors"
              >
                GitHub
              </a>
              <a 
                href="https://github.com/udaypankhaniya/diff-check/issues" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-sm text-indigo-600 dark:text-blue-300 hover:text-indigo-700 dark:hover:text-blue-400 transition-colors"
              >
                Report Issues
              </a>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold text-indigo-900 dark:text-blue-100">
              Legal
            </h4>
            <div className="space-y-2">
              <span className="block text-sm text-indigo-600 dark:text-blue-300">
                MIT License
              </span>
              <span className="block text-sm text-indigo-600 dark:text-blue-300">
                Open Source
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-indigo-200 dark:border-blue-800">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-sm text-indigo-600 dark:text-blue-300">
              © {new Date().getFullYear()} Diff Check. All rights reserved.
            </p>
            
            <motion.div 
              className="flex items-center space-x-1 text-sm text-indigo-600 dark:text-blue-300"
              whileHover={{ scale: 1.05 }}
            >
              <span>Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <HeartIcon className="w-4 h-4 text-red-500" />
              </motion.div>
              <span>by</span>
              <a 
                href="https://github.com/udaypankhaniya" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-medium hover:text-indigo-700 dark:hover:text-blue-400 transition-colors"
              >
                Uday Pankhaniya
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;