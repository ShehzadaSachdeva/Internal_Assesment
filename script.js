
/* ===== GROQ AI CHATBOT ===== */

const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatLog = document.getElementById("chat-log");

if (chatForm && chatInput && chatLog) {
  chatForm.addEventListener("submit", async function (event) {
    // IMPORTANT: Stop the browser from refreshing the page.
    event.preventDefault();

    const message = chatInput.value.trim();

    if (!message) return;

    // Display the user's message.
    const userBubble = document.createElement("p");
    userBubble.className = "chat-bubble user";
    userBubble.textContent = message;
    chatLog.appendChild(userBubble);

    chatInput.value = "";
    chatInput.disabled = true;

    const sendButton = chatForm.querySelector(
      'button[type="submit"]'
    );

    if (sendButton) sendButton.disabled = true;

    // Display a loading message.
    const loadingBubble = document.createElement("p");
    loadingBubble.className = "chat-bubble system";
    loadingBubble.textContent = "Thinking...";
    chatLog.appendChild(loadingBubble);

    chatLog.scrollTop = chatLog.scrollHeight;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || `Request failed (${response.status})`
        );
      }

      if (typeof data.reply !== "string") {
        throw new Error("The server returned no chatbot reply.");
      }

      loadingBubble.textContent = data.reply;
      loadingBubble.className = "chat-bubble bot";
    } catch (error) {
      console.error("Chatbot error:", error);

      loadingBubble.textContent =
        "Sorry, I couldn't respond. " +
        (error.message || "Please try again.");

      loadingBubble.className = "chat-bubble system";
    } finally {
      chatInput.disabled = false;

      if (sendButton) sendButton.disabled = false;

      chatLog.scrollTop = chatLog.scrollHeight;
      chatInput.focus();
    }
  });
}

/* ===== END GROQ AI CHATBOT ===== */


