"use client";

import { motion } from "framer-motion";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  labels: string[];
}

export default function StepIndicator({
  currentStep,
  totalSteps,
  labels,
}: StepIndicatorProps) {
  return (
    <div className="w-full mb-7 sm:mb-8">
      {/* Steps row */}
      <div className="flex items-center justify-between relative px-1">
        {/* Background line */}
        <div className="absolute top-[13px] xs:top-[15px] sm:top-4 left-0 right-0 h-0.5 bg-navy-dark z-0" />

        {/* Progress line */}
        <motion.div
          className="absolute top-[13px] xs:top-[15px] sm:top-4 left-0 h-0.5 bg-orange z-0"
          initial={{ width: "0%" }}
          animate={{
            width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />

        {Array.from({ length: totalSteps }).map((_, i) => {
          const step = i + 1;
          const isCompleted = step < currentStep;
          const isActive = step === currentStep;

          return (
            <div key={step} className="flex flex-col items-center z-10">
              <motion.div
                initial={false}
                animate={{
                  scale: isActive ? 1.15 : 1,
                  backgroundColor: isCompleted
                    ? "#2BA96B"
                    : isActive
                    ? "#F59B1E"
                    : "#243570",
                  borderColor: isCompleted
                    ? "#2BA96B"
                    : isActive
                    ? "#F59B1E"
                    : "#94A3B8",
                }}
                transition={{ duration: 0.3 }}
                className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center text-[10px] xs:text-xs font-bold flex-shrink-0"
                style={{
                  color: isActive || isCompleted ? "#1B2A5C" : "#94A3B8",
                }}
              >
                {isCompleted ? (
                  <svg
                    className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  step
                )}
              </motion.div>

              {/* Label — hidden on mobile, shown from sm */}
              <span
                className={`mt-1.5 text-[9px] sm:text-[10px] font-medium text-center hidden sm:block w-[60px] sm:w-[68px] leading-tight truncate
                  ${
                    isActive
                      ? "text-orange"
                      : isCompleted
                      ? "text-green-serma"
                      : "text-muted"
                  }`}
              >
                {labels[i]}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile current step label */}
      <div className="mt-3 sm:hidden text-center">
        <span className="text-orange text-xs xs:text-sm font-semibold">
          Étape {currentStep}/{totalSteps} — {labels[currentStep - 1]}
        </span>
      </div>
    </div>
  );
}
