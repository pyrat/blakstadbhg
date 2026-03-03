# AGENTS.md — Blakstad Naturbarnehage

## Project Overview

Hugo static site (v0.145.0 extended) for a bilingual Norwegian nature kindergarten.
Tailwind CSS v3 via PostCSS for styling. Alpine.js v3 (CDN) for interactivity.
No TypeScript, no JS framework — pure Hugo Go templates + Markdown content.

## Build / Dev / Deploy Commands

```bash
# Install dependencies (required before first build)
npm ci

# Development server (drafts enabled, live reload)
npm run dev
# Equivalent: hugo server --buildDrafts --disableFastRender

# Production build
npm run build
# Equivalent: hugo --minify

# CSS-only watch (rarely needed; Hugo Pipes handles this)
npm run css:watch

# CSS production build
npm run css:build
```

There are **no tests** in this project. There is no linter or formatter configured.
Validation is done by running `npm run build` and confirming it completes without errors.

### CI/CD

GitHub Actions (`.github/workflows/deploy.yml`) runs on push to `main`:
1. `npm ci` — install Node dependencies
2. `hugo --minify` — build the site
3. Deploy to GitHub Pages at `pyrat.github.io/blakstadbhg`

## Project Structure

```
archetypes/          # Hugo content templates (default.md)
assets/css/          # Tailwind entry point (main.css), processed via Hugo Pipes
config/_default/     # Menu definitions per language (menus.nb.toml, menus.en.toml)
content/             # Norwegian (nb) Markdown content — default language
content-en/          # English (en) Markdown content
i18n/                # Translation strings (nb.toml, en.toml)
layouts/
  _default/          # baseof.html, single.html, list.html, section-page.html
  campaign/          # single.html — enrollment/waitlist landing page
  kontakt/           # list.html — contact page with form
  partials/          # header.html, footer.html
  index.html         # Homepage template
static/img/          # Static assets (favicon)
hugo.toml            # Main Hugo config
tailwind.config.js   # Tailwind config with custom theme
postcss.config.js    # PostCSS config (tailwindcss + autoprefixer)
package.json         # Node deps (all devDependencies)
```

## Code Style Guidelines

### Hugo Templates (Go Templates in HTML)

- **Block structure**: Base layout in `baseof.html` defines `{{ block "main" . }}`.
  Page templates use `{{ define "main" }}...{{ end }}`.
- **Partials**: Shared components live in `layouts/partials/` and are included
  with `{{ partial "header.html" . }}`. Always pass the context dot.
- **Section comments**: Major page sections are delimited with decorated comments:
  ```
  {{/* ═══════════════════════════════════════════════
       SECTION NAME
  ═══════════════════════════════════════════════ */}}
  ```
- **Data-driven content**: Use Hugo `slice`/`dict` for repeated structures
  (feature cards, activity lists, FAQ items) instead of duplicating HTML.
- **Custom layouts**: Pages can opt into `section-page.html` via front matter
  `layout: "section-page"`. Section-specific templates go in `layouts/<section>/`.

### Bilingual / i18n Patterns

- **Default language**: Norwegian Nynorsk (`nb`), content in `content/`
- **English**: content in `content-en/`
- **Inline language switching** (preferred for longer text blocks):
  ```
  {{ if eq .Site.Language.Lang "nb" }}Norwegian text{{ else }}English text{{ end }}
  ```
- **Translation keys** (preferred for short UI strings):
  ```
  {{ i18n "key_name" }}
  ```
  Keys defined in `i18n/nb.toml` and `i18n/en.toml` using:
  ```toml
  [key_name]
  other = "Translated string"
  ```
- **Localized URLs**: Always use `{{ "/path/" | relLangURL }}` for internal links.
- **Language switcher**: Built from `{{ .AllTranslations }}` in header partial.
- **Content mirroring**: Every file in `content/` should have a corresponding
  file in `content-en/` with the same path and filename.

### Tailwind CSS & Styling

- **Entry point**: `assets/css/main.css` — processed via Hugo Pipes + PostCSS.
- **Custom color tokens** (defined in `tailwind.config.js`):
  - `forest-*` (50–950): primary green palette
  - `sand-*` (50–900): warm tan/beige palette
  - `moss-*` (400–600): olive green accent
- **Fonts**: Inter (sans-serif, via `font-sans`) and Lora (serif, via `font-serif`).
  Headings (h1–h3) use `font-serif`. Body text uses `font-sans`.
- **Component classes** (defined in `@layer components` in main.css):
  - `btn-primary`, `btn-secondary`, `btn-white` — button styles
  - `card` — card container with rounded corners and shadow
  - `section-label` — small uppercase tracking-wide label
  - `section-title` — large serif heading
  - `section-body` — paragraph text
  - `nav-link`, `nav-link-active` — navigation link styles
- **Responsive breakpoints**: Mobile-first. Key breakpoints: `sm:`, `md:`, `lg:`.
  Mobile menu appears below `lg:`.
- **Max-width containers**: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` for full-width
  sections, `max-w-4xl` for prose/article content.
- **Prose styling**: Use Tailwind Typography plugin (`prose prose-lg`) with
  forest-themed overrides for headings, links, markers, blockquotes.

### Content (Markdown)

- **Front matter format**: TOML (delimited by `+++`)
- **Required front matter fields**: `title`, `description`
- **Optional front matter fields**: `draft`, `layout`, `label`, `menu`
- **Content language**: Norwegian pages in Nynorsk dialect (not Bokmal).
  English pages should use clear, simple English.

### Alpine.js Patterns

- Alpine `x-data` is used on `<html>` (baseof) and `<header>` elements.
- Scroll-aware header: `x-init` listens for scroll events, toggles `scrolled` state.
- Mobile menu: `mobileOpen` boolean with `x-show` + CSS transitions.
- Form submit state: `x-data="{ submitted: false }"` with `x-show` toggling.
- FAQ accordions: `x-data="{ open: null }"` with click-to-toggle pattern.

### Icons

- All icons are inline SVGs (Heroicons-style, 24x24 viewBox).
- Use `stroke="currentColor"` and `fill="none"` for outline icons.
- Use `fill="currentColor"` for solid icons (social media icons).
- Standard classes: `w-5 h-5` or `w-6 h-6` for regular icons, `w-4 h-4` for small.

### Naming Conventions

- **Files/directories**: lowercase, hyphenated (e.g., `section-page.html`)
- **i18n keys**: snake_case (e.g., `hero_cta_primary`, `nav_enroll`)
- **CSS component classes**: kebab-case (e.g., `btn-primary`, `section-label`)
- **Hugo params**: camelCase in `hugo.toml` (e.g., `contactName`, `contactTitle`)
- **Alpine.js variables**: camelCase (e.g., `mobileOpen`, `scrolled`)

### Error Handling

- Hugo build errors are the primary feedback mechanism. Run `npm run build` to validate.
- Use `{{ with .Param }}` instead of `{{ if .Param }}` to both check existence and
  scope the value for cleaner templates.
- Always provide fallback values for optional params:
  ```
  {{ with .Description }}{{ . }}{{ else }}{{ .Site.Params.description }}{{ end }}
  ```

### Git & Deployment

- Deploy target: GitHub Pages (automatic on push to `main`)
- `.gitignore` excludes: `public/`, `resources/`, `node_modules/`, editor files
- Hugo build output goes to `public/` (not committed)
- `hugo_stats.json` IS committed (used by Tailwind for CSS purging via Hugo build stats)
