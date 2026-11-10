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

## RSVP — private storage prepared, activation pending

The selected destination is a private Google Sheet, written by a Google Apps Script
web app. Follow [backend/SETUP.md](backend/SETUP.md) for the owner's one-time setup.
`rsvp-config.js` intentionally has an empty endpoint until deployment and real-delivery
QA. The form remains disabled until configured. No credentials belong in this repo.

The implementation validates data on the server, stores declines as zero guests,
neutralizes spreadsheet formulas and reuses response IDs to make retries safe.
Only a readable success acknowledgement matching the response ID shows confirmation;
failures preserve entered data. Status messages support English and Malayalam.

## Remaining launch decisions

- Confirm venue pin, full address, hall/entrance and organizer contact.
- Confirm ceremony/arrival times and the Malayalam names and wording.
- Activate private RSVP storage; confirm guest-count rules and any deadline.
- Prepare sharing metadata/image and complete mobile/desktop visual QA.

## Assets

- `couple-frame-1.jpeg` and `couple-frame-2.jpeg`: alternating hero photographs.
- `couple-traditional-portrait.jpeg`: story photograph.
- `venue-maps-qr.png`: directions QR matching the Maps buttons.
- Other images and SVGs provide the existing stationery and floral treatments.
