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

## RSVP — not connected

No response storage or submission service is configured. Guest controls and the send
button are disabled in HTML, including when JavaScript is unavailable. A notice in both
languages explains that no responses are being collected. This is an interim safeguard,
not a completed RSVP implementation.

Before inviting guests, choose and connect either a private form response destination
or a WhatsApp recipient. Test real delivery, error feedback and both languages before
enabling the controls. Never show success without confirmation from the destination.

## Remaining launch decisions

- Confirm venue pin, full address, hall/entrance and organizer contact.
- Confirm ceremony/arrival times and the Malayalam names and wording.
- Choose RSVP method, recipient/storage destination, guest-count rules and any deadline.
- Prepare sharing metadata/image and complete mobile/desktop visual QA.

## Assets

- `couple-frame-1.jpeg` and `couple-frame-2.jpeg`: alternating hero photographs.
- `couple-traditional-portrait.jpeg`: story photograph.
- `venue-maps-qr.png`: directions QR matching the Maps buttons.
- Other images and SVGs provide the existing stationery and floral treatments.
