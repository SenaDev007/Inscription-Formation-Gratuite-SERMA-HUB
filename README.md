# SERMA HUB Impact Academy — Formulaire d'inscription

Formulaire d'inscription multi-étapes pour la formation gratuite SERMA HUB Impact Academy.

## Stack technique

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Resend** (envoi d'emails)
- **React Hook Form + Zod** (validation)
- **Framer Motion** (animations)

---

## Installation et test en local

### 1. Cloner le dépôt

```bash
git clone https://github.com/senadev007/inscription-formation-gratuite-serma-hub.git
cd inscription-formation-gratuite-serma-hub
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer les variables d'environnement

```bash
cp .env.local.example .env.local
```

Éditez `.env.local` :

```env
RESEND_API_KEY=votre_cle_resend
RESEND_TO_EMAIL=votre@email.com
```

> Obtenez votre clé API sur [resend.com](https://resend.com)

### 4. Lancer en développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000)

---

## Déploiement sur Vercel

### Option A — Via Vercel CLI (recommandé)

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer (première fois)
vercel

# Déploiement en production
vercel --prod
```

Lors du premier déploiement, Vercel vous demandera de configurer les variables d'environnement. Entrez :
- `RESEND_API_KEY` → votre clé Resend
- `RESEND_TO_EMAIL` → l'email de destination

### Option B — Via l'interface Vercel

1. Allez sur [vercel.com](https://vercel.com) → **New Project**
2. Importez ce dépôt GitHub
3. Dans **Environment Variables**, ajoutez :
   - `RESEND_API_KEY`
   - `RESEND_TO_EMAIL`
4. Cliquez sur **Deploy**

### Option C — Connecter GitHub pour CI/CD automatique

1. Poussez ce dépôt sur GitHub
2. Connectez-le à Vercel
3. Chaque push sur `main` déclenchera un déploiement automatique

---

## Configuration des variables sur Vercel (après déploiement)

```bash
vercel env add RESEND_API_KEY production
vercel env add RESEND_TO_EMAIL production
```

Puis redéployez :

```bash
vercel --prod
```

---

## Structure du projet

```
├── app/
│   ├── layout.tsx              # Layout global (fonts Syne + Inter)
│   ├── page.tsx                # Page principale
│   ├── globals.css             # Styles globaux Tailwind
│   └── api/
│       └── inscription/
│           └── route.ts        # API endpoint (Resend)
├── components/
│   ├── MultiStepForm.tsx       # Logique du formulaire multi-étapes
│   ├── StepIndicator.tsx       # Barre de progression
│   ├── FormFields.tsx          # Composants Input, Select, Radio, Checkbox
│   └── SuccessScreen.tsx       # Écran de succès avec confetti
├── lib/
│   ├── validations.ts          # Schémas Zod
│   └── email-template.ts       # Template HTML email
├── .env.local.example
├── vercel.json
└── tailwind.config.ts
```

---

## Formation

| Détail | Info |
|--------|------|
| Dates | Jeudi 16, Vendredi 17, Samedi 18 Avril 2026 |
| Horaire | À partir de 9h00 |
| Frais | 0 FCFA (100% Gratuit) |
| Attestation | 5 000 FCFA (optionnelle) |
| Places | 10 participants maximum par cohorte |
| Lieu | Zongo 2, von AXE BENI CHIC – PRESIDO, à 100 m du carrefour après EPP La SOURCE (direction CEG NIMA, étage à droite) |
| Contact | 01 40 37 71 99 |
