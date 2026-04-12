"use client";

import { motion } from "framer-motion";
import MultiStepForm from "@/components/MultiStepForm";

const INFO_ITEMS = [
  {
    icon: "📅",
    label: "Dates",
    value: "16 · 17 · 18 Avril 2026",
    sub: "Jeudi, Vendredi, Samedi",
  },
  {
    icon: "🕘",
    label: "Horaire",
    value: "À partir de 9h00",
    sub: "3 jours consécutifs",
  },
  {
    icon: "✅",
    label: "Frais",
    value: "100% Gratuit",
    sub: "Attestation : 5 000 FCFA",
  },
  {
    icon: "👥",
    label: "Places",
    value: "10 participants",
    sub: "par cohorte",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-navy bg-hero-gradient">
      {/* Decorative blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-orange/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-green-serma/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8 sm:py-12">
        {/* ── HEADER ── */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          {/* Logo */}
          <div className="mb-4">
            <h1 className="font-syne text-4xl sm:text-5xl font-extrabold tracking-tight leading-none">
              <span className="text-white">SERMA</span>
              <span className="text-orange"> HUB</span>
            </h1>
            <p className="font-syne text-xs sm:text-sm font-semibold tracking-[6px] text-green-serma uppercase mt-1">
              Impact Academy
            </p>
          </div>

          <h2 className="font-syne text-xl sm:text-2xl font-bold text-white mt-6 mb-2">
            Inscription à la Formation Gratuite
          </h2>
          <p className="text-muted text-sm leading-relaxed max-w-md mx-auto">
            Renforcez vos compétences en comptabilité avec nos experts.
            Places limitées — inscrivez-vous dès maintenant.
          </p>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-green-serma/10 border border-green-serma/30">
            <span className="w-2 h-2 rounded-full bg-green-serma animate-pulse" />
            <span className="text-green-serma text-xs font-semibold">
              Inscriptions ouvertes — 10 places disponibles
            </span>
          </div>
        </motion.header>

        {/* ── INFO CARDS ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8"
        >
          {INFO_ITEMS.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.07 }}
              className="bg-navy-light border border-orange/20 rounded-xl p-3 text-center"
            >
              <span className="text-xl block mb-1">{item.icon}</span>
              <p className="text-orange text-[10px] font-semibold uppercase tracking-wider mb-0.5">
                {item.label}
              </p>
              <p className="text-white text-xs font-bold leading-tight">
                {item.value}
              </p>
              <p className="text-muted text-[10px] mt-0.5">{item.sub}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* ── LIEU ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="bg-navy-light border border-orange/20 rounded-xl p-4 mb-8 text-sm"
        >
          <div className="flex items-start gap-3">
            <span className="text-orange text-lg flex-shrink-0 mt-0.5">📍</span>
            <div>
              <p className="text-white font-semibold text-xs uppercase tracking-wider mb-1">
                Lieu de la formation
              </p>
              <p className="text-slate-300 text-xs leading-relaxed">
                Zongo 2, von AXE BENI CHIC – PRESIDO, à 100 m du carrefour
                après EPP La SOURCE
                <br />
                <span className="text-muted">(direction CEG NIMA, étage à droite)</span>
              </p>
              <a
                href="tel:0140377199"
                className="inline-flex items-center gap-1 mt-2 text-orange text-xs font-semibold hover:text-orange-hover"
              >
                📞 01 40 37 71 99
              </a>
            </div>
          </div>
        </motion.div>

        {/* ── FORM CARD ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="bg-navy-light border border-orange/30 rounded-2xl p-6 sm:p-8 shadow-2xl"
        >
          <MultiStepForm />
        </motion.div>

        {/* ── FOOTER ── */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8 pb-4"
        >
          <p className="text-muted text-xs">
            © 2026{" "}
            <span className="text-white font-semibold">SERMA HUB</span> Impact
            Academy · Tous droits réservés
          </p>
        </motion.footer>
      </div>
    </main>
  );
}
