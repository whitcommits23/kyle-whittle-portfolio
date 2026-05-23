# CLAUDE.md

**Before doing any work for Kyle:** read `SHARED-AI/ABOUT ME/` for context on who he is, how he writes, and what he cares about. That folder is the single source of truth across all projects.

## What's here

A personal portfolio site for Kyle Whittle — ops leader at a mid-market SaaS company. Audience is professional: hiring managers, peers, and collaborators who want to understand how he thinks and what he ships.

| File | Purpose |
|---|---|
| `index.html` | Homepage |
| `about.html` | About page |
| `portfolio.html` | Portfolio / work samples |
| `resume.html` | Resume |
| `contact.html` | Contact form |
| `thankyou.html` | Post-contact confirmation |
| `css/` | Stylesheets |
| `js/` | Scripts |
| `images/` | Image assets |
| `files/` | Downloadable files (e.g. resume PDF) |

## Deployment

Static site. Update this section with your deploy target (GitHub Pages, Netlify, etc.) and custom domain once confirmed.

## Running

Open files directly in a browser — no build step:

```
open index.html
```

## Shared files setup

`SHARED-AI/` is a **symlink** pointing to `~/Claude Cowork/` on Kyle's Mac. The real files (`about-me.md`, `anti-ai-writing-style.md`, `my-company.md`) live there and are shared with the coaching site repo.

**To recreate the symlink on a new machine:**
```
ln -s ~/Claude\ Cowork ~/portfolio-site/SHARED-AI
```

Add `SHARED-AI` to `.gitignore` — the symlink should not be committed.

## Conventions

- Pure HTML/CSS, no build step
- Single-file pages — each page is self-contained
- No external CDN links — must work fully offline
- CSS variables at `:root` for all colors

## Voice and tone

This is a professional site, not a resume. Kyle's writing is direct, specific, and opinionated. No buzzwords. No corporate filler. Every page should sound like a smart person talking — not a LinkedIn post.

Read `SHARED-AI/ABOUT ME/anti-ai-writing-style.md` before writing or editing any copy on this site.
