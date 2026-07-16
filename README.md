# JobsNepal.com Frontend

A job portal frontend built with **React 19**, **Vite 8**, and **Tailwind CSS v4** — connecting job seekers and employers in Nepal.

## Pages / Routes

| Route | Page |
|---|---|
| `/` | Home — Hero, Featured Jobs, Categories, Why Choose Us, Top Companies, CTA |
| `/login` | Login with rate-limited auth, sliding overlay toggle |
| `/signup` | Signup with password strength validation, sliding overlay toggle |
| `/hire` | Post a job (employer form) |
| `/find-job` | Submit application (job seeker form) |
| `/job/:id` | Job detail page |

## Auth & Security

- **Auth context** with localStorage persistence
- **Passwords SHA-256 hashed** before storage (never plaintext)
- **Login rate limiting** — 5 attempts per 60s per email, 10-attempt client lockout
- **Password strength** — min 8 chars, uppercase, lowercase, number, meter + rule checklist
- **Input sanitization** — HTML special chars stripped, maxLength enforced on all fields
- **CSP headers** — Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, Referrer-Policy
- **Session timeout** — auto-logout after 30 min inactivity
- **SPA routing** — no full page reloads (useNavigate throughout)

## Auth Page

- Full-screen layout (Navbar/Footer hidden on `/login`, `/signup`)
- Background image with dark gradient overlay
- Sliding overlay panel with team photo + blue tint
- Combined Auth component — same component renders for both routes
- Premium UI: rounded inputs with focus ring, pill gradient buttons, brand accents, social circles
- Mobile (≤1024px): overlay hidden, forms stack vertically, bottom nav tabs (Sign In / Sign Up)
- Remember me checkbox + forgot password link

## Tech Stack

| Tool | Version |
|---|---|
| React | ^19.2.7 |
| Vite | ^8.1.1 |
| Tailwind CSS | ^4.3.2 |
| React Router | ^7.18.1 |
| React Icons | ^5.7.0 |
| ESLint | ^10.6.0 |

## Getting Started

```bash
npm install
npm run dev      # development server
npm run build    # production build
npm run preview  # preview production build
npm run lint     # run ESLint
```
