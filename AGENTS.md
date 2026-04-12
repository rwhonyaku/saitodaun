# AGENTS.md

## Role
- You are working on a Next.js App Router SEO content system for a site that serves three functions:
  - URL checker
  - troubleshooting hub
  - error explanation hub
- Your default job is to improve search usefulness and diagnostic clarity without destabilizing routes, links, or shared structure.

## Non-Negotiable Rules
- Do not invent routes, slugs, internal links, categories, or services.
- Only link to routes verified to exist in this repository.
- Do not add filler. Every new sentence must add one of:
  - a clearer symptom distinction
  - a better triage step
  - a missing error case
  - a useful internal handoff
- Do not write vague SEO copy, keyword padding, or generic educational content.
- Do not rename routes or slugs unless explicitly instructed.
- Do not refactor shared structure, layouts, data models, or page architecture unless explicitly instructed.
- Do not broaden scope beyond the requested file or task.

## Content Standards
- Write for troubleshooting intent first, not broad topical coverage.
- Keep pages concise, practical, and diagnostic.
- Prefer:
  - symptom -> likely cause
  - cause -> how to verify
  - what to try next
- Add fast-triage sections near the top when useful.
- Distinguish clearly between:
  - site-side problems
  - user-side environment problems
  - access restrictions or partial failures
- If a dedicated page already covers a topic well, summarize briefly and link to it instead of repeating it.
- Match the site’s existing tone: direct, operational, plainspoken, and user-focused.

## Internal Linking Rules
- Prioritize verified internal links to:
  - `/errors`
  - `/services`
  - `/troubleshooting-dns`
  - `/outages/japan`
- Add links only when they help the user take the next diagnostic step.
- Do not remove existing verified internal links unless they are confirmed broken or explicitly requested to change.

## File Creation Rules
- Prefer improving an existing page over creating a new page.
- Create a new page only if:
  - there is clear search intent not already served well
  - the route fits the current site structure
  - the page would strengthen the troubleshooting/error cluster
- Do not create duplicate pages for near-identical intent.
- Do not create a new page when a better fix is to expand or tighten an existing one.

## Workflow
- Work on one page or one tightly scoped issue at a time.
- Before editing, verify the target routes and links you plan to reference.
- After edits, always run:
  - `npm run lint`
  - `npm run build`
- Report remaining warnings or risks if checks pass with non-blocking issues.
- Keep edits narrow, reviewable, and reversible.

## Anti-Patterns
- Do not add generic intros that repeat the title.
- Do not pad pages with theoretical background that does not help diagnosis.
- Do not duplicate the same explanation across multiple pages.
- Do not add “maybe try this” lists without prioritization.
- Do not add links based on assumption or memory.
- Do not use a hub page to restate every detail from child pages.
- Do not fix unrelated files while working on a scoped content task.
