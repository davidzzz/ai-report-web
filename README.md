# AI Report Web

A clean-architecture React + TypeScript frontend for generating and analyzing AI sales reports.

## Tech Stack
- React 18 + TypeScript
- Vite
- Layered architecture (`app`, `pages`, `widgets`, `features`, `shared`)

## API Integration
The app calls real backend endpoints (no mock API):
- `POST /analyze` -> JSON response `{ context, summary, insights }`
- `POST /generate` -> PDF binary response

Payload format used by both endpoints:

```json
{
  "companyName": "Acme Corp",
  "period": "2026-Q1",
  "sales": [
    {
      "date": "2026-03-01",
      "product": "Pro Plan",
      "region": "NA",
      "unitsSold": 120,
      "unitPrice": 49
    }
  ]
}
```

## Getting Started
```bash
npm install
npm run dev
```
