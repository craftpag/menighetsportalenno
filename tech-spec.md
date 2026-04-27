# Menighetsportalen.no - Teknisk spesifikasjon

## Rolle i pooled multi-tenant-arkitekturen

Menighetsportalen.no er **sentralt registrerings- og innloggingspunkt** for hele Designblokk-plattformen. Marketing-sidene fortsetter å være kjernen, men siden får utvidet rolle:

- **`/registrer`** — selvbetjent skjema (kirkenavn → ønsket subdomene → mal + Turnstile). BFF-proxy kaller `Designblokk_admin` `POST /api/v1/registrer`, som provisjonerer Tenant + Cloudflare-DNS automatisk
- **`/registrer/verifiser`** — e-post-bekreftelse (GDPR/spam-vern), poller status, redirecter til `<navn>.menighetsportalen.no/oppsett` med one-time login token (OTL)
- **`/oppsett`** (planlagt — gjeste-wizard) — samler ekstra info før menighet-instansen er klar, brukes som handoff
- **`menighetsportalen.no/kontroll/<slug>/`** — sentralisert admin-tilgang (alternativ til `<slug>.menighetsportalen.no/kontroll/`). Tenant-resolveren i menighet-app støtter begge mønstre

Mål-arkitektur: én pooled Hetzner-app serverer alle menigheter. Se [`../Designblokk_menighet/docs/arkitektur.md`](../Designblokk_menighet/docs/arkitektur.md) og [`../Designblokk_menighet/todo.md`](../Designblokk_menighet/todo.md) Fase B (registreringsflyt).

### Env-variabler for registreringsflyten

| Variabel | Hvor | Default (dev) | Påkrevd i prod |
|---|---|---|---|
| `RESEND_API_KEY` | Server | (mangler → logg til konsoll) | Ja |
| `EMAIL_FROM` | Server | `Menighetsportalen <noreply@menighetsportalen.no>` | Anbefalt |
| `PUBLIC_BASE_URL` | Server | `http://localhost:5173` | Ja (`https://menighetsportalen.no`) |
| `TURNSTILE_SECRET_KEY` | Server | (mangler → hopper over verifisering) | Ja |
| `VITE_TURNSTILE_SITE_KEY` | Frontend (build) | `1x00000000000000000000AA` (test, alltid ok) | Ja |
| `ADMIN_PASSWORD` | Server | `menighet2026` | Ja |

## Arkitektur

### Teknologistack
- **Framework**: React + TypeScript + Vite
- **Styling**: Tailwind CSS 3.4.19
- **UI-komponenter**: shadcn/ui (40+ komponenter forhåndsinstallert)
- **Routing**: React Router DOM v6
- **Animasjoner**: Framer Motion
- **Ikoner**: Lucide React
- **Font**: Google Fonts (Playfair Display, Inter)

### Prosjektstruktur
```
src/
├── components/
│   ├── ui/                    # shadcn/ui komponenter
│   ├── layout/                # Header, Footer, Layout
│   ├── sections/              # Gjenbrukbare seksjoner
│   └── shared/                # Delte komponenter
├── pages/                     # Side-komponenter (9 sider)
├── hooks/                     # Custom hooks
├── lib/                       # Hjelpefunksjoner
├── types/                     # TypeScript typer
├── data/                      # Statisk data (funksjoner, priser, etc.)
└── styles/                    # Globale stiler
```

## Komponenter

### Layout-komponenter
| Komponent | Beskrivelse | Props |
|-----------|-------------|-------|
| `Header` | Sticky header med navigasjon | - |
| `Footer` | Footer med lenker og info | - |
| `Layout` | Wrapper med Header + Footer + main | children |
| `Container` | Max-width container | children, className |
| `Section` | Padding-wrapper for seksjoner | children, className, id |

### UI-komponenter (fra shadcn/ui)
- Button (primær, sekundær, ghost varianter)
- Card, CardHeader, CardTitle, CardContent
- Input, Textarea, Label
- Select, Checkbox
- Accordion (for FAQ)
- Sheet (for mobil meny)
- Badge
- Separator
- Tabs (for mal-visning)

### Seksjonskomponenter
| Komponent | Beskrivelse | Brukes på |
|-----------|-------------|-----------|
| `HeroSection` | Hero med tekst + bilde | Forsiden |
| `SocialProof` | Logo-stripe | Forsiden |
| `ProblemSection` | 3 problem-kort | Forsiden |
| `FeaturesGrid` | 24 funksjonskort | Forsiden, Funksjoner |
| `TemplatePreview` | Mal-kort med bilde | Forsiden, Maler |
| `PricingCard` | Pris-visning | Forsiden, Priser |
| `Testimonials` | Sitat-kort | Forsiden |
| `CTASection` | Call-to-action | Forsiden, flere sider |
| `ComparisonTable` | Sammenligningstabell | Funksjoner |
| `RoadmapTimeline` | Tidslinje | Veikart |
| `ContactForm` | Kontaktskjema | Prøv gratis, Kontakt |
| `TemplateBrowser` | iframe-visning | Maler |
| `CustomerGrid` | Kundekort | Kunder |
| `FAQAccordion` | FAQ-seksjon | Priser |

