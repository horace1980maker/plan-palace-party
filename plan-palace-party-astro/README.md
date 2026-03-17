# Plan Palace Party Astro

A fresh rebuild of the landing page using Astro, focused on a simpler structure, a premium UI, and direct submission to Google Sheets through Google Apps Script.

## What is inside

- `src/pages/index.astro`: the main landing page
- `src/pages/gracias.astro`: success page after a form submission
- `src/components/`: small reusable Astro components
- `src/data/content.mjs`: editable site copy and structured content
- `src/styles/global.css`: the full visual system for the landing page
- `google-apps-script/Code.gs`: the server-side script that writes submissions to Google Sheets

## Run locally

```bash
npm install
npm run dev
```

Astro will usually start on `http://localhost:4321`.

## Environment variable

Create a local `.env` file from `.env.example` and set the Apps Script web app URL:

```bash
PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/REPLACE_WITH_YOUR_DEPLOYMENT_ID/exec
```

If this variable is missing, the form will stay visible but disabled so the page can still be reviewed safely.

## Google Sheets setup

1. Create a Google Sheet where you want registrations to be stored.
2. Open `Extensions > Apps Script` from that Sheet.
3. Paste the contents of `google-apps-script/Code.gs` into the Apps Script editor.
4. Replace `REPLACE_WITH_YOUR_SPREADSHEET_ID` with the Sheet ID from the Google Sheets URL.
5. Keep or rename the `Registros` sheet tab as you prefer.
6. Deploy the script as a Web App.
7. Set `Execute as`: `Me`.
8. Set `Who has access`: `Anyone`.
9. Copy the generated `/exec` URL.
10. Put that URL into `PUBLIC_GOOGLE_SCRIPT_URL`.

The form uses a normal `POST` to the Apps Script web app and then redirects back to `/gracias`. That keeps the frontend static and avoids adding a backend or database just for the form.

## Coolify deployment

This project is intended to be deployed as a static Astro site.

Recommended build behavior:

```bash
npm install
npm run build
```

Generated output directory:

```bash
dist
```

In Coolify, configure the app so the environment includes `PUBLIC_GOOGLE_SCRIPT_URL`.

## Notes

- This rebuild is intentionally much smaller than the original React + UI-kit project.
- Content lives in `src/data/content.mjs` so text updates do not require digging through many components.
- If `npm install` fails on a synced drive like `G:\My Drive\...`, move this new folder to a normal local path such as `C:\dev\plan-palace-party-astro` before installing dependencies.
