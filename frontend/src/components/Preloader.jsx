import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [wiped, setWiped] = useState(false);
  const [statusText, setStatusText] = useState('CALIBRATING STRATDRAFT AI ENGINE');

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      // Ease toward 100%
      current += (100 - current) * 0.12 + 1.2;
      if (current >= 99.5) {
        current = 100;
        clearInterval(interval);
        setStatusText('ENTERING MATCH ORBIT');
        setTimeout(() => {
          setWiped(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 650);
        }, 220);
      }
      setProgress(Math.floor(current));
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!wiped && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 bg-[#050811] flex flex-col items-center justify-center gap-6 select-none"
        >
          {/* Subtle Background Radial */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,174,239,0.12)_0%,transparent_70%)] pointer-events-none" />

          {/* Brand Monogram */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00AEEF] to-[#0077B6] flex items-center justify-center font-black text-black text-2xl shadow-2xl shadow-[#00AEEF]/30"
          >
            C9
          </motion.div>

          {/* Status Label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-mono text-xs tracking-[0.28em] text-[#00AEEF] uppercase font-bold"
          >
            {statusText}
          </motion.div>

          {/* 2px Progress Bar with Cyan Glow */}
          <motion.div
            initial={{ opacity: 0, width: '120px' }}
            animate={{ opacity: 1, width: 'clamp(200px, 32vw, 320px)' }}
            transition={{ delay: 0.25 }}
            className="h-[2px] bg-slate-800 rounded-full overflow-hidden relative"
          >
            <div
              style={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-[#00AEEF] to-[#38BDF8] shadow-[0_0_16px_rgba(0,174,239,0.8)] transition-all duration-100 ease-out"
            />
          </motion.div>

          {/* 3-Digit Tabular Counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-mono text-xs font-bold text-slate-400 tracking-widest tabular-nums"
          >
            {String(progress).padStart(3, '0')}%
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
