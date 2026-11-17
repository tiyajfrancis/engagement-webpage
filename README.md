# Arathy & Pranav — engagement invitation

Static, bilingual invitation with five sections: invitation, story, event details,
venue and RSVP. The existing stationery design, photographs and animations are retained.

## Preview and deployment

Open `index.html` in a modern browser with `assets/` beside it, or serve the
repository with a local static server. The public invitation is hosted on GitHub Pages:
https://tiyajfrancis.github.io/engagement-webpage/

## Verified on 10 November 2026

- The deployed HTML exactly matched the repository's default branch before these fixes.
- Both Maps links and `assets/venue-maps-qr.png` use the same directions destination:
  `8.877032,76.593229`. QR contents were decoded and compared with the links.
  The couple must still confirm that this is the intended venue entrance.
- The venue section uses an externally hosted hotel photograph, not a placeholder.
  Its URL returned HTTP 200. Permission and a locally hosted copy remain to be resolved.
- All referenced local assets exist.
- Countdown uses 24 January 2027 at noon in India (`+05:30`). Event details still need approval.

## RSVP — connected and verified on 17 November 2026

The custom bilingual form posts JSON as text/plain to a Google Apps Script web app.
The web app runs as the deploying account and writes only to the `RSVP Responses`
tab of ENGAGEMENT RSVP. General spreadsheet access is Restricted; guests do not
receive access to the spreadsheet. The endpoint returns no guest records.

Script editor (requires authorized Google access):
https://script.google.com/home/projects/1y0Vv84vW5AOvM1EjWT3j4-DFTRE6NE8tWmFhyiPHL2XoLufDvkMeQaU7/edit

- Attending responses allow 1–5 guests; declines store 0.
- Names are required (100 characters); messages are optional (1000 characters).
- Submission IDs and a script lock prevent duplicate retry rows.
- A honeypot, request validation and a best-effort global 30/minute limit reduce spam.
  This is a public submission endpoint, not an authenticated invitation allowlist.
- Formula-leading text is escaped before storage.
- The form confirms success only after a readable successful JSON response with
  the matching submission ID. Network/server failures retain the values and retry ID.
- Controls are disabled while sending and after confirmed success.
- The saved authorization must remain active for the web app to work; signing
  out of the setup browser does not revoke that authorization.
- After backend edits, update the existing deployment to a new version.
  Keep the deployment URL stable, or update `RSVP_ENDPOINT` in index.html.

Verified: live English attendance and Malayalam decline both saved correct rows;
blank-name and invalid requests were rejected without rows; duplicate POST returned
duplicate:true without adding a row; backend malformed/conflicting/honeypot tests passed.
Isolated frontend tests covered network failure, server rejection, retained values,
stable retry IDs, confirmed success and repeat-submit blocking. Temporary test rows
and the staging page were removed.

## Remaining launch decisions

- Confirm venue pin, full address, hall/entrance and organizer contact.
- Confirm ceremony/arrival times and the Malayalam names and wording.
- Confirm whether an RSVP deadline or a different maximum guest count is needed.
- Prepare sharing metadata/image and complete mobile/desktop visual QA.

## Assets

- `couple-frame-1.jpeg` and `couple-frame-2.jpeg`: alternating hero photographs.
- `couple-traditional-portrait.jpeg`: story photograph.
- `venue-maps-qr.png`: directions QR matching the Maps buttons.
- Other images and SVGs provide the existing stationery and floral treatments.
