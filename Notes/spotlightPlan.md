# CINEVO — Final Product & UX Specification

---

# 1. Product Philosophy

CINEVO is a **movie and TV discovery platform**, not a streaming platform.

The core user journey is:

> **Discover → Explore → Understand → Decide where/how to watch**

CINEVO should not feel like a Netflix clone.

The goal is to combine:

- TMDB for movie and TV metadata
- CINEVO user activity for trending searches
- Gemini for AI-powered discovery and recommendations

The platform should help users answer:

> **"What should I watch?"**

and:

> **"Where can I watch it?"**

rather than trying to become another streaming service.

---

# 2. Spotlight Search

## Opening the Spotlight

The navbar contains a compact search button:

**⌕ Search `⌘ K`**

The Spotlight can be opened by:

- Clicking the Search button
- Pressing `⌘ K` on macOS
- Pressing `Ctrl K` on Windows/Linux
- Pressing `Esc` to close

The background should become dimmed/blurred and the Spotlight should smoothly appear in the center of the screen.

The Spotlight should feel similar to a system-level search experience such as macOS Spotlight:

- Fast
- Minimal
- Keyboard friendly
- Focused
- Non-destructive
- Easy to dismiss

The user should never feel like they have navigated away from the current page just because they opened search.

---

# 3. Spotlight Modes

The Spotlight has two modes:

```text
┌─────────────────────────────────────────────┐
│ 🔍 Search movies, TV shows, people...       │
│                              ⌘ K             │
├──────────────────────┬──────────────────────┤
│      🔍 Search       │       ✦ Ask AI       │
└──────────────────────┴──────────────────────┘
```

There should be two clearly separated experiences:

## Search

Normal TMDB-powered search.

The user can search for:

- Movies
- TV Shows
- People

For example:

```text
interstellar
```

Results should appear in a clean grid/card layout.

The Search mode should prioritize speed and direct results.

---

## Ask AI

The user can switch to the AI-powered discovery experience.

Ask AI is intended for natural-language requests rather than traditional title searches.

Examples:

```text
Something like Interstellar
```

```text
Best psychological thrillers
```

```text
Something under 2 hours
```

```text
Give me a dark sci-fi series
```

---

# 4. Search Mode — Empty State

When the user opens Spotlight but has not typed anything yet, show useful discovery content instead of an empty screen.

The layout can contain:

```text
┌─────────────────────────────────────────────┐
│ 🔍 Search movies, TV shows, people...       │
├─────────────────────────────────────────────┤
│                                             │
│ Recent Searches          Trending Now       │
│                                             │
│ ◷ Interstellar           ↗ Superman         │
│ ◷ The Last of Us         ↗ Stranger Things │
│ ◷ Oppenheimer            ↗ The Last of Us   │
│ ◷ Breaking Bad           ↗ Wednesday       │
│ ◷ Dune                   ↗ Dune             │
│                          ↗ Oppenheimer      │
│                          ↗ Deadpool & ...   │
│                                             │
└─────────────────────────────────────────────┘
```

## Recent Searches

Recent Searches should come from the current user's own search history.

Example:

```text
◷ Interstellar
◷ The Last of Us
◷ Oppenheimer
◷ Breaking Bad
◷ Dune
```

The user should be able to:

- Click a recent search
- Re-run that search
- Remove an individual search
- Clear all recent searches

---

## Important Naming Rule

Initially, use:

> **Trending Now**

Do **not** call it:

> **Trending Searches**

when the data is coming from TMDB.

The reason is simple:

If TMDB says a movie is trending, that does not mean CINEVO users are searching for it.

Therefore:

### TMDB data

Use:

> **Trending Now**

### CINEVO user search data

Use:

> **Trending Searches**

This keeps the UI truthful.

---

# 5. Trending System

The trending system has two phases.

## Phase 1 — CINEVO has insufficient search data

When the platform is new and there are not enough CINEVO search events, use TMDB's trending data.

The logic is:

```text
TMDB Trending
      ↓
Movies + TV Shows
      ↓
Select top 7
      ↓
"Trending Now"
      ↓
Display inside Spotlight
```

Example:

```text
Trending Now

↗ Superman
↗ Stranger Things
↗ The Last of Us
↗ Wednesday
↗ Dune
↗ Oppenheimer
↗ Deadpool & Wolverine
```

This ensures that the Spotlight is useful from day one.

