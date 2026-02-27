# Specification

## Summary
**Goal:** Expand the Games section to 100 game entries and the Movies & TV section to 100 show/movie entries, with browsing filters for both.

**Planned changes:**
- Expand the backend hardcoded games array in `backend/main.mo` to at least 100 entries spanning a wide variety of genres (action, puzzle, arcade, racing, strategy, IO, platformer, sports, shooter, idle, etc.), retaining all existing entries
- Expand the backend hardcoded shows array in `backend/main.mo` to at least 100 entries spanning a wide variety of genres (drama, comedy, action, thriller, sci-fi, anime, documentary, horror, romance, crime, fantasy, etc.) with a mix of TV shows and movies, retaining all existing entries
- Update `GamesSection.tsx` fallback array to mirror the full 100-game list and add a search/filter input or genre filter badges to help browse the large catalog
- Update `ShowsSection.tsx` fallback array to mirror the full 100-entry list and add a search/filter input or genre filter badges to help browse the large catalog

**User-visible outcome:** Users can browse 100 games and 100 movies/TV shows, with search or genre filters to easily find content. All existing player modals remain functional.
