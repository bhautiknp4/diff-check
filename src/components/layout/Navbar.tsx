'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { 
  SunIcon, 
  MoonIcon, 
  Cog6ToothIcon,
  DocumentMagnifyingGlassIcon 
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';

const Navbar: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { toggleModal } = useApp();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-indigo-200 dark:border-blue-800"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <DocumentMagnifyingGlassIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              Diff Check
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="/" 
              className="text-indigo-600 dark:text-blue-300 hover:text-indigo-700 dark:hover:text-blue-400 transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/app" 
              className="text-indigo-600 dark:text-blue-300 hover:text-indigo-700 dark:hover:text-blue-400 transition-colors"
            >
              Compare
            </Link>
            <a 
              href="https://github.com/udaypankhaniya/diff-check" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-indigo-600 dark:text-blue-300 hover:text-indigo-700 dark:hover:text-blue-400 transition-colors"
            >
              GitHub
            </a>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleModal('settings')}
              className="hidden md:flex"
            >
              <Cog6ToothIcon className="w-5 h-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? (
                <SunIcon className="w-5 h-5" />
              ) : (
                <MoonIcon className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;