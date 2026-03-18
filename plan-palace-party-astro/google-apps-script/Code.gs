const SPREADSHEET_ID = "1vBsG7SRIJJFtW9AA0Vh6-XXh2ou5lY74ZtDVxoJn5wk";
const SHEET_NAME = "Registros";
const DEFAULT_KICKOFF_DATE = "Martes 7 de abril, 10:00 AM (hora de Honduras)";
const LEGACY_HEADERS = [
  "Timestamp",
  "Organization Name",
  "Focal Name",
  "Focal Email",
  "Focal Phone",
  "Backup Name",
  "Backup Email",
  "Kickoff Date",
  "Additional Participants",
  "Comments",
  "Source",
];
const HEADERS = [
  "Timestamp",
  "Organization Name",
  "Organization Size",
  "Focal Name",
  "Focal Email",
  "Focal Phone",
  "Backup Name",
  "Backup Email",
  "Kickoff Date",
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
      !payload.orgSize ||
      !payload.focalName ||
      !payload.focalEmail ||
      !payload.backupName ||
      !payload.backupEmail
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
      payload.orgSize,
      payload.focalName,
      payload.focalEmail,
      payload.focalPhone,
      payload.backupName,
      payload.backupEmail,
      payload.kickoffDate,
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
    orgSize: valueOrEmpty_(params.orgSize),
    focalName: valueOrEmpty_(params.focalName),
    focalEmail: valueOrEmpty_(params.focalEmail),
    focalPhone: valueOrEmpty_(params.focalPhone),
    backupName: valueOrEmpty_(params.backupName),
    backupEmail: valueOrEmpty_(params.backupEmail),
    kickoffDate: valueOrEmpty_(params.kickoffDate) || DEFAULT_KICKOFF_DATE,
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
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    return;
  }

  ensureColumnCapacity_(sheet, HEADERS.length);

  const headerCount = Math.max(HEADERS.length, LEGACY_HEADERS.length);
  const currentHeaders = sheet.getRange(1, 1, 1, headerCount).getValues()[0];

  if (headersMatch_(currentHeaders, HEADERS)) {
    return;
  }

  if (headersMatch_(currentHeaders, LEGACY_HEADERS)) {
    sheet.insertColumnAfter(2);
  }

  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
}

function ensureColumnCapacity_(sheet, minimumColumns) {
  const missingColumns = minimumColumns - sheet.getMaxColumns();

  if (missingColumns > 0) {
    sheet.insertColumnsAfter(sheet.getMaxColumns(), missingColumns);
  }
}

function headersMatch_(currentHeaders, expectedHeaders) {
  return expectedHeaders.every(function (header, index) {
    return currentHeaders[index] === header;
  });
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
  const redirectMeta = redirectUrl
    ? '<meta http-equiv="refresh" content="0; url=' + escapeHtml_(redirectUrl) + '">'
    : "";
  const redirectScript = redirectUrl
    ? "<script>(function(){var url=" +
      JSON.stringify(redirectUrl) +
      ";setTimeout(function(){try{window.top.location.replace(url);}catch(e){}window.location.replace(url);},50);})();</script>"
    : "";
  const actionLink = redirectUrl
    ? '<p><a href="' + escapeHtml_(redirectUrl) + '" style="display:inline-block;margin-top:8px;padding:12px 18px;border-radius:999px;background:#0d5c63;color:#f8f6f0;text-decoration:none;font-weight:700;">Continuar</a></p>'
    : "";

  return (
    "<!doctype html>" +
    '<html lang="es">' +
    "<head>" +
    '<meta charset="UTF-8">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1">' +
    redirectMeta +
    "<title>" +
    (ok ? "Registro recibido" : "Error de registro") +
    "</title>" +
    "<style>" +
    "body{margin:0;font-family:Arial,sans-serif;background:#f6f1e8;color:#163237;display:grid;place-items:center;min-height:100vh;padding:24px;}" +
    ".card{max-width:560px;background:linear-gradient(160deg, rgba(13,92,99,.96), rgba(8,46,51,.94));color:#f8f6f0;border-radius:24px;padding:32px;box-shadow:0 20px 50px rgba(0,0,0,.12);text-align:center;}" +
    ".eyebrow{display:inline-block;margin:0 0 14px;padding:8px 12px;border-radius:999px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.16);font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;}" +
    "h1{margin:0 0 12px;color:#f8f6f0;font-size:32px;line-height:1.1;}" +
    "p{line-height:1.6;margin:0 0 12px;color:rgba(248,246,240,.88);}" +
    "</style>" +
    redirectScript +
    "</head>" +
    "<body>" +
    '<div class="card">' +
    (ok ? '<p class="eyebrow">Registro enviado</p>' : "") +
    "<h1>" +
    (ok ? "Gracias por completar el formulario" : "No se pudo completar el registro") +
    "</h1>" +
    "<p>" +
    (ok ? "La información quedó registrada. Te estamos llevando a la página de confirmación." : safeMessage) +
    "</p>" +
    (redirectUrl
      ? "<p>Si no avanza automáticamente, usa el botón de abajo.</p>" + actionLink
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
