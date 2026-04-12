"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

interface SuccessScreenProps {
  name: string;
}

export default function SuccessScreen({ name }: SuccessScreenProps) {
  useEffect(() => {
    // Confetti burst
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
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="text-center py-8 px-4"
    >
      {/* Animated checkmark */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
        className="w-24 h-24 rounded-full bg-green-serma/20 border-2 border-green-serma mx-auto mb-6 flex items-center justify-center"
      >
        <motion.svg
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.4, duration: 0.6, ease: "easeInOut" }}
          className="w-12 h-12 text-green-serma"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="font-syne text-2xl sm:text-3xl font-bold text-white mb-3">
          Candidature envoyée !
        </h2>
        <p className="text-slate-300 text-base mb-2">
          Félicitations{" "}
          <span className="text-orange font-semibold">{name}</span> !
        </p>
        <p className="text-muted text-sm leading-relaxed max-w-md mx-auto mb-8">
          Votre inscription à la formation{" "}
          <strong className="text-white">SERMA HUB Impact Academy</strong> a
          bien été reçue. Nous vous contacterons sur WhatsApp pour confirmer
          votre place.
        </p>

        {/* Info boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left max-w-lg mx-auto">
          <div className="bg-navy-light rounded-xl p-4 border border-orange/20">
            <p className="text-orange text-xs font-semibold uppercase tracking-wider mb-1">
              Dates
            </p>
            <p className="text-white text-sm font-medium">16 · 17 · 18 Avril</p>
            <p className="text-muted text-xs">2026</p>
          </div>
          <div className="bg-navy-light rounded-xl p-4 border border-green-serma/30">
            <p className="text-green-serma text-xs font-semibold uppercase tracking-wider mb-1">
              Frais
            </p>
            <p className="text-white text-sm font-medium">100% Gratuit</p>
            <p className="text-muted text-xs">0 FCFA</p>
          </div>
          <div className="bg-navy-light rounded-xl p-4 border border-orange/20">
            <p className="text-orange text-xs font-semibold uppercase tracking-wider mb-1">
              Contact
            </p>
            <p className="text-white text-sm font-medium">01 40 37 71 99</p>
            <p className="text-muted text-xs">WhatsApp</p>
          </div>
        </div>

        <p className="mt-6 text-muted text-xs">
          Places limitées à 10 participants • Zongo 2, axe BENI CHIC – PRESIDO
        </p>
      </motion.div>
    </motion.div>
  );
}
