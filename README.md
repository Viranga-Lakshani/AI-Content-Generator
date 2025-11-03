# AI Content Generator — Human-friendly, practical starter

Hello! 👋

This repository is a practical, human-centered AI Content Generator created and maintained by @lakshivi2023-arch. I (lakshivi2023-arch) wrote the code, docs, and templates with clarity and extensibility in mind so anyone can read, use, and adapt it.

What this repo gives you
- A small TypeScript-based CLI and library that wraps an LLM (e.g., OpenAI) to generate content.
- Friendly prompt templates you can tweak for blog posts, social updates, product descriptions, and more.
- A tiny local web server example to try the generator in a browser.
- Tests, examples, and a contributing guide that speaks human.

Quick start (plain)
1. Create a folder and paste these files into it.
2. Copy .env.example to .env and add your OPENAI_API_KEY (or other provider keys).
3. Run npm install.
4. Try the CLI or server.

Example commands
```bash
# install
npm install

# run CLI (interactive)
npm run start -- --help

# generate a blog outline
npm run start -- generate "Write a blog outline about rust ownership for beginners"

# run the tiny web server (localhost:3000)
npm run dev