## Sider

### 1. Forsiden (/)
**Komponenter:**
- Header
- HeroSection
- SocialProof
- ProblemSection
- FeaturesGrid (24 kort)
- TemplatePreview (3 maler)
- PricingCard (forenklet)
- Testimonials
- CTASection
- Footer

**Data:**
- features.ts - 24 funksjoner med ikoner
- templates.ts - 3 maler med info
- testimonials.ts - 3 sitater

### 2. Maler (/maler)
**Komponenter:**
- Header
- Hero (enkel)
- TemplateBrowser (3 maler med iframe)
- CustomTemplates (info)
- ComingSoon (teaser)
- CTASection
- Footer

**Data:**
- templates.ts - utvidet med farger, fonter, egenskaper

### 3. Funksjoner (/funksjoner)
**Komponenter:**
- Header
- Hero
- FeaturesGrid (kategorisert)
- ComparisonTable
- CTASection
- Footer

**Data:**
- features.ts - gruppert i kategorier
- comparison.ts - sammenligningsdata

### 4. Priser (/priser)
**Komponenter:**
- Header
- Hero
- PricingCard (full)
- AddOns (tilleggstjenester)
- FAQAccordion
- CTASection
- Footer

**Data:**
- pricing.ts - priser og inkludert
- faq.ts - FAQ-spørsmål

### 5. Kunder (/kunder)
**Komponenter:**
- Header
- Hero
- CustomerGrid
- CaseStudies
- NorwayMap
- CTASection
- Footer

**Data:**
- customers.ts - menigheter med info

### 6. Veikart (/veikart)
**Komponenter:**
- Header
- Hero
- RoadmapTimeline
- SuggestionForm
- Footer

**Data:**
- roadmap.ts - tidslinje-elementer

### 7. Prøv gratis (/prov-gratis)
**Komponenter:**
- Header
- Hero
- TrialForm (skjema) + InfoPanel
- Footer

**Data:**
- Form data (lokal state)

### 8. Om oss (/om-oss)
**Komponenter:**
- Header
- Hero
- StorySection
- TeamGrid
- ValuesSection
- Footer

**Data:**
- team.ts - teammedlemmer

### 9. Kontakt (/kontakt)
**Komponenter:**
- Header
- ContactInfo
- ContactForm
- CTASection
- Footer

## Routing

```tsx
// App.tsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/maler" element={<TemplatesPage />} />
    <Route path="/funksjoner" element={<FeaturesPage />} />
    <Route path="/priser" element={<PricingPage />} />
    <Route path="/kunder" element={<CustomersPage />} />
    <Route path="/veikart" element={<RoadmapPage />} />
    <Route path="/prov-gratis" element={<TrialPage />} />
    <Route path="/om-oss" element={<AboutPage />} />
    <Route path="/kontakt" element={<ContactPage />} />
  </Routes>
</BrowserRouter>
```

## Animasjoner (Framer Motion)

### Reusable animation variants
```tsx
// fadeInUp
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  }
}

// staggerContainer
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

// scaleIn
const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  }
}
```

### Scroll-triggered animations
Bruk `whileInView` med `viewport={{ once: true, margin: "-20%" }}`

## Farger (Tailwind config)

```js
colors: {
  primary: {
    DEFAULT: '#2D5A4A',
    light: '#3D7A64',
    dark: '#1F3D32',
  },
  secondary: {
    DEFAULT: '#C17F59',
    light: '#D49A7A',
    dark: '#9A6543',
  },
  background: '#FAF9F7',
  surface: '#FFFFFF',
  border: '#E5E2DD',
  'border-light': '#F0EDE8',
}
```

## Font (Tailwind config)

```js
fontFamily: {
  serif: ['Playfair Display', 'serif'],
  sans: ['Inter', 'sans-serif'],
}
```

## Avhengigheter

```bash
# Routing
npm install react-router-dom

# Animasjoner
npm install framer-motion

# Ikoner (allerede installert via shadcn)
# lucide-react

# Font (via Google Fonts i index.html)
# Playfair Display + Inter
```

## Responsivitet

**Breakpoints:**
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px

**Mobile-first:**
- Base styles for mobil
- md: Tablet
- lg: Desktop
- xl: Large desktop

## WCAG 2.2 AA Krav

- Kontrast: Minst 4.5:1 for normal tekst
- Fokus-indikatorer: Synlige og tydelige
- Reduced motion: Respekterer prefers-reduced-motion
- Semantisk HTML: Korrekt bruk av headings, landmarks
- Alt-tekst: For alle bilder
- Tastaturnavigasjon: Alt kan nås med tastatur

## Bildeoptimalisering

- Format: WebP med JPEG fallback
- Størrelser: Responsive srcset
- Lazy loading: For bilder under fold
- Aspect ratio: Definert for å unngå CLS
