"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setVisible(false), 600);
          return 100;
        }
        // Increment progress naturally
        const increment = Math.floor(Math.random() * 15) + 5;
        return Math.min(prev + increment, 100);
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: "-100%",
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0B0B0B]"
        >
          {/* Decorative glowing background elements */}
          <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(212,175,55,0.06)_0%,transparent_70%)] filter blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(212,175,55,0.06)_0%,transparent_70%)] filter blur-3xl pointer-events-none" />

          {/* Central Emblem & Loader */}
          <div className="relative flex flex-col items-center max-w-md px-6 text-center select-none">
            {/* Crown/Royal styled Golden Emblem */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative mb-8"
            >
              <svg
                width="100"
                height="100"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="filter drop-shadow-[0_0_15px_rgba(212,175,55,0.5)] animate-pulse"
              >
                <path
                  d="M50 5L75 25V60L50 85L25 60V25L50 5Z"
                  stroke="#D4AF37"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M50 15L68 30V55L50 72L32 55V30L50 15Z"
                  stroke="#D4AF37"
                  strokeWidth="1"
                  strokeDasharray="4 2"
                />
                {/* Elegant central letter J */}
                <path
                  d="M46 32H54V50C54 54.4 50.4 58 46 58C43.8 58 42 56.2 42 54"
                  stroke="#D4AF37"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Crown Stars */}
                <circle cx="50" cy="5" r="2" fill="#D4AF37" />
                <circle cx="25" cy="25" r="1.5" fill="#D4AF37" />
                <circle cx="75" cy="25" r="1.5" fill="#D4AF37" />
              </svg>
            </motion.div>

            {/* Brand Name */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-3xl font-serif-luxury tracking-[0.25em] text-[#D4AF37] font-medium"
            >
              JASHAN
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-[10px] tracking-[0.4em] uppercase text-white mt-2"
            >
              Turkish & Azerbaijani Fusion
            </motion.p>

            {/* Quote cycling */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="mt-12 h-12 text-sm italic font-serif text-gray-400 font-light leading-relaxed"
            >
              {progress < 40 ? (
                <span>Crafting authentic culinary legacies...</span>
              ) : progress < 75 ? (
                <span>Where Istanbul meets Baku in the heart of Dubai...</span>
              ) : (
                <span>Preparing your royal table...</span>
              )}
            </motion.div>

            {/* Progress metrics */}
            <div className="w-[240px] mt-10 relative">
              <div className="h-[2px] w-full bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#D4AF37]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeInOut" }}
                />
              </div>
              
              {/* Progress counter text */}
              <div className="flex justify-between items-center mt-2 text-[10px] text-[#D4AF37] tracking-[0.2em] font-mono font-medium">
                <span>DUBAI</span>
                <span>{progress}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