The user should never see an empty "Trending Searches" section simply because CINEVO is a new platform.

---

## Phase 2 — CINEVO has sufficient search data

Once enough real CINEVO search data exists, automatically switch to CINEVO's own search analytics.

The logic becomes:

```text
CINEVO User Searches
        ↓
Search Events
        ↓
Aggregate Recent Searches
        ↓
Rank by Popularity + Recency
        ↓
Select Top 5–6
        ↓
"Trending Searches"
        ↓
Display inside Spotlight
```

Example:

```text
Trending Searches

↗ Stranger Things
↗ Interstellar
↗ Oppenheimer
↗ The Dark Knight
↗ Breaking Bad
↗ Dune
```

The important difference is that these are now genuinely based on what people are searching for on CINEVO.

---

# 6. Trending Search Data Rules

Do not count every keystroke as a search.

For example, if the user types:

```text
i
in
int
inte
inter
interstellar
```

this should NOT create six separate search events.

That would produce completely inaccurate trending data.

A search event should be recorded when:

- The user presses Enter
- The user selects an actual search result

For example:

```text
User types:
interstellar

User presses Enter
        ↓
Record "interstellar"
```

or:

```text
User types:
interstellar

User clicks:
Interstellar — Movie
        ↓
Record "interstellar"
```

---

## Search Data Should Also:

- Ignore empty searches
- Ignore obvious garbage queries
- Prevent rapid duplicate searches from being counted repeatedly
- Use recent search data
- Consider unique users
- Prevent a single user from manipulating the trending list

The purpose is to measure actual user interest, not keyboard activity.

---

# 7. Trending Ranking

Trending should not simply be:

```text
Most searches ever
```

because that would make old popular movies stay permanently at the top.

Instead, the ranking should consider:

```text
Search popularity
+
Recency
+
Number of unique users
```

Conceptually:

```text
Trending Score =
Search Count
× Recency Weight
× Unique User Weight
```

For example:

```text
200 users searched "Interstellar" last week
```

should rank higher than:

```text
500 searches for "Old Movie"
six months ago
```

The exact formula can be adjusted later based on real usage.

The important UX principle is:

> **Trending should reflect what users are interested in right now.**

---

# 8. Ask AI Mode

When the user selects:

> **Ask AI**

the Spotlight switches into an AI discovery interface.

The AI layer uses Gemini.

The purpose of Ask AI is not simply to search for a title.

It should allow users to describe what they want naturally.

Example empty state:

```text
┌─────────────────────────────────────────────┐
│ ✦ Ask AI about movies & TV shows...         │
└─────────────────────────────────────────────┘

Try asking

"Something like Interstellar"

"Best psychological thrillers"

"Funny movies under 2 hours"

"Give me a dark sci-fi series"
```

---

## Example AI Queries

Users could ask:

```text
Find me something like Interstellar.
```

```text
Give me a dark crime series.
```

```text
What should I watch if I liked Dune?
```

```text
Find something under 2 hours.
```

```text
Recommend a thriller from my watchlist.
```

```text
Give me a sci-fi movie with a strong mystery.
```

The AI should interpret the intent and use structured TMDB data to find relevant content.

Gemini should not be treated as the source of truth for movie metadata.

TMDB remains the primary source for factual entertainment data.

---

# 9. Inspired by Your Watchlist

Inside Ask AI, show a small personalized recommendation section:

```text
Inspired by your watchlist                  Explore all →

[ Poster ]   [ Poster ]   [ Poster ]   [ Poster ]

Movie A      Movie B       Movie C      Movie D
```

This section is intended to give the user immediate personalized discovery without requiring them to type anything.

The recommendations can be based on:

- Movies in the user's watchlist
- TV shows in the user's watchlist
- Genres
- Themes
- Similar titles
- TMDB recommendation/similarity data
- Gemini's interpretation of the user's preferences

---

## Important UX Rule

Do not show too many recommendations inside Spotlight.

Spotlight is a quick interaction surface.

It should show only a small number of recommendations, for example:

- 4 cards
- 5 cards
- At most around 6 cards depending on the layout

Do not turn Spotlight into a full recommendation dashboard.

---

# 10. Explore All Recommendations

When the user clicks:

> **Explore all →**

the Spotlight should close.

The user should then be taken to a dedicated recommendation page.

Example:

