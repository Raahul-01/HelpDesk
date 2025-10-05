# HelpDesk System

A modern, cyberpunk-inspired Help Desk platform built with Next.js, TypeScript, Tailwind CSS, and Supabase. Includes AI-friendly UX, real-time SLA monitoring, rich ticket management, and a terminal-themed landing experience.

## Features
- AI-powered ticket routing and automation
- Real-time SLA monitoring and breach detection
- Ticket creation, details, comments, history timeline
- Filters, pagination, and dashboard views
- Terminal-style hero and ASCII feature grid
- Supabase-backed auth and data access

## Tech Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Supabase (client and server SDKs)
- Lucide React icons

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm or npm
- Supabase project and keys

### Environment Variables
Create a `.env.local` in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Install and Run
```bash
# install
pnpm install

# dev
pnpm dev

# build
pnpm build
pnpm start
```


Apply these via Supabase SQL editor or your preferred Postgres client.

## Project Structure
```
app/
  api/
    sla/
      check-breaches/route.ts
      stats/route.ts
    tickets/
      [id]/
        comments/route.ts
        history/route.ts
        route.ts
      route.ts
  tickets/
    [id]/page.tsx
    new/page.tsx
    page.tsx
  page.tsx
components/
  cyberpunk-header.tsx
  cyberpunk-logo.tsx
  new-ticket-form.tsx
  sla-dashboard.tsx
  ticket-*.tsx (card, details, header, timeline, comments)
  tickets-*.tsx (filters, list, pagination)
  ui/* (shared UI primitives)
lib/
  auth.ts, sla.ts, supabase/*, types.ts, utils.ts
```

## Pages and Screenshots
Add screenshots to `public/` and update the paths below. Suggested naming: `screenshot-*.png`.

### Landing (terminal-style)
File: `app/page.tsx`
- Terminal header: `helpdesk@terminal:~$`
- Commands demo: `cat welcome.txt`, `./features --list`, `./launch --interactive`
- ASCII “HELP DESK SYSTEM FEATURES” grid

Screenshot placeholder:
```text
public/screenshot-landing.png
```

### Tickets Dashboard
File: `app/tickets/page.tsx`
- List with filters, pagination, and cards

Screenshot placeholder:
```text
public/screenshot-tickets.png
```

### New Ticket
File: `app/tickets/new/page.tsx`
- Form to create a ticket

Screenshot placeholder:
```text
public/screenshot-new-ticket.png
```

### Ticket Details
File: `app/tickets/[id]/page.tsx`
- Details panel, comments, timeline/history

Screenshot placeholder:
```text
public/screenshot-ticket-details.png
```

## Terminal View (Hero) Screenshot
From `app/page.tsx`, capture the terminal content area showing:
- `helpdesk@terminal:~$`
- `cat welcome.txt` output
- `./features --list` output
- `./launch --interactive` call and action buttons

Screenshot placeholder:
```text
public/screenshot-terminal.png
```

## API Routes
- `GET /api/sla/stats` — SLA statistics
- `POST /api/sla/check-breaches` — Recalculate/scan breaches
- `GET /api/tickets` — List tickets
- `POST /api/tickets` — Create ticket
- `GET /api/tickets/[id]` — Get ticket
- `GET /api/tickets/[id]/comments` — List comments
- `POST /api/tickets/[id]/comments` — Add comment
- `GET /api/tickets/[id]/history` — Ticket history

Implementation is in `app/api/...`.

## Scripts
- `scripts/01-create-tables.sql` — Core tables
- `scripts/02-seed-data.sql` — Seed sample data
- `scripts/03-update-sla-breaches.sql` — SLA breach tracking

## Development Notes
- UI components live under `components/` with a `ui/` subfolder for primitives
- Supabase client helpers in `lib/supabase`
- Types and utilities in `lib/types.ts` and `lib/utils.ts`

## Screenshots: How To Capture
1. Run `pnpm dev` and navigate to each page.
2. Use your OS screenshot tool to capture the full viewport for each page.
3. Save images in `public/` using the placeholders above.
4. Update this README to link images using markdown:

```markdown
![Landing](public/screenshot-landing.png)
![Terminal](public/screenshot-terminal.png)
![Tickets](public/screenshot-tickets.png)
![New Ticket](public/screenshot-new-ticket.png)
![Ticket Details](public/screenshot-ticket-details.png)
```

## License
MIT


