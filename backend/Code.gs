// Paste into the Apps Script project bound to a private response spreadsheet.
// Run setup once as the owner, then deploy as Me / Anyone.
function setup() {
  const book = SpreadsheetApp.getActiveSpreadsheet();
  if (!book) throw new Error('Open this script from the response spreadsheet.');
  PropertiesService.getScriptProperties().setProperty('RSVP_SHEET_ID', book.getId());
  const sheet = book.getSheetByName('Responses') || book.insertSheet('Responses');
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Received at', 'Response ID', 'Name', 'Attendance', 'Guests (including respondent)', 'Message', 'Language']);
    sheet.setFrozenRows(1);
  }
}

function doGet() {
  // No read endpoint: guest information is never returned to visitors.
  return reply_({ok: false});
}

function doPost(e) {
  let lock;
  try {
    const p = (e && e.parameter) || {};
    const id = String(p.responseId || '');
    const name = String(p.name || '').trim();
    const message = String(p.message || '').trim();
    const guests = Number(p.guests);
    if (String(p.website || '') || !/^[a-f0-9-]{36}$/i.test(id) || !name || name.length > 120 ||
        message.length > 1000 || !['yes', 'no'].includes(p.attendance) ||
        !['en', 'ml'].includes(p.language) || !Number.isInteger(guests) ||
        (p.attendance === 'yes' ? guests < 1 || guests > 5 : guests !== 0)) {
      return reply_({ok: false});
    }
    lock = LockService.getScriptLock();
    lock.waitLock(10000);
    const sheet = SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty('RSVP_SHEET_ID')).getSheetByName('Responses');
    if (!sheet) throw new Error('Storage unavailable');
    // Retry after a lost acknowledgement is safe: update the same response row.
    const match = sheet.getLastRow() > 1 ? sheet.getRange(2, 2, sheet.getLastRow() - 1, 1)
      .createTextFinder(id).matchEntireCell(true).findNext() : null;
    const row = match ? match.getRow() : sheet.getLastRow() + 1;
    sheet.getRange(row, 1, 1, 7).setValues([[new Date(), id, text_(name), p.attendance, guests, text_(message), p.language]]);
    SpreadsheetApp.flush();
    return reply_({ok: true, responseId: id});
  } catch (error) {
    // Do not expose submitted data, Sheet IDs or internal error details.
    return reply_({ok: false});
  } finally {
    if (lock && lock.hasLock()) lock.releaseLock();
  }
}

function text_(value) {
  // Keep guest-supplied formulas inert in Sheets and spreadsheet exports.
  return /^[\s]*[=+@-]/.test(value) ? "'" + value : value;
}

function reply_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