```text
← Back

Inspired by Your Watchlist

Movies & TV shows recommended
based on your watchlist.

[ All ] [ Movies ] [ TV Shows ]

Sort: Relevance ▾

┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐
│   POSTER   │ │   POSTER   │ │   POSTER   │ │   POSTER   │
│            │ │            │ │            │ │            │
│   Movie    │ │   Movie    │ │   Movie    │ │   Movie    │
│   ★ 8.4    │ │   ★ 8.1    │ │   ★ 7.9    │ │   ★ 8.0    │
└────────────┘ └────────────┘ └────────────┘ └────────────┘

┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐
│   POSTER   │ │   POSTER   │ │   POSTER   │ │   POSTER   │
└────────────┘ └────────────┘ └────────────┘ └────────────┘
```

The dedicated page can support:

- Full grid
- Movie/TV filters
- Sorting
- Relevance
- Genre filters
- Infinite scroll or pagination
- More recommendations

---

## UX Principle

The distinction is:

> **Spotlight = Quick Discovery**

> **Dedicated Page = Deep Exploration**

The user should not be forced to interact with a large complicated modal just to explore recommendations.

---

# 11. Movie Detail Page

The movie detail page should have a clear hierarchy.

The user should be able to understand the movie without being overwhelmed by information.

The structure should be:

```text
Hero
↓
Cast & Crew
↓
More Like This
↓
Where to Watch
↓
Details
↓
Trailer
```

---

## Hero

Include:

- Backdrop
- Poster
- Title
- Release year
- Runtime
- Certification
- Genres
- Rating
- Vote count
- Overview
- Add/Remove Watchlist button
- Trailer button

The hero should remain visually cinematic and uncluttered.

The hero should communicate the most important information first.

---

# 12. Cast & Crew

Cast & Crew should be a **full-width section**.

Example:

```text
Cast & Crew                                      View All →

[ Person ] [ Person ] [ Person ] [ Person ] [ Person ]

Arjun Malik
as Ethan Cole

Meera Sharma
as Dr. Ava Singh

Rohan Verma
as Marcus
```

Each item can contain:

- Profile image
- Person name
- Character name for actors
- Job for crew members where appropriate

Use a horizontal scrolling carousel when there are many people.

---

## View All

If the movie has a large cast and crew, the user can click:

> **View All →**

and open a dedicated cast/crew view.

The main movie page should only show a curated selection.

---

# 13. More Like This

Show related movies in a horizontal carousel.

Example:

```text
More Like This                                  View All →

[ Poster ] [ Poster ] [ Poster ] [ Poster ] [ Poster ] [ Poster ]

  ★ 8.1      ★ 7.8      ★ 8.0      ★ 7.9      ★ 8.2
```

Recommendations can come from:

- TMDB similar movies
- TMDB recommendation data
- Genre similarity
- User behavior
- Future CINEVO recommendation systems

The purpose is to help the user continue discovering content without returning to search.

---

# 14. Where to Watch

CINEVO is a discovery platform, so streaming availability is an important part of the experience.

Show where the movie or TV show is currently available.

Example:

```text
Where to Watch

┌────────────────────────────────────────────────────────┐
│ Netflix       Included with subscription    Watch Now ↗│
└────────────────────────────────────────────────────────┘
```

The streaming service/provider information should come from available provider data.

CINEVO itself does not host or stream the movie.

---

## Multiple Streaming Services

If multiple services are available:

```text
Where to Watch

┌────────────────────────────────────────────────────────┐
│ Netflix       Included with subscription    Watch Now ↗│
├────────────────────────────────────────────────────────┤
│ Prime Video   Included with subscription    Watch Now ↗│
├────────────────────────────────────────────────────────┤
│ Apple TV      Rent / Buy                    View ↗     │
└────────────────────────────────────────────────────────┘
```

The exact services depend on the available provider data and the user's region.

---

# 15. When No Streaming Service Is Available

Do not show a fake streaming button.

Instead, clearly communicate the state.

Example:

```text
Where to Watch

Currently unavailable for streaming
in your region.
```

If the API provides other legal availability options, they can be shown.

For example:

```text
Available to rent or buy

Apple TV
Amazon
Google TV
```

The key rule is:

> Never pretend that CINEVO can stream something when it cannot.

---

# 16. Movie Details

Show technical information in a clean, compact card.

Example:

```text
Details

STATUS
Released

RELEASE DATE
July 24, 2026

RUNTIME
2h 14m

ORIGINAL LANGUAGE
English

BUDGET
$200,000,000

GENRES
Action   Adventure   Sci-Fi
```

