# Specification

## Summary
**Goal:** Build NexHub, a dark-themed entertainment hub with three main sections: a web proxy, a browser games library, and a shows/video library.

**Planned changes:**
- Apply a global dark theme with neon accent colors (cyan/electric green), modern sans-serif typography, and card-based layouts across all pages
- Add a top navigation bar with the NexHub logo and links to Proxy, Games, and Shows sections, with active-link highlighting
- Create a hero section with a headline, tagline ("Browse freely. Play games. Watch shows."), and CTA buttons linking to each section
- Build a Proxy section with a URL input field, a "Go" button, and a full-width iframe that loads the entered URL
- Build a Games section displaying a responsive grid of at least 6 game cards (Snake, Tetris, 2048, Pac-Man, Flappy Bird, Minesweeper), each with a title, thumbnail, and Play button that loads the game in an iframe overlay
- Build a Shows section displaying a responsive grid of at least 6 show cards, each with a title, cover image, and Watch button that opens the video in an embedded iframe or modal
- Store static lists of games and shows in the backend with fields: id, title, description, embedUrl, thumbnailUrl; expose query functions to retrieve each list

**User-visible outcome:** Users can visit NexHub, browse the landing page, use the iframe proxy to load websites, play browser-based games, and watch embedded show/video content — all without logging in.
