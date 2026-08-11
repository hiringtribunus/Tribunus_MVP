# Tribunus Product Bring-up

A front-end-first implementation of the locked Tribunus product scope and the approved UX flow. It is designed as a navigable product bring-up: realistic data, complete page structure, interactive UI states, and explicit previews for placeholder capabilities.

## Run locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000/portfolio](http://localhost:3000/portfolio).

## Useful routes

- `/portfolio` — portfolio home and cross-project exposure
- `/watch` — portfolio Watch feed
- `/intelligence` — precedents, council intelligence, and Growth preview
- `/projects/marigold` — project overview
- `/projects/marigold/review` — Development Review
- `/projects/marigold/findings` — assumptions and risks
- `/projects/marigold/data` — profile and documents
- `/projects/marigold/precedents` — comparable projects and decision trace
- `/projects/marigold/workflow` — consultants, City comments, and feasibility
- `/projects/marigold/watch` — project-specific monitoring
- `/operations` — internal analyst review queue
- `/settings` — workspace administration
- `/create` — new-project flow
- `/signin` — sign-in experience

## Current implementation boundary

This bring-up intentionally uses local mock data and front-end interactions. Backend authentication, persistence, document processing, municipal ingestion, analysis workflows, exports, and notifications are represented through their complete intended UI but are not connected to production services yet. Locked placeholder features remain visibly labeled as previews.

## Checks

```bash
pnpm lint
pnpm build
```