---

## Information Hierarchy

Do not display every field returned by the API.

Only show information that provides value to the user.

Important information can include:

- Status
- Release date
- Runtime
- Original language
- Budget
- Revenue
- Genres
- Production companies
- Country of origin

The exact fields can depend on the available TMDB data.

The goal is:

> **Useful information, not information overload.**

---

# 17. Trailer

Use a dedicated trailer section.

Example:

```text
Trailer

┌──────────────────────────────────────────────────────┐
│                                                      │
│                         ▶                            │
│                                                      │
└──────────────────────────────────────────────────────┘
```

The trailer should be visually prominent but should not dominate the entire page.

Use available trailer/video data.

If no trailer is available, the section should either be hidden or display a clear unavailable state rather than an empty broken player.

---

# 18. TV Series Detail Page

TV shows should have a different structure from movies.

A TV show is not simply a movie with more information.

The main difference is:

> **A TV show has seasons and episodes.**

Therefore, the TV detail page should focus on season discovery.

The hero contains:

- Backdrop
- Poster
- Title
- Year
- Genres
- Rating
- Overview
- Watchlist button
- Trailer button

Then the page moves into season information.

---

# 19. Current Season

The main TV detail page should show the current/latest season.

Example:

```text
Current Season

┌─────────────────────────────────────────────────────────┐
│                                                         │
│  [ POSTER ]    Season 4                                 │
│                ★ 8.2                                    │
│                2026 • 8 Episodes                        │
│                                                         │
│                Season overview...                       │
│                                                         │
│                Episode 1 • upcoming...                   │
│                                                         │
└─────────────────────────────────────────────────────────┘

View All Seasons →
```

The purpose of this section is simply to communicate:

> **This is the current season.**

Do not dump all episodes onto the main TV detail page.

---

## Current Season Information

Show useful information such as:

- Season number
- Year
- Number of episodes
- Season rating if available
- Season overview
- Latest/upcoming episode information

The section should remain compact.

---

# 20. View All Seasons

When the user clicks:

> **View All Seasons →**

show a dedicated seasons interface.

Example:

```text
Seasons

┌─────────────────────────────────────────┐
│ Season 1                                │
│ 10 Episodes                             │
│ 2023                                    │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Season 2                                │
│ 8 Episodes                              │
│ 2024                                    │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Season 3                                │
│ 8 Episodes                              │
│ 2025                                    │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Season 4                                │
│ 8 Episodes                              │
│ 2026                                    │
└─────────────────────────────────────────┘
```

The user can select any season.

For example:

```text
Season 2
```

↓

Open the Season 2 episode page.

---

# 21. Season Episode Page

When the user selects a season, for example:

> **Season 2**

open a dedicated season page.

Example:

```text
Season 2

8 Episodes

Sort: Episode Order ▾
```

Then display every episode.

The layout should be inspired by the information density of TMDB, but adapted to CINEVO's visual design.

Each episode should be easy to scan.

---

# 22. Episode Card

Each episode should contain:

- Thumbnail
- Episode number
- Episode title
- Rating
- Air date
- Runtime
- Overview

Example:

```text
┌────────────────────────────────────────────────────────────┐
│                                                            │
│ [ THUMBNAIL ]   1   Welcome to Margrave                    │
│                                                            │
│                 ★ 7.6   February 3, 2022 • 54m             │
│                                                            │
│                 Reacher is wrongly accused of murder       │
│                 while visiting the small town of            │
│                 Margrave, Georgia.                         │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

The thumbnail provides visual context.

The text provides the important metadata.

The user should be able to quickly scan:

> Episode number → Title → Rating → Date → Runtime → Overview

---

# 23. Episode UX Rules

CINEVO is a discovery platform.

Therefore, episode cards should NOT include:

- Expand buttons
- Play Now buttons
- Streaming controls

The user can click an episode if a deeper episode-detail experience is required, but the primary purpose is discovery.

---

## Why No Play Button?

Because CINEVO does not host the content.

The platform should not create the expectation that clicking:

> Play Now

will start the episode.

Instead, CINEVO should help users understand:

- What the episode is about
- When it aired
- How long it is
- How well it was received

If streaming availability is relevant, it belongs in the appropriate "Where to Watch" experience.

---

# 24. Overall CINEVO Architecture

The overall system can be thought of as three major layers:

```text
                         CINEVO
                            │
          ┌─────────────────┼─────────────────┐
          │                 │                 │
         TMDB             CINEVO            Gemini
       Metadata           Analytics            AI
          │                 │                 │
          ▼                 ▼                 ▼
    Movies / TV       Trending Searches   Smart Discovery
    Details           Search Analytics    Recommendations
    Seasons
    Episodes
    Cast
    Genres
    Providers
