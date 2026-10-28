# Student portfolio website

A beginner-friendly personal portfolio for a first-year Computer Science Engineering student specializing in AI and Data Science.

## Files

- `index.html` — page structure and content
- `style.css` — layout, colors, and responsive design
- `script.js` — theme toggle, mobile menu, project search, and chatbot preview
- `page-audit.md` — checklist before you publish

## How to open the site locally

You do not need to install anything.

1. Replace the placeholders in `index.html` with your details when you are ready.
2. Open the project folder.
3. Double-click `index.html`, or right-click the file and open it in Chrome, Edge, or Firefox.

You can also start a simple local server from this folder if you prefer:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000` in your browser.

## Placeholders

Do not invent links. Keep the square-bracket placeholders until you have a real value.

Examples:

- `[YOUR FULL NAME]`
- `[YOUR EMAIL]`
- `[YOUR PHONE]`
- `[YOUR CITY, COUNTRY]`
- `[YOUR COLLEGE / UNIVERSITY NAME]`
- `[YOUR GITHUB PROFILE URL]`
- `[YOUR LINKEDIN URL]`
- `[REPOSITORY URL]`
- `[LIVE APP URL]`

If a project has no live site yet, remove that project's Live app link instead of guessing a URL.

## Features

- Semantic sections: Home, About Me, Education, Skills, Projects, Contact, AI Chatbot
- Project search that filters by title, description, or technology
- Light / dark mode toggle saved in the browser
- Mobile navigation menu
- Chatbot **preview interface** that is not connected to an API

## Chatbot and API keys

The chatbot is a front-end preview only. It does not call an AI service.

Do **not** put API keys in this website, in GitHub, or in any of these files. If you connect a real chatbot later, send messages to your own backend and keep secrets on the server. Look for the `API INTEGRATION` comment in `script.js`.

## Customize

1. Fill in personal details.
2. Update education and skills.
3. Add real repository and live app URLs only when they exist.
4. Work through `page-audit.md`.
