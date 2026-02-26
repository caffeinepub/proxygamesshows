# Specification

## Summary
**Goal:** Redesign the site UI to match the EDUrocks 2-column card grid layout with a dark maroon/near-black background and neon blue accents, and add new Music and Live TV sections.

**Planned changes:**
- Replace the entire site color scheme: dark maroon/near-black background (~#1a0a1a), all accent colors (icon badges, borders, glow, buttons, active nav links) switched to neon blue (#00bfff)
- Redesign the homepage to display a 2-column responsive card grid (single column on mobile) matching the EDUrocks layout, with 7 section cards: Games, Proxy, Movies & TV, Music, Apps, Hacks, Live TV — each with a neon blue rounded-square icon badge, bold title, and short description
- Clicking each card smooth-scrolls to the corresponding section anchor on the page
- Update the Navigation bar to include all 7 section links in order: Games, Proxy, Movies & TV, Music, Apps, Hacks, Live TV — with neon blue active highlighting and updated mobile hamburger menu
- Apply the neon blue theme consistently to HeroSection, Navigation, all section headers, cards, and Footer
- Add a new Music section (id="music") with at least 6 music/radio stream cards (e.g., Lofi Girl, SomaFM, RadioGarden, NTS Radio, BBC Radio 1, KEXP), each with a neon blue icon badge, name, description, and a Listen/Play button that loads the embed in an iframe overlay
- Add a new Live TV section (id="livetv") with at least 6 live TV channel cards (e.g., NASA TV, ABC News Live, CBS News, Bloomberg TV, DW News, France 24), each with a neon blue icon badge, channel name, description, and a Watch Live button that loads the embed in an iframe overlay
- Retain all existing sections (Games, Proxy, Movies & TV, Apps, Hacks) and their existing modals/players

**User-visible outcome:** The site has a full dark maroon/neon blue EDUrocks-inspired redesign with a 2-column section card grid on the homepage, a new Music section with embedded radio/stream players, and a new Live TV section with embedded live channel players, all accessible from the updated navigation.
