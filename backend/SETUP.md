# Private RSVP storage setup

The website keeps its existing form. A Google Apps Script web app accepts submissions
and saves them to a private Google Sheet. There is no guest-data read endpoint.
Do not publish or share the spreadsheet publicly. The public script URL is a write
endpoint, not a secret; anonymous submissions can be spammed and Apps Script quotas
apply. The honeypot is only basic protection, not a CAPTCHA or rate limiter.

## Owner setup (one time)

1. In the Google account that should own the responses, create a blank Google Sheet
   named **Arathy & Pranav — RSVP**. Keep Share → General access **Restricted**.
2. Open **Extensions → Apps Script** from that Sheet.
3. Replace the starter Code.gs with the contents of [Code.gs](Code.gs), then save.
4. Select **setup** in the function dropdown and click **Run**. Review and authorize
   the script under your own account. This records the Sheet ID privately and creates
   a Responses tab. Do not run doPost manually.
5. Choose **Deploy → New deployment → Web app**. Set **Execute as: Me** and
   **Who has access: Anyone** (not Anyone with a Google account). Deploy.
6. Copy the URL ending in `/exec`. Send that URL to the website maintainer; do not
   send a password, access token, spreadsheet link or Google credentials.
7. The maintainer puts it in `rsvp-config.js` and tests from the actual website origin
   before merging. Until configured, the form stays disabled, including without JS.

## Required acceptance checks before inviting guests

- Submit an attending response, check the private Sheet row and displayed confirmation.
- Submit Unable to attend; count must be disabled and stored as zero.
- Test English and Malayalam, switching language during save and after success/error.
- Submit a name or message starting with `=`; it must remain text in the Sheet.
- Double-click Send: only one save is active. Retry after a network timeout: the same
  response ID updates one row. Editing and resubmitting in the same page updates it too.
- Reloads/different devices create separate responses; no identity verification or
  cross-device editing is provided. Organizers should review duplicates manually.
- Disconnect the network: no success, entered details retained, retry possible.
- Test anonymously on mobile, including WhatsApp's browser. Readable JSON confirmation
  across Google's redirect must work. If browser CORS blocks it, leave disabled and
  resolve transport; never replace acknowledgement with an opaque no-cors response.
- Confirm the spreadsheet remains Restricted and opening `/exec` reveals no responses.

Guest counts retain the existing 1–5 limit and explicitly include the respondent.
No RSVP deadline has been invented. Confirm these rules with the couple.

If updating Code.gs later, deploy a new version via Manage deployments → Edit.
To close collection, clear the endpoint and archive the Apps Script deployment.

Google references:
- https://developers.google.com/apps-script/guides/web
- https://developers.google.com/apps-script/guides/content
