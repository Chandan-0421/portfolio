# Chandan Singh — Portfolio (React + Vite + Tailwind)

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
```

## Before you deploy
1. Copy your files into `public/`:
   - `Chandan_Resume.pdf`
   - your own `favicon.svg` (a placeholder is included)
2. (Optional) `cp .env.example .env` and set `VITE_WEB3FORMS_KEY`.
3. In the Web3Forms dashboard, restrict the key to your domain.

## Build / deploy
```bash
npm run build      # output in dist/
npm run preview    # test the production build
```
Vercel / Netlify: import the repo — build command `npm run build`, output dir `dist`.

## Where to edit things
| What                                   | File                          |
| -------------------------------------- | ----------------------------- |
| Text, skills, projects, links, tags    | `src/data.js`                 |
| Colours / animations / custom CSS      | `src/index.css`               |
| Navbar (bubble, theme, mobile menu)    | `src/components/Navbar.jsx`   |
| Hero, About, Projects, Contact         | `src/components/*.jsx`        |

## TODOs left in `src/data.js`
- WanderLust: add `demo` / `code` links (buttons only show when a link exists)
- "Organized by DEF Institute" looks like a placeholder — put the real name
- Kavaavi link is `http://` — switch to `https://` if the site supports it
