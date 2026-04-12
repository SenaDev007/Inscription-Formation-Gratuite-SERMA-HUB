"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  CalendarDays,
  Clock3,
  BadgeCheck,
  Users,
  MapPin,
  Phone,
} from "lucide-react";
import MultiStepForm from "@/components/MultiStepForm";

/* ── Info items ──────────────────────────────────────── */
const INFO_ITEMS = [
  {
    icon: <CalendarDays className="w-5 h-5 text-orange mx-auto" aria-hidden="true" />,
    label: "Dates",
    value: "16 · 17 · 18 Avril 2026",
    sub: "Jeu · Ven · Sam",
  },
  {
    icon: <Clock3 className="w-5 h-5 text-orange mx-auto" aria-hidden="true" />,
    label: "Horaire",
    value: "À partir de 9h00",
    sub: "3 jours consécutifs",
  },
  {
    icon: <BadgeCheck className="w-5 h-5 text-orange mx-auto" aria-hidden="true" />,
    label: "Frais",
    value: "100% Gratuit",
    sub: "Attestation 5 000 FCFA",
  },
  {
    icon: <Users className="w-5 h-5 text-orange mx-auto" aria-hidden="true" />,
    label: "Places",
    value: "10 max",
    sub: "par cohorte",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-navy bg-hero-gradient overflow-x-hidden">
      {/* Decorative blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-orange/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-green-serma/5 blur-3xl" />
      </div>

      {/* ── OUTER WRAPPER ── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-10 lg:py-14">

        {/* ── DESKTOP: 2-column grid / MOBILE+TABLET: single column ── */}
        <div className="lg:grid lg:grid-cols-[1fr_520px] xl:grid-cols-[1fr_560px] lg:gap-10 xl:gap-14 lg:items-start">

          {/* ════════════════════════════
              LEFT PANEL — Info (sticky on desktop)
          ════════════════════════════ */}
          <div className="lg:sticky lg:top-8">

            {/* ── Logo & titre ── */}
            <motion.header
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="text-center lg:text-left mb-6 sm:mb-8"
            >
              {/* Logo mark */}
              <div className="flex justify-center lg:justify-start mb-4">
                <Image
                  src="/logo.svg"
                  alt="SERMA HUB Impact Academy"
                  width={88}
                  height={80}
                  priority
                  className="w-20 h-auto xs:w-24 sm:w-28"
                />
              </div>

              <div className="mb-3">
                <h1 className="font-syne text-4xl xs:text-5xl sm:text-6xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-none">
                  <span className="text-white">SERMA</span>
                  <span className="text-orange"> HUB</span>
                </h1>
                <p className="font-syne text-[11px] xs:text-xs sm:text-sm font-semibold tracking-[5px] sm:tracking-[6px] text-green-serma uppercase mt-1.5">
                  Impact Academy
                </p>
              </div>

              <h2 className="font-syne text-lg xs:text-xl sm:text-2xl lg:text-xl xl:text-2xl font-bold text-white mt-5 mb-2 leading-snug">
                Inscription à la Formation Gratuite
              </h2>
              <p className="text-muted text-sm leading-relaxed max-w-sm mx-auto lg:mx-0">
                Renforcez vos compétences en comptabilité avec nos experts.
                Places limitées — inscrivez-vous dès maintenant.
              </p>

              {/* Badge */}
              <div className="inline-flex flex-wrap items-center justify-center gap-2 mt-4 px-3 xs:px-4 py-2 rounded-full bg-green-serma/10 border border-green-serma/30">
                <span className="w-2 h-2 rounded-full bg-green-serma animate-pulse flex-shrink-0" />
                <span className="text-green-serma text-[11px] xs:text-xs font-semibold">
                  Inscriptions ouvertes — 10 places disponibles
                </span>
              </div>
            </motion.header>

            {/* ── Info cards ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-2 xs:gap-3 mb-5 sm:mb-6"
            >
              {INFO_ITEMS.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.07 }}
                  className="bg-navy-light border border-orange/20 rounded-xl p-2.5 xs:p-3 text-center"
                >
                  <div className="mb-1.5">{item.icon}</div>
                  <p className="text-orange text-[9px] xs:text-[10px] font-semibold uppercase tracking-wider mb-0.5">
                    {item.label}
                  </p>
                  <p className="text-white text-[11px] xs:text-xs font-bold leading-tight">
                    {item.value}
                  </p>
                  <p className="text-muted text-[9px] xs:text-[10px] mt-0.5">{item.sub}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* ── Lieu ── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-navy-light border border-orange/20 rounded-xl p-4 mb-6 lg:mb-0"
            >
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div className="min-w-0">
                  <p className="text-white font-semibold text-[10px] xs:text-xs uppercase tracking-wider mb-1">
                    Lieu de la formation
                  </p>
                  <p className="text-slate-300 text-xs leading-relaxed break-words">
                    Zongo 2, axe BENI CHIC – PRESIDO, à 100 m du carrefour
                    après EPP La SOURCE
                    <br />
                    <span className="text-muted">
                      (direction CEG NIMA, étage à droite)
                    </span>
                  </p>
                  <a
                    href="tel:0140377199"
                    className="inline-flex items-center gap-1.5 mt-2 text-orange text-xs font-semibold hover:text-orange-hover active:text-orange-hover transition-colors"
                    aria-label="Appeler le 01 40 37 71 99"
                  >
                    <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                    01 40 37 71 99
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
          {/* END LEFT PANEL */}

          {/* ════════════════════════════
              RIGHT PANEL — Formulaire
          ════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-navy-light border border-orange/30 rounded-2xl p-4 xs:p-5 sm:p-7 md:p-8 shadow-2xl"
          >
            <MultiStepForm />
          </motion.div>
          {/* END RIGHT PANEL */}

        </div>
        {/* END GRID */}

        {/* ── Footer ── */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="text-center mt-8 sm:mt-10 pb-4"
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
