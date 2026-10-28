
(() => {
  // Update the footer year if this element exists.
  const year = document.getElementById("year");

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  const form = document.getElementById("chat-form");
  const input = document.getElementById("chat-input");
  const messages = document.getElementById("chat-messages");
  const sendButton = document.getElementById("chat-submit");

  // Don't initialize chat if these elements aren't in your HTML.
  if (!form || !input || !messages) {
    console.warn("Chat elements not found. Check your HTML IDs.");
    return;
  }

  function addMessage(text, sender) {
    const bubble = document.createElement("div");
    bubble.className = `chat-message ${sender}`;
    bubble.textContent = text;
    messages.appendChild(bubble);
    messages.scrollTop = messages.scrollHeight;
    return bubble;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const message = input.value.trim();

    if (!message) return;

    addMessage(message, "user");
    input.value = "";
    input.disabled = true;

    if (sendButton) sendButton.disabled = true;

    const loading = addMessage("Thinking...", "bot");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      loading.remove();

      if (!response.ok) {
        throw new Error(data.error || "Chat request failed.");
      }

      addMessage(data.reply, "bot");
    } catch (error) {
      loading.remove();

      addMessage(
        error.message || "Unable to connect. Please try again.",
        "bot"
      );

      console.error("Chat error:", error);
    } finally {
      input.disabled = false;

      if (sendButton) sendButton.disabled = false;

      input.focus();
    }
  });
})();

