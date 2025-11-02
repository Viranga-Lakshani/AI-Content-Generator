// Simple frontend logic
document.addEventListener("DOMContentLoaded", () => {
  const inputEl = document.getElementById("input");
  const toneEl = document.getElementById("tone");
  const lengthEl = document.getElementById("length");
  const btn = document.getElementById("btn");
  const clearBtn = document.getElementById("clear");
  const outputEl = document.getElementById("output");

  btn.addEventListener("click", async () => {
    const text = inputEl.value.trim();
    if (!text) {
      outputEl.textContent = "Please paste some text first.";
      return;
    }
    outputEl.textContent = "Humanizing…";
    try {
      const resp = await fetch("/api/humanize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          tone: toneEl.value,
          length: lengthEl.value
        })
      });
      const data = await resp.json();
      if (data.humanized) {
        outputEl.textContent = data.humanized;
      } else if (data.error) {
        outputEl.textContent = "Error: " + data.error;
      } else {
        outputEl.textContent = "Unexpected response.";
      }
    } catch (err) {
      outputEl.textContent = "Request failed: " + err.message;
    }
  });

  clearBtn.addEventListener("click", () => {
    inputEl.value = "";
    outputEl.textContent = "";
  });
});
