"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Send,
  Loader2,
  Check,
  AlertTriangle,
} from "lucide-react";
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
    x: direction > 0 ? 48 : -48,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -48 : 48,
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
    reset,
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
    // Scroll to top of form card on mobile
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goPrev = () => {
    setDirection(-1);
    setStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch {
      setSubmitError("Erreur réseau. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setIsSuccess(false);
    setDirection(1);
    setFormData({});
    setSubmitError(null);
    reset({
      nom: "",
      prenom: "",
      sexe: undefined,
      whatsapp: "",
      email: "",
      ville: "",
      statut: undefined,
      domaine: "",
      niveauEtudes: undefined,
      modules: [],
      source: undefined,
      motivation: "",
      attentes: "",
      attestation: undefined,
      conditionsAcceptees: undefined,
      presenceConfirmee: undefined,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isSuccess) {
    return (
      <SuccessScreen
        name={`${watchedValues.prenom || formData.prenom || ""}`}
        onReset={handleReset}
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

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: "easeInOut" }}
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

        {/* ── Navigation ── */}
        <div className="flex flex-col xs:flex-row gap-3 mt-7 sm:mt-8">
          {step > 1 && (
            <button
              type="button"
              onClick={goPrev}
              className="
                xs:w-auto px-5 xs:px-6 py-3 rounded-xl
                inline-flex items-center justify-center gap-2
                border border-orange/30 text-orange font-semibold text-sm
                transition-all duration-200 hover:bg-orange/10
                active:bg-orange/20
              "
            >
              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
              Précédent
            </button>
          )}
          {step < TOTAL_STEPS && (
            <button
              type="button"
              onClick={goNext}
              className="
                flex-1 px-6 py-3 rounded-xl
                inline-flex items-center justify-center gap-2
                bg-orange text-navy font-bold text-sm
                transition-all duration-200
                hover:bg-orange-hover hover:shadow-orange
                active:scale-[0.98]
              "
            >
              Suivant
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   ÉTAPE 1 — Informations personnelles
───────────────────────────────────────────────── */
function Step1({ register, errors, watch, setValue }: StepProps) {
  const sexe = watch("sexe");
  return (
    <div className="space-y-4 sm:space-y-5">
      <StepTitle>Informations personnelles</StepTitle>

      <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 sm:gap-5">
        <FieldWrapper error={errors.nom?.message}>
          <Label htmlFor="nom" required>Nom</Label>
          <Input
            id="nom"
            placeholder="Ex : KOFFI"
            error={!!errors.nom}
            {...register("nom")}
          />
        </FieldWrapper>
        <FieldWrapper error={errors.prenom?.message}>
          <Label htmlFor="prenom" required>Prénom(s)</Label>
          <Input
            id="prenom"
            placeholder="Ex : Ama Céleste"
            error={!!errors.prenom}
            {...register("prenom")}
          />
        </FieldWrapper>
      </div>

      <FieldWrapper error={errors.sexe?.message}>
        <Label required>Sexe</Label>
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
          inputMode="tel"
          placeholder="Ex : +229 01 XX XX XX XX"
          error={!!errors.whatsapp}
          {...register("whatsapp")}
        />
      </FieldWrapper>

      <FieldWrapper error={errors.email?.message}>
        <Label htmlFor="email" required>Adresse e-mail</Label>
        <Input
          id="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="votre@email.com"
          error={!!errors.email}
          {...register("email")}
        />
      </FieldWrapper>

      <FieldWrapper error={errors.ville?.message}>
        <Label htmlFor="ville" required>Ville de résidence</Label>
        <Input
          id="ville"
          placeholder="Ex : Cotonou, Parakou..."
          error={!!errors.ville}
          {...register("ville")}
        />
      </FieldWrapper>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   ÉTAPE 2 — Profil professionnel
───────────────────────────────────────────────── */
function Step2({ register, errors, watch, setValue }: StepProps) {
  const statut = watch("statut");
  const niveauEtudes = watch("niveauEtudes");

  return (
    <div className="space-y-4 sm:space-y-5">
      <StepTitle>Profil professionnel</StepTitle>

      <FieldWrapper error={errors.statut?.message}>
        <Label required>Statut actuel</Label>
        <RadioGroup
          name="statut"
          options={[...STATUTS]}
          value={statut || ""}
          onChange={(v) => setValue("statut", v as typeof STATUTS[number])}
          error={errors.statut?.message}
        />
      </FieldWrapper>

      <FieldWrapper error={errors.domaine?.message}>
        <Label htmlFor="domaine" required>
          Domaine d'études / secteur d'activité
        </Label>
        <Input
          id="domaine"
          placeholder="Ex : Comptabilité, Finance, Informatique..."
          error={!!errors.domaine}
          {...register("domaine")}
        />
      </FieldWrapper>

      <FieldWrapper error={errors.niveauEtudes?.message}>
        <Label required>Niveau d'études</Label>
        <div className="flex flex-wrap gap-2">
          {NIVEAUX.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setValue("niveauEtudes", n)}
              className={`
                px-3 xs:px-4 py-2 rounded-lg border
                text-xs xs:text-sm font-medium
                transition-all duration-200
                min-h-[40px] xs:min-h-[44px]
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
          <p className="text-red-400 text-xs mt-1">
            {errors.niveauEtudes.message}
          </p>
        )}
      </FieldWrapper>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   ÉTAPE 3 — Modules
───────────────────────────────────────────────── */
function Step3({ errors, watch, setValue }: StepProps) {
  const selectedModules = watch("modules") || [];
  const source = watch("source");

  const toggleModule = (mod: string) => {
    const current = selectedModules || [];
    const updated = current.includes(mod)
      ? current.filter((m: string) => m !== mod)
      : [...current, mod];
    setValue("modules", updated);
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      <StepTitle>Choix des modules</StepTitle>

      <div>
        <Label required>Modules souhaités</Label>
        <p className="text-muted text-xs mb-3">
          Sélectionnez au moins un module
        </p>
        <div className="space-y-2.5 sm:space-y-3">
          {MODULES.map((mod) => {
            const isSelected = selectedModules.includes(mod);
            return (
              <motion.button
                key={mod}
                type="button"
                onClick={() => toggleModule(mod)}
                whileTap={{ scale: 0.99 }}
                className={`
                  w-full text-left p-3 xs:p-4 rounded-xl border
                  transition-all duration-200 min-h-[56px]
                  ${
                    isSelected
                      ? "border-orange bg-orange/10"
                      : "border-orange/20 hover:border-orange/40 active:border-orange/50"
                  }
                `}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`
                      mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0
                      transition-colors
                      ${isSelected ? "bg-orange border-orange" : "border-muted/50"}
                    `}
                    aria-hidden="true"
                  >
                    {isSelected && (
                      <Check className="w-3 h-3 text-navy" strokeWidth={3} aria-hidden="true" />
                    )}
                  </div>
                  <span
                    className={`text-xs xs:text-sm font-medium leading-snug ${
                      isSelected ? "text-orange" : "text-slate-300"
                    }`}
                  >
                    {mod}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
        {(errors.modules as any)?.message && (
          <p className="text-red-400 text-xs mt-2">
            {(errors.modules as any).message}
          </p>
        )}
      </div>

      <FieldWrapper error={errors.source?.message}>
        <Label required>
          Comment avez-vous connu cette formation ?
        </Label>
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

/* ─────────────────────────────────────────────────
   ÉTAPE 4 — Motivation
───────────────────────────────────────────────── */
function Step4({ register, errors, watch, setValue }: StepProps) {
  const attestation = watch("attestation");
  const motivation = watch("motivation") || "";

  return (
    <div className="space-y-4 sm:space-y-5">
      <StepTitle>Motivation & Attentes</StepTitle>

      <FieldWrapper error={errors.motivation?.message}>
        <Label htmlFor="motivation" required>
          Pourquoi souhaitez-vous participer à cette formation ?
        </Label>
        <div className="relative">
          <Textarea
            id="motivation"
            placeholder="Décrivez votre motivation... (minimum 50 caractères)"
            error={!!errors.motivation}
            {...register("motivation")}
          />
          <span
            className={`
              absolute bottom-3 right-3 text-[10px] xs:text-xs pointer-events-none
              ${motivation.length >= 50 ? "text-green-serma" : "text-muted"}
            `}
          >
            {motivation.length}/50 min
          </span>
        </div>
      </FieldWrapper>

      <FieldWrapper error={errors.attentes?.message}>
        <Label htmlFor="attentes">
          Quelles sont vos attentes concrètes ?{" "}
          <span className="text-muted text-xs">(optionnel)</span>
        </Label>
        <Textarea
          id="attentes"
          placeholder="Ce que vous espérez acquérir, apprendre ou développer..."
          {...register("attentes")}
        />
      </FieldWrapper>

      <FieldWrapper error={errors.attestation?.message}>
        <Label required>
          Souhaitez-vous une attestation ?{" "}
          <span className="text-muted text-xs font-normal">(5 000 FCFA)</span>
        </Label>
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

/* ─────────────────────────────────────────────────
   ÉTAPE 5 — Engagement
───────────────────────────────────────────────── */
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
    <div className="space-y-5 sm:space-y-6">
      <StepTitle>Confirmation & Engagement</StepTitle>

      {/* Reminder box */}
      <div className="bg-orange/10 border border-orange/30 rounded-xl p-3 xs:p-4">
        <p className="text-orange text-xs xs:text-sm font-semibold mb-2">
          Rappel important :
        </p>
        <ul className="space-y-1 list-disc list-inside text-[11px] xs:text-xs text-muted">
          <li>
            Places limitées à{" "}
            <strong className="text-white">10 participants maximum</strong>
          </li>
          <li>
            Présence obligatoire aux{" "}
            <strong className="text-white">3 jours</strong> de formation
          </li>
          <li>
            Dates : Jeudi 16, Vendredi 17, Samedi 18 Avril 2026 — dès 9h00
          </li>
          <li>
            Formation 100% gratuite (attestation opt. : 5 000 FCFA)
          </li>
        </ul>
      </div>

      <div className="space-y-3 xs:space-y-4">
        <Checkbox
          id="conditionsAcceptees"
          checked={!!conditionsAcceptees}
          onChange={(v) => setValue("conditionsAcceptees", v as true)}
          error={errors.conditionsAcceptees?.message}
          label={
            <span>
              Je confirme avoir pris connaissance des conditions (places
              limitées à 10, présence obligatoire aux{" "}
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
              <strong className="text-white">
                3 jours de formation
              </strong>{" "}
              (16, 17 et 18 Avril 2026).
            </span>
          }
        />
      </div>

      {submitError && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/10 border border-red-400/40 rounded-xl p-3 xs:p-4 text-red-400 text-xs xs:text-sm flex items-start gap-2"
        >
          <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-px" aria-hidden="true" />
          {submitError}
        </motion.div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={`
          w-full py-3.5 xs:py-4 rounded-xl font-bold text-sm xs:text-base
          inline-flex items-center justify-center gap-2
          transition-all duration-200
          ${
            isSubmitting
              ? "bg-orange/50 text-navy/60 cursor-not-allowed"
              : "bg-orange text-navy hover:bg-orange-hover hover:shadow-orange active:scale-[0.98]"
          }
        `}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 xs:h-5 xs:w-5 animate-spin" aria-hidden="true" />
            Envoi en cours...
          </>
        ) : (
          <>
            Soumettre ma candidature
            <Send className="h-4 w-4 xs:h-5 xs:w-5" aria-hidden="true" />
          </>
        )}
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   Helpers
───────────────────────────────────────────────── */
function StepTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-syne text-lg xs:text-xl font-bold text-white mb-5 sm:mb-6 pb-3 border-b border-orange/20">
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