```

---

## TMDB Layer

TMDB provides the core entertainment information.

## CINEVO Analytics Layer

CINEVO learns what its own users are doing.

## Gemini Layer

Gemini provides natural-language discovery and AI-powered recommendations.

These three systems should have clearly separated responsibilities.

---

# 25. Responsibility of Each System

## TMDB

TMDB provides the core entertainment metadata.

Potential data includes:

- Movies
- TV shows
- People
- Posters
- Backdrops
- Genres
- Ratings
- Vote counts
- Seasons
- Episodes
- Cast
- Crew
- Trailers/video metadata where available
- Similar content
- Recommended content
- Trending content
- Streaming/provider availability where available

TMDB should be treated as the primary factual source for entertainment metadata.

---

## CINEVO

CINEVO owns its own application-specific data.

This includes:

- User search history
- Trending searches
- Watchlist
- User interactions
- Personalized signals
- Search analytics
- Recommendation history
- User preferences

For example:

```text
User searches "Interstellar"
        ↓
CINEVO records search event
        ↓
Search analytics
        ↓
Trending system
```

---

## Gemini

Gemini handles the AI discovery layer.

Examples:

```text
"Find me something like Interstellar."
```

```text
"Give me a dark crime series."
```

```text
"What should I watch if I liked Dune?"
```

```text
"Find something under 2 hours."
```

```text
"Recommend a thriller from my watchlist."
```

Gemini should help interpret the user's intent.

It should not be allowed to invent factual movie information.

The application should use structured TMDB data to validate and display actual titles and metadata.

---

# 26. Final Search Experience & Product Rules

The complete Spotlight experience should work like this:

```text
User
 │
 │ Click Search / Cmd+K
 ▼
Spotlight Opens
 │
 ├───────────────┐
 │               │
 ▼               ▼
Search          Ask AI
 │               │
 │               ├── AI Prompt
 │               │
 │               └── Inspired by Your Watchlist
 │                          │
 │                          └── Explore All
 │
 ├── Empty State
 │      │
 │      ├── Recent Searches
 │      │
 │      └── Trending Now / Trending Searches
 │
 └── User Types
        │
        ▼
   TMDB Search
        │
        ▼
   Grid Results
```

---

## Final Trending Logic

The final implementation should be:

```text
IF CINEVO has insufficient recent search data:

    Show:
    "Trending Now"

    Source:
    TMDB Trending Movies + TV Shows

    Display:
    Top 7


ELSE:

    Show:
    "Trending Searches"

    Source:
    CINEVO User Search Analytics

    Display:
    Top 5–6
```

This transition should happen automatically.

There should be no need for an administrator to manually change the Spotlight.

---

# Final UX Principles

## 1. Keep Spotlight Lightweight

Do not dump every possible feature into the Spotlight.

The Spotlight is for:

> **Fast search + quick discovery**

It should be:

- Fast
- Focused
- Minimal
- Keyboard friendly
- Easy to close

---

## 2. Keep Detail Pages Informative but Structured

Do not display every piece of TMDB data.

Prioritize:

1. What is it?
2. Is it good?
3. What is it about?
4. Who is in it?
5. Where can I watch it?
6. What else is similar?
7. For TV shows: What seasons and episodes exist?

---

## 3. Separate Discovery From Streaming

CINEVO should help the user answer:

> **"What should I watch?"**

and:

> **"Where can I watch it?"**

It should not pretend to be the streaming service itself.

---

# Final CINEVO Product Identity

CINEVO should feel like:

> **TMDB + intelligent search + personalized discovery**

rather than:

> **Netflix clone + streaming UI**

The three core pillars are:

```text
DISCOVER
   ↓
TMDB + Trending + Search

EXPLORE
   ↓
Movie / TV / Season / Episode pages

PERSONALIZE
   ↓
Watchlist + Gemini AI + User behavior
```

The final philosophy is:

> **TMDB tells CINEVO what's available.**

> **Users tell CINEVO what's trending.**

> **Gemini helps users figure out what they should discover next.**