# Blakstad Naturbarnehage

Hugo static site for Blakstad Naturbarnehage, a nature kindergarten in Tusvik, Sykkylven, Norway.

Live site: [pyrat.github.io/blakstadbhg](https://pyrat.github.io/blakstadbhg/)

## Tech stack

- [Hugo](https://gohugo.io/) — static site generator
- [Tailwind CSS v3](https://tailwindcss.com/) — utility-first styling via PostCSS
- [Alpine.js](https://alpinejs.dev/) — lightweight JS for nav, accordions, form state
- GitHub Actions — automatic build and deploy to GitHub Pages

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, stats, features, nature teaser, CTA |
| `/om/` | About the kindergarten — departments, facilities, staff |
| `/natur/` | Nature kindergarten — philosophy, daily routine, activities |
| `/mat/` | Healthy food — vegetable garden, food culture |
| `/tradisjonar/` | Traditions — Lucia, Science Days, seasonal events |
| `/dokument/` | Documents — activity plans, annual plans, links |
| `/kontakt/` | Contact — director, address, map |
| `/campaign/pamelding/` | Enrollment campaign landing page with waitlist form |
| `/en/...` | All pages in English |

## Local development

```bash
# Install Node dependencies (Tailwind, PostCSS, etc.)
npm install

# Start Hugo dev server (hot reload)
hugo server --buildDrafts
```

Site is available at `http://localhost:1313`.

## Build

```bash
hugo --minify
```

Output goes to `public/`. This directory is excluded from git — GitHub Actions builds it fresh on every deploy.

## Deployment

Pushes to `main` trigger the GitHub Actions workflow at `.github/workflows/deploy.yml`, which:

1. Installs Node 20 and Hugo 0.145.0 extended
2. Runs `npm ci` to install Tailwind/PostCSS
3. Runs `hugo --minify`
4. Publishes `public/` to GitHub Pages

No manual steps needed after the initial setup.

## Content

All content lives in `content/` (Norwegian/Nynorsk) and `content-en/` (English). Pages use Markdown with TOML front matter. The site uses Hugo's built-in i18n — string translations are in `i18n/nb.toml` and `i18n/en.toml`.

To edit a page, open the corresponding `.md` file and edit the Markdown body. The front matter `title` and `description` fields are also used in the page header and meta tags.

## Adding a custom domain

1. Buy a domain and point it to GitHub Pages ([instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site))
2. Create `static/CNAME` containing just your domain (e.g. `blakstadbhg.no`)
3. Update `baseURL` in `hugo.toml` to your domain
4. Push — GitHub Actions will redeploy automatically
