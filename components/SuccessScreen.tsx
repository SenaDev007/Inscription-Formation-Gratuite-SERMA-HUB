"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

interface SuccessScreenProps {
  name: string;
  onReset: () => void;
}

export default function SuccessScreen({ name, onReset }: SuccessScreenProps) {
  useEffect(() => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#F59B1E", "#2BA96B", "#FFFFFF"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#F59B1E", "#2BA96B", "#FFFFFF"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="text-center py-6 xs:py-8 px-2 xs:px-4"
    >
      {/* Animated checkmark */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
        className="w-20 h-20 xs:w-24 xs:h-24 rounded-full bg-green-serma/20 border-2 border-green-serma mx-auto mb-5 xs:mb-6 flex items-center justify-center"
      >
        <motion.svg
          className="w-10 h-10 xs:w-12 xs:h-12 text-green-serma"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
          aria-hidden="true"
        >
          <motion.path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.4, duration: 0.6, ease: "easeInOut" }}
          />
        </motion.svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="font-syne text-xl xs:text-2xl sm:text-3xl font-bold text-white mb-2 xs:mb-3">
          Candidature envoyée !
        </h2>
        <p className="text-slate-300 text-sm xs:text-base mb-2">
          Félicitations{" "}
          <span className="text-orange font-semibold">{name}</span> !
        </p>
        <p className="text-muted text-xs xs:text-sm leading-relaxed max-w-sm xs:max-w-md mx-auto mb-6 xs:mb-8">
          Votre inscription à la formation{" "}
          <strong className="text-white">SERMA HUB Impact Academy</strong> a
          bien été reçue. Nous vous contacterons sur WhatsApp pour confirmer
          votre place.
        </p>

        {/* Info boxes */}
        <div className="grid grid-cols-1 xs:grid-cols-3 gap-3 text-left max-w-sm xs:max-w-lg mx-auto">
          <div className="bg-navy-light rounded-xl p-3 xs:p-4 border border-orange/20">
            <p className="text-orange text-[10px] xs:text-xs font-semibold uppercase tracking-wider mb-1">
              Dates
            </p>
            <p className="text-white text-xs xs:text-sm font-medium">
              16 · 17 · 18 Avril
            </p>
            <p className="text-muted text-[10px] xs:text-xs">2026</p>
          </div>
          <div className="bg-navy-light rounded-xl p-3 xs:p-4 border border-green-serma/30">
            <p className="text-green-serma text-[10px] xs:text-xs font-semibold uppercase tracking-wider mb-1">
              Frais
            </p>
            <p className="text-white text-xs xs:text-sm font-medium">
              100% Gratuit
            </p>
            <p className="text-muted text-[10px] xs:text-xs">0 FCFA</p>
          </div>
          <div className="bg-navy-light rounded-xl p-3 xs:p-4 border border-orange/20">
            <p className="text-orange text-[10px] xs:text-xs font-semibold uppercase tracking-wider mb-1">
              Contact
            </p>
            <p className="text-white text-xs xs:text-sm font-medium">
              01 40 37 71 99
            </p>
            <p className="text-muted text-[10px] xs:text-xs">WhatsApp</p>
          </div>
        </div>

        <p className="mt-5 xs:mt-6 text-muted text-[10px] xs:text-xs px-2">
          Places limitées à 10 participants · Zongo 2, axe BENI CHIC – PRESIDO
        </p>

        {/* Reset — nouvelle inscription */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          onClick={onReset}
          className="mt-6 xs:mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-orange/30 text-orange text-sm font-semibold hover:bg-orange/10 active:bg-orange/20 transition-all duration-200"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
          </svg>
          Nouvelle inscription
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
