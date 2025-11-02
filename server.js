const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

/**
 * Inlined humanize function (single-file approach).
 * Conservative, deterministic stylistic transformations.
 */

function splitSentences(text) {
  const parts = text
    .replace(/\n+/g, " ")
    .match(/[^.!?]+[.!?]?/g);
  return parts ? parts.map(p => p.trim()).filter(Boolean) : [];
}

function capitalizeFirst(s) {
  if (!s) return s;
  return s[0].toUpperCase() + s.slice(1);
}

function simpleReplace(s) {
  return s
    .replace(/\butilize\b/gi, "use")
    .replace(/\bcommence\b/gi, "start")
    .replace(/\bsubsequently\b/gi, "then")
    .replace(/\bapproximately\b/gi, "about")
    .replace(/\bdo not\b/gi, "don't")
    .replace(/\bdoes not\b/gi, "doesn't")
    .replace(/\bdid not\b/gi, "didn't")
    .replace(/\bhowever\b/gi, "but");
}

function addConnector(s, tone, idx) {
  if (idx === 0) return s;
  const connectors = {
    neutral: ["Also,", "That said,"],
    friendly: ["Also,", "By the way,"],
    professional: ["Additionally,", "Furthermore,"],
    casual: ["So,", "You know,"]
  };
  const list = connectors[tone] || connectors.neutral;
  const connector = list[idx % list.length];
  return `${connector} ${s}`;
}

function toneTweaks(s, tone) {
  if (tone === "friendly") {
    if (s.length % 2 === 0) return s + " 🙂";
  } else if (tone === "casual") {
    return s.replace(/\bis\b/gi, "is kinda");
  }
  return s;
}

function shortenForLength(s, length) {
  if (length === "short") {
    const firstComma = s.split(",")[0];
    const words = firstComma.split(/\s+/).slice(0, 10).join(" ");
    const out = words.trim();
    return out.endsWith(".") ? out : out + ".";
  }
  return s;
}

function joinSentences(arr) {
  return arr.map(s => s.trim()).join(" ");
}

function humanize(input, opts = {}) {
  const tone = opts.tone || "neutral";
  const length = opts.length || "medium";

  const sentences = splitSentences(input);
  if (sentences.length === 0) return "";

  const processed = sentences.map((s, idx) => {
    let out = s;

    out = simpleReplace(out);
    out = shortenForLength(out, length);
    out = addConnector(out, tone, idx);
    out = toneTweaks(out, tone);
    out = capitalizeFirst(out);
    return out;
  });

  const combined = joinSentences(processed);
  return combined.replace(/\s{2,}/g, " ").replace(/\s,/, ",").trim();
}

// API: humanize text
app.post("/api/humanize", (req, res) => {
  const { text, tone = "neutral", length = "medium" } = req.body || {};
  if (!text || typeof text !== "string") {
    return res.status(400).json({ error: "Missing or invalid 'text' in request body" });
  }

  try {
    const result = humanize(text, { tone, length });
    res.json({ humanized: result });
  } catch (err) {
    console.error("Humanize error:", err);
    res.status(500).json({ error: "Humanization failed" });
  }
});

// Serve index.html for root
app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
app.listen(PORT, () => {
  console.log(`Simple AI Humanizer running at http://localhost:${PORT}`);
});
