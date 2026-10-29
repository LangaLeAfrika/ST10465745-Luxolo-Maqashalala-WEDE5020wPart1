# WEDE5020 ICE Task 1: Eastern Cape Youth Skills Hub

Student Name: Luxolo Maqashalala
Student Number: ST10465745
Module: WEDE5020

## Project Overview
This submission contains the Part 1 requirements for the WEDE5020 ICE Task. The project proposes a website solution for the Eastern Cape Youth Skills Hub, a non-profit organisation dedicated to empowering unemployed youth through skills development in computer literacy, job readiness, and entrepreneurship.

## Folder Structure
* /Chosen Proposal: Contains the final rationale (Chosen Proposal.txt) for selecting the Eastern Cape Youth Skills Hub.
* /Proposals: Contains the initial comparison (Proposals guide.txt) between the two candidate organisations (Eastern Cape Youth Skills Hub and Handyman Services).
* /Research: Contains the target audience analysis, user needs, and design strategy (research guide.txt).
* /Website: Contains the foundational HTML structure for the 5-page website prototype, including the images directory.

## Instructions for Viewing
To view the website prototype locally:
1. Extract the main submission folder.
2. Navigate to the `Website` directory.
3. Right-click on `index.html` and select "Open with" to launch it in any modern web browser (e.g., Chrome, Edge, Firefox).
4. Use the navigation menu to browse between the Home, About, Programmes, Registration, and Contact pages.

## Part 2: CSS Styling and Responsive Design

Part 2 develops the Eastern Cape Youth Skills Hub prototype through
a shared external stylesheet, consistent navigation, responsive layouts,
and responsive images.

### Styling and Layout

- Linked the website pages to `Website/css/styles.css`.
- Added a CSS reset for consistent spacing and box sizing.
- Defined reusable colours using CSS custom properties.
- Styled headings, paragraphs, navigation, content panels, forms, and footers.
- Used CSS Grid for the main content and Flexbox for navigation.
- Added hover, active, and keyboard-focus styles.
- Used `aria-current="page"` to identify the current navigation link.
- Used relative units, including rem and percentages.

### Responsive Design

The stylesheet includes two main breakpoints:

| Screen width | Behaviour |
|---|---|
| Above 64rem | Desktop layout with two columns where multiple content sections exist |
| Up to 64rem | Reduced heading sizes, spacing, and navigation padding |
| Up to 40rem | Single-column content, stacked navigation, and full-width form buttons |

The Home page logo uses `<picture>`, `srcset`, and `sizes`.
Two resized versions are available at widths of 352 and 704 pixels.
The browser selects an appropriate source according to the displayed
image size and screen pixel density.

## Part 2 Changelog

| Date | Change | Purpose |
|---|---|---|
| 2026-10-28 | Added the shared external stylesheet and page links | Apply consistent styling throughout the website |
| 2026-10-28 | Added typography, colours, borders, shadows, and form styles | Improve readability and visual presentation |
| 2026-10-28 | Standardised page headers and added current-page navigation styling | Improve navigation consistency |
| 2026-10-29 | Moved the logo sizing rule outside the reduced-motion media query | Apply the size limit regardless of motion preferences |
| 2026-10-29 | Added responsive logo markup and resized image sources | Support appropriate image selection on different displays |
| 2026-10-29 | Replaced cropped image copies with proportionally resized versions | Preserve the complete logo |
| 2026-10-29 | Added screenshots for desktop, tablet, and mobile layouts | Document responsive design testing |

These entries describe implementation changes and issues identified
during development. Lecturer feedback from Part 1 should be recorded
separately, with the corresponding correction.

## Responsive Testing Evidence

Testing evidence was captured using Chrome DevTools device emulation.
The dimensions below represent emulated viewport sizes, rather than
tests on physical mobile or tablet devices.

| Page | View | Viewport |
|---|---|---|
| Home | Desktop | 1440 × 900 |
| Home | Tablet | 768 × 1024 |
| Home | Mobile | 375 × 812 |
| Registration | Mobile | 375 × 812 |

### Home: Desktop

![Home page at desktop size](screenshots/home-desktop.png)

### Home: Tablet

![Home page at tablet size](screenshots/home-tablet.png)

### Home: Mobile

![Home page at mobile size](screenshots/home-mobile.png)

### Registration: Mobile

![Registration page at mobile size](screenshots/registration-mobile.png)

### Issues Investigated

- The logo size rule was initially inside the reduced-motion media query.
  Moving it outside the query allowed it to apply to all users.
- The responsive image copies were initially cropped.
  They were replaced with resized copies that preserve the complete image.
- A CSP warning appeared in the normal Chrome session but did not appear
  during the Incognito check. This suggests a browser-profile or extension
  influence; no CSP weakening was applied.

### Prototype Limitation

The registration form is a front-end prototype. It is not connected to
a database or registration-processing service.
