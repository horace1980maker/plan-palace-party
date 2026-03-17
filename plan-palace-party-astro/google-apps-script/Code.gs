const SPREADSHEET_ID = "1vBsG7SRIJJFtW9AA0Vh6-XXh2ou5lY74ZtDVxoJn5wk";
const SHEET_NAME = "Registros";
const HEADERS = [
  "Timestamp",
  "Organization Name",
  "Focal Name",
  "Focal Email",
  "Focal Phone",
  "Backup Name",
  "Backup Email",
  "Schedule",
  "Additional Participants",
  "Comments",
  "Source",
];

function doGet() {
  return HtmlService.createHtmlOutput("Web app lista para recibir registros.");
}

function doPost(e) {
  try {
    const payload = normalizePayload_(e);

    if (
      !payload.orgName ||
      !payload.focalName ||
      !payload.focalEmail ||
      !payload.backupName ||
      !payload.backupEmail ||
      !payload.schedule
    ) {
      throw new Error("Faltan campos obligatorios.");
    }

    if (payload.website) {
      return successResponse_(payload.redirectUrl, "Registro recibido.");
    }

    const sheet = getSheet_();
    ensureHeaders_(sheet);

    sheet.appendRow([
      new Date(),
      payload.orgName,
      payload.focalName,
      payload.focalEmail,
      payload.focalPhone,
      payload.backupName,
      payload.backupEmail,
      payload.schedule,
      payload.additionalParticipants,
      payload.comments,
      payload.source,
    ]);

    return successResponse_(payload.redirectUrl, "Registro recibido.");
  } catch (error) {
    return errorResponse_(error);
  }
}

function normalizePayload_(e) {
  const params = (e && e.parameter) || {};

  return {
    orgName: valueOrEmpty_(params.orgName),
    focalName: valueOrEmpty_(params.focalName),
    focalEmail: valueOrEmpty_(params.focalEmail),
    focalPhone: valueOrEmpty_(params.focalPhone),
    backupName: valueOrEmpty_(params.backupName),
    backupEmail: valueOrEmpty_(params.backupEmail),
    schedule: valueOrEmpty_(params.schedule),
    additionalParticipants: valueOrEmpty_(params.additionalParticipants),
    comments: valueOrEmpty_(params.comments),
    source: valueOrEmpty_(params.source),
    redirectUrl: sanitizeRedirect_(params.redirectUrl),
    website: valueOrEmpty_(params.website),
  };
}

function valueOrEmpty_(value) {
  return value ? String(value).trim() : "";
}

function getSheet_() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  return sheet;
}

function ensureHeaders_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
  }
}

function sanitizeRedirect_(value) {
  if (!value) {
    return "";
  }

  const trimmed = String(value).trim();

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  return "";
}

function successResponse_(redirectUrl, message) {
  return HtmlService.createHtmlOutput(buildHtml_(true, message, redirectUrl))
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .setTitle("Registro recibido");
}

function errorResponse_(error) {
  return HtmlService.createHtmlOutput(
    buildHtml_(false, "No pudimos guardar el registro. " + error.message, ""),
  )
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .setTitle("Error de registro");
}

function buildHtml_(ok, message, redirectUrl) {
  const safeMessage = escapeHtml_(message);
  const redirectScript = redirectUrl
    ? "<script>setTimeout(function(){window.top.location.href=" +
      JSON.stringify(redirectUrl) +
      ';}, 250);</script><noscript><meta http-equiv="refresh" content="0; url=' +
      escapeHtml_(redirectUrl) +
      '"></noscript>'
    : "";

  return (
    "<!doctype html>" +
    '<html lang="es">' +
    "<head>" +
    '<meta charset="UTF-8">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1">' +
    "<title>" +
    (ok ? "Registro recibido" : "Error de registro") +
    "</title>" +
    "<style>" +
    "body{margin:0;font-family:Arial,sans-serif;background:#f6f1e8;color:#163237;display:grid;place-items:center;min-height:100vh;padding:24px;}" +
    ".card{max-width:520px;background:white;border-radius:20px;padding:32px;box-shadow:0 20px 50px rgba(0,0,0,.08);text-align:center;}" +
    "h1{margin:0 0 12px;color:#0d5c63;font-size:28px;}" +
    "p{line-height:1.6;margin:0 0 12px;}" +
    "</style>" +
    redirectScript +
    "</head>" +
    "<body>" +
    '<div class="card">' +
    "<h1>" +
    (ok ? "Gracias" : "No se pudo completar el registro") +
    "</h1>" +
    "<p>" +
    safeMessage +
    "</p>" +
    (redirectUrl
      ? "<p>Serás redirigido automáticamente en unos segundos.</p>"
      : "") +
    "</div>" +
    "</body>" +
    "</html>"
  );
}

function escapeHtml_(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
