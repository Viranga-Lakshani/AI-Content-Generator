```markdown
# Simple AI Content Humanizer (Single-file humanizer)

A minimal, real, working app that "humanizes" text using deterministic, local rules — no external API key required. The humanizer logic is inlined in server.js so there's no separate humanizer file to manage.

What it is
- Node.js + Express backend with a /api/humanize endpoint.
- Static frontend (public/) to paste text, choose tone, and get a humanized output.
- Simple, deterministic rule-based humanizer implemented locally (safe to run offline).

Requirements
- Node.js 18+ (or 16+ should work)
- npm

Quick start (local)
1. Save the files in a directory.
2. Install:
   npm install
3. Start:
   npm start
4. Open in your browser:
   http://localhost:3000

Development
- Run with auto-reload:
  npm run dev

Docker
- Build and run:
  docker build -t simple-humanizer .
  docker run -p 3000:3000 simple-humanizer

API
- POST /api/humanize
  - Body (JSON): { "text": "your text", "tone": "neutral|friendly|casual|professional", "length": "short|medium|long" }
  - Response: { "humanized": "..." }

Notes
- Humanizer logic is deterministic and conservative — it focuses on stylistic tweaks and avoids changing facts.
- If you want the logic modular again, move the functions from server.js into a separate module and require/import it.

License
- MIT
```