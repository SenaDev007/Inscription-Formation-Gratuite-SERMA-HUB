"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import MultiStepForm from "@/components/MultiStepForm";

/* ── SVG Icon components (no emojis) ─────────────────── */
function CalendarIcon() {
  return (
    <svg className="w-5 h-5 text-orange mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="w-5 h-5 text-orange mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}

function BadgeCheckIcon() {
  return (
    <svg className="w-5 h-5 text-orange mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg className="w-5 h-5 text-orange mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg className="w-5 h-5 text-orange flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 6.75Z" />
    </svg>
  );
}

/* ── Info items ──────────────────────────────────────── */
const INFO_ITEMS = [
  {
    icon: <CalendarIcon />,
    label: "Dates",
    value: "16 · 17 · 18 Avril 2026",
    sub: "Jeu · Ven · Sam",
  },
  {
    icon: <ClockIcon />,
    label: "Horaire",
    value: "À partir de 9h00",
    sub: "3 jours consécutifs",
  },
  {
    icon: <BadgeCheckIcon />,
    label: "Frais",
    value: "100% Gratuit",
    sub: "Attestation 5 000 FCFA",
  },
  {
    icon: <UsersIcon />,
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
                <MapPinIcon />
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
                    <PhoneIcon />
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
