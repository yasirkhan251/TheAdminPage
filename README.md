# TheAdminPage — Service Admin Dashboard

A responsive admin dashboard starter built with React and Vite for a service-based business. The UI uses Lucide icons and an inline SVG chart.

## Run locally

Requirements: Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Production build

```bash
npm run build
npm run preview
```

## Features

- Responsive dashboard layout with mobile navigation
- Overview cards for revenue, active projects, clients, and outstanding payments
- Revenue trend visualization and project status summary
- Projects table with search, status filtering, inline status updates, and CSV export
- Client directory and service catalog
- Invoice list with paid/pending status controls and invoice creation
- Analytics and workspace preference screens
- Project creation modal that adds projects to the dashboard

## Important

This is a front-end starter and uses demo/sample data. Changes live in React state and reset when the page is refreshed. There is no real authentication, database, payment processing, or backend API connected yet. Before production use, connect a backend and persistent database, add authentication/authorization, validate data on the server, and replace all sample records with real business data.

The revenue chart is illustrative, not a record of actual historical revenue.
