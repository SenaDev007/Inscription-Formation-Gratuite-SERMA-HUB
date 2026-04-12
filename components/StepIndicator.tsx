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
    <div className="w-full mb-8">
      {/* Steps dots + line */}
      <div className="flex items-center justify-between relative">
        {/* Background line */}
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-navy-light z-0" />
        {/* Progress line */}
        <motion.div
          className="absolute top-4 left-0 h-0.5 bg-orange z-0"
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
                className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold"
                style={{ color: isActive || isCompleted ? "#1B2A5C" : "#94A3B8" }}
              >
                {isCompleted ? (
                  <svg
                    className="w-4 h-4"
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
              <span
                className={`mt-2 text-[10px] font-medium text-center hidden sm:block max-w-[70px] leading-tight ${
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

      {/* Mobile: current step label */}
      <div className="mt-3 sm:hidden text-center">
        <span className="text-orange text-sm font-semibold">
          Étape {currentStep} / {totalSteps} — {labels[currentStep - 1]}
        </span>
      </div>
    </div>
  );
}
