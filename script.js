(function () {
  "use strict";

  var THEME_KEY = "portfolio-theme";
  var html = document.documentElement;
  var themeToggle = document.getElementById("theme-toggle");
  var navToggle = document.querySelector(".nav-toggle");
  var siteNav = document.getElementById("site-nav");
  var searchInput = document.getElementById("project-search");
  var projectCards = document.querySelectorAll(".project-card");
  var emptySearch = document.getElementById("empty-search");
  var projectStatus = document.getElementById("project-status");
  var chatForm = document.getElementById("chat-form");
  var chatInput = document.getElementById("chat-input");
  var chatLog = document.getElementById("chat-log");
  var year = document.getElementById("year");

  function preferredTheme() {
    var saved = localStorage.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") {
      return saved;
    }
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  }

  function applyTheme(theme) {
    html.setAttribute("data-theme", theme);
    var isDark = theme === "dark";
    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", String(isDark));
      themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
      );
      themeToggle.querySelector(".theme-toggle-icon").textContent = isDark
        ? "☀"
        : "☾";
      themeToggle.querySelector(".theme-toggle-text").textContent = isDark
        ? "Light"
        : "Dark";
    }
  }

  applyTheme(preferredTheme());

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var next =
        html.getAttribute("data-theme") === "dark" ? "light" : "dark";
      localStorage.setItem(THEME_KEY, next);
      applyTheme(next);
    });
  }

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      var open = siteNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    siteNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        siteNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  function cardText(card) {
    return [
      card.getAttribute("data-title") || "",
      card.getAttribute("data-description") || "",
      card.getAttribute("data-tech") || "",
      card.textContent || "",
    ]
      .join(" ")
      .toLowerCase();
  }

  function filterProjects() {
    if (!searchInput) {
      return;
    }
    var query = searchInput.value.trim().toLowerCase();
    var visible = 0;

    projectCards.forEach(function (card) {
      var match = query === "" || cardText(card).indexOf(query) !== -1;
      card.classList.toggle("hidden", !match);
      card.hidden = !match;
      if (match) {
        visible += 1;
      }
    });

    if (emptySearch) {
      emptySearch.hidden = visible !== 0;
    }

    if (projectStatus) {
      if (query === "") {
        projectStatus.textContent = "Showing all " + projectCards.length + " projects.";
      } else if (visible === 0) {
        projectStatus.textContent = "No matching projects for \"" + query + "\".";
      } else {
        projectStatus.textContent =
          "Showing " + visible + " of " + projectCards.length + " projects.";
      }
    }
  }

  if (searchInput) {
    searchInput.addEventListener("input", filterProjects);
    filterProjects();
  }

  function addBubble(text, className) {
    var bubble = document.createElement("p");
    bubble.className = "chat-bubble " + className;
    bubble.textContent = text;
    chatLog.appendChild(bubble);
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  if (chatForm && chatInput && chatLog) {
    chatForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var message = chatInput.value.trim();
      if (!message) {
        return;
      }

      addBubble(message, "user");
      chatInput.value = "";

      // ------------------------------------------------------------------
      // API INTEGRATION (later)
      // Connect this preview to a backend you control. Never put API keys
      // in this file, in HTML, or in GitHub. Keep secrets on a server.
      // Example later steps:
      // 1. Send `message` to your own endpoint with fetch().
      // 2. Read the reply from the JSON response.
      // 3. Replace the preview bubble below with the real reply.
      // ------------------------------------------------------------------
      addBubble(
        "Preview only: this interface is not connected to an AI API yet. Your message was not sent anywhere.",
        "preview"
      );
    });
  }

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
})();
