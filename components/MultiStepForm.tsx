"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  step5Schema,
  MODULES,
  STATUTS,
  NIVEAUX,
  SOURCES,
  type FullFormData,
} from "@/lib/validations";
import StepIndicator from "./StepIndicator";
import SuccessScreen from "./SuccessScreen";
import {
  Label,
  FieldWrapper,
  Input,
  Textarea,
  Select,
  RadioGroup,
  Checkbox,
} from "./FormFields";

const STEP_LABELS = [
  "Infos perso.",
  "Profil pro.",
  "Modules",
  "Motivation",
  "Engagement",
];

const TOTAL_STEPS = 5;

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -60 : 60,
    opacity: 0,
  }),
};

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<Partial<FullFormData>>({});

  // Per-step schemas
  const schemas = [
    step1Schema,
    step2Schema,
    step3Schema,
    step4Schema,
    step5Schema,
  ];

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    trigger,
  } = useForm<FullFormData>({
    resolver: zodResolver(schemas[step - 1] as any),
    defaultValues: {
      sexe: undefined,
      statut: undefined,
      niveauEtudes: undefined,
      modules: [],
      source: undefined,
      attestation: undefined,
      conditionsAcceptees: undefined,
      presenceConfirmee: undefined,
    },
    mode: "onChange",
  });

  const watchedValues = watch();

  const goNext = async () => {
    const valid = await trigger();
    if (!valid) return;
    setFormData((prev) => ({ ...prev, ...watchedValues }));
    setDirection(1);
    setStep((s) => s + 1);
  };

  const goPrev = () => {
    setDirection(-1);
    setStep((s) => s - 1);
  };

  const onSubmit = async (data: FullFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    const finalData = { ...formData, ...data } as FullFormData;

    try {
      const res = await fetch("/api/inscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });

      const result = await res.json();
      if (!res.ok) {
        setSubmitError(result.error || "Une erreur est survenue.");
      } else {
        setIsSuccess(true);
      }
    } catch {
      setSubmitError("Erreur réseau. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <SuccessScreen
        name={`${watchedValues.prenom || formData.prenom || ""}`}
      />
    );
  }

  return (
    <div>
      <StepIndicator
        currentStep={step}
        totalSteps={TOTAL_STEPS}
        labels={STEP_LABELS}
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {step === 1 && (
              <Step1
                register={register}
                errors={errors}
                watch={watch}
                setValue={setValue}
              />
            )}
            {step === 2 && (
              <Step2
                register={register}
                errors={errors}
                watch={watch}
                setValue={setValue}
              />
            )}
            {step === 3 && (
              <Step3
                register={register}
                errors={errors}
                watch={watch}
                setValue={setValue}
              />
            )}
            {step === 4 && (
              <Step4
                register={register}
                errors={errors}
                watch={watch}
                setValue={setValue}
              />
            )}
            {step === 5 && (
              <Step5
                register={register}
                errors={errors}
                watch={watch}
                setValue={setValue}
                isSubmitting={isSubmitting}
                submitError={submitError}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="flex gap-3 mt-8">
          {step > 1 && (
            <button
              type="button"
              onClick={goPrev}
              className="flex-1 sm:flex-none px-6 py-3 rounded-xl border border-orange/30 text-orange font-semibold text-sm transition-all duration-200 hover:bg-orange/10"
            >
              ← Précédent
            </button>
          )}
          {step < TOTAL_STEPS && (
            <button
              type="button"
              onClick={goNext}
              className="flex-1 px-6 py-3 rounded-xl bg-orange text-navy font-bold text-sm transition-all duration-200 hover:bg-orange-hover hover:shadow-orange"
            >
              Suivant →
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

// ─────────────────────────────────────────────
// ÉTAPE 1 — Informations personnelles
// ─────────────────────────────────────────────
function Step1({ register, errors, watch, setValue }: StepProps) {
  const sexe = watch("sexe");
  return (
    <div className="space-y-5">
      <StepTitle>Informations personnelles</StepTitle>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FieldWrapper error={errors.nom?.message}>
          <Label htmlFor="nom" required>Nom</Label>
          <Input
            id="nom"
            placeholder="Ex: KOFFI"
            error={!!errors.nom}
            {...register("nom")}
          />
        </FieldWrapper>
        <FieldWrapper error={errors.prenom?.message}>
          <Label htmlFor="prenom" required>Prénom(s)</Label>
          <Input
            id="prenom"
            placeholder="Ex: Ama Céleste"
            error={!!errors.prenom}
            {...register("prenom")}
          />
        </FieldWrapper>
      </div>

      <FieldWrapper error={errors.sexe?.message}>
        <Label htmlFor="sexe" required>Sexe</Label>
        <RadioGroup
          name="sexe"
          options={["Masculin", "Féminin"]}
          value={sexe || ""}
          onChange={(v) => setValue("sexe", v as "Masculin" | "Féminin")}
          error={errors.sexe?.message}
        />
      </FieldWrapper>

      <FieldWrapper error={errors.whatsapp?.message}>
        <Label htmlFor="whatsapp" required>Numéro WhatsApp</Label>
        <Input
          id="whatsapp"
          type="tel"
          placeholder="Ex: +229 01 XX XX XX XX"
          error={!!errors.whatsapp}
          {...register("whatsapp")}
        />
      </FieldWrapper>

      <FieldWrapper error={errors.email?.message}>
        <Label htmlFor="email" required>Adresse e-mail</Label>
        <Input
          id="email"
          type="email"
          placeholder="votre@email.com"
          error={!!errors.email}
          {...register("email")}
        />
      </FieldWrapper>

      <FieldWrapper error={errors.ville?.message}>
        <Label htmlFor="ville" required>Ville de résidence</Label>
        <Input
          id="ville"
          placeholder="Ex: Cotonou, Parakou..."
          error={!!errors.ville}
          {...register("ville")}
        />
      </FieldWrapper>
    </div>
  );
}

// ─────────────────────────────────────────────
// ÉTAPE 2 — Profil professionnel
// ─────────────────────────────────────────────
function Step2({ register, errors, watch, setValue }: StepProps) {
  const statut = watch("statut");
  const niveauEtudes = watch("niveauEtudes");

  return (
    <div className="space-y-5">
      <StepTitle>Profil professionnel</StepTitle>

      <FieldWrapper error={errors.statut?.message}>
        <Label htmlFor="statut" required>Statut actuel</Label>
        <RadioGroup
          name="statut"
          options={[...STATUTS]}
          value={statut || ""}
          onChange={(v) => setValue("statut", v as typeof STATUTS[number])}
          error={errors.statut?.message}
        />
      </FieldWrapper>

      <FieldWrapper error={errors.domaine?.message}>
        <Label htmlFor="domaine" required>Domaine d'études / secteur d'activité</Label>
        <Input
          id="domaine"
          placeholder="Ex: Comptabilité, Finance, Informatique..."
          error={!!errors.domaine}
          {...register("domaine")}
        />
      </FieldWrapper>

      <FieldWrapper error={errors.niveauEtudes?.message}>
        <Label htmlFor="niveauEtudes" required>Niveau d'études</Label>
        <div className="flex flex-wrap gap-2">
          {NIVEAUX.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setValue("niveauEtudes", n)}
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-200
                ${
                  niveauEtudes === n
                    ? "bg-orange/15 border-orange text-orange"
                    : "border-orange/20 text-muted hover:border-orange/40 hover:text-white"
                }
              `}
            >
              {n}
            </button>
          ))}
        </div>
        {errors.niveauEtudes && (
          <p className="text-red-400 text-xs mt-1">{errors.niveauEtudes.message}</p>
        )}
      </FieldWrapper>
    </div>
  );
}

// ─────────────────────────────────────────────
// ÉTAPE 3 — Modules
// ─────────────────────────────────────────────
function Step3({ register, errors, watch, setValue }: StepProps) {
  const selectedModules = watch("modules") || [];
  const source = watch("source");

  const toggleModule = (mod: string) => {
    const current = selectedModules || [];
    const updated = current.includes(mod)
      ? current.filter((m) => m !== mod)
      : [...current, mod];
    setValue("modules", updated);
  };

  return (
    <div className="space-y-6">
      <StepTitle>Choix des modules</StepTitle>

      <FieldWrapper error={(errors.modules as any)?.message || (errors.modules?.root?.message)}>
        <Label htmlFor="modules" required>Modules souhaités</Label>
        <p className="text-muted text-xs mb-3">Sélectionnez au moins un module</p>
        <div className="space-y-3">
          {MODULES.map((mod) => {
            const isSelected = selectedModules.includes(mod);
            return (
              <motion.button
                key={mod}
                type="button"
                onClick={() => toggleModule(mod)}
                whileTap={{ scale: 0.98 }}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200
                  ${
                    isSelected
                      ? "border-orange bg-orange/10"
                      : "border-orange/20 hover:border-orange/40"
                  }
                `}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors
                      ${isSelected ? "bg-orange border-orange" : "border-muted/50"}
                    `}
                  >
                    {isSelected && (
                      <svg className="w-3 h-3 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className={`text-sm font-medium leading-snug ${isSelected ? "text-orange" : "text-slate-300"}`}>
                    {mod}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
        {(errors.modules as any)?.message && (
          <p className="text-red-400 text-xs mt-1">{(errors.modules as any).message}</p>
        )}
      </FieldWrapper>

      <FieldWrapper error={errors.source?.message}>
        <Label htmlFor="source" required>Comment avez-vous connu cette formation ?</Label>
        <RadioGroup
          name="source"
          options={[...SOURCES]}
          value={source || ""}
          onChange={(v) => setValue("source", v as typeof SOURCES[number])}
          error={errors.source?.message}
        />
      </FieldWrapper>
    </div>
  );
}

// ─────────────────────────────────────────────
// ÉTAPE 4 — Motivation
// ─────────────────────────────────────────────
function Step4({ register, errors, watch, setValue }: StepProps) {
  const attestation = watch("attestation");
  const motivation = watch("motivation") || "";

  return (
    <div className="space-y-5">
      <StepTitle>Motivation & Attentes</StepTitle>

      <FieldWrapper error={errors.motivation?.message}>
        <Label htmlFor="motivation" required>Pourquoi souhaitez-vous participer à cette formation ?</Label>
        <div className="relative">
          <Textarea
            id="motivation"
            placeholder="Décrivez votre motivation... (minimum 50 caractères)"
            error={!!errors.motivation}
            {...register("motivation")}
          />
          <span className={`absolute bottom-3 right-3 text-xs ${motivation.length >= 50 ? "text-green-serma" : "text-muted"}`}>
            {motivation.length}/50 min
          </span>
        </div>
      </FieldWrapper>

      <FieldWrapper error={errors.attentes?.message}>
        <Label htmlFor="attentes">Quelles sont vos attentes concrètes ? <span className="text-muted text-xs">(optionnel)</span></Label>
        <Textarea
          id="attentes"
          placeholder="Ce que vous espérez acquérir, apprendre ou développer..."
          {...register("attentes")}
        />
      </FieldWrapper>

      <FieldWrapper error={errors.attestation?.message}>
        <Label required>Souhaitez-vous une attestation ? (5 000 FCFA)</Label>
        <RadioGroup
          name="attestation"
          options={["Oui", "Non", "Je déciderai plus tard"]}
          value={attestation || ""}
          onChange={(v) =>
            setValue(
              "attestation",
              v as "Oui" | "Non" | "Je déciderai plus tard"
            )
          }
          error={errors.attestation?.message}
        />
      </FieldWrapper>
    </div>
  );
}

// ─────────────────────────────────────────────
// ÉTAPE 5 — Engagement
// ─────────────────────────────────────────────
function Step5({
  errors,
  watch,
  setValue,
  isSubmitting,
  submitError,
}: StepProps & { isSubmitting: boolean; submitError: string | null }) {
  const conditionsAcceptees = watch("conditionsAcceptees");
  const presenceConfirmee = watch("presenceConfirmee");

  return (
    <div className="space-y-6">
      <StepTitle>Confirmation & Engagement</StepTitle>

      <div className="bg-orange/10 border border-orange/30 rounded-xl p-4 text-sm text-slate-300 leading-relaxed">
        <p className="text-orange font-semibold mb-2">Rappel important :</p>
        <ul className="space-y-1 list-disc list-inside text-xs text-muted">
          <li>Places limitées à <strong className="text-white">10 participants maximum</strong></li>
          <li>Présence obligatoire aux <strong className="text-white">3 jours</strong> de formation</li>
          <li>Dates : Jeudi 16, Vendredi 17, Samedi 18 Avril 2026 à partir de 9h00</li>
          <li>Formation 100% gratuite (attestation optionnelle : 5 000 FCFA)</li>
        </ul>
      </div>

      <div className="space-y-4">
        <Checkbox
          id="conditionsAcceptees"
          checked={!!conditionsAcceptees}
          onChange={(v) => setValue("conditionsAcceptees", v as true)}
          error={errors.conditionsAcceptees?.message}
          label={
            <span>
              Je confirme avoir pris connaissance des conditions de la formation
              (places limitées à 10, présence obligatoire aux{" "}
              <strong className="text-white">3 jours</strong>).
            </span>
          }
        />

        <Checkbox
          id="presenceConfirmee"
          checked={!!presenceConfirmee}
          onChange={(v) => setValue("presenceConfirmee", v as true)}
          error={errors.presenceConfirmee?.message}
          label={
            <span>
              Je m'engage à être présent(e) aux{" "}
              <strong className="text-white">3 jours de formation</strong> (16,
              17 et 18 Avril 2026).
            </span>
          }
        />
      </div>

      {submitError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/10 border border-red-400/40 rounded-xl p-4 text-red-400 text-sm"
        >
          {submitError}
        </motion.div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-4 rounded-xl font-bold text-base transition-all duration-200
          ${
            isSubmitting
              ? "bg-orange/50 text-navy/60 cursor-not-allowed"
              : "bg-orange text-navy hover:bg-orange-hover hover:shadow-orange active:scale-[0.98]"
          }
        `}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Envoi en cours...
          </span>
        ) : (
          "Soumettre ma candidature →"
        )}
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────
function StepTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-syne text-xl font-bold text-white mb-6 pb-3 border-b border-orange/20">
      {children}
    </h2>
  );
}

interface StepProps {
  register: any;
  errors: any;
  watch: any;
  setValue: any;
}
