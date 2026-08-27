Haan, ab jo **4 designs** tune banaye hain unko dekh ke architecture clear hai. Aur honestly, ab humein components random banane nahi chahiye. **Movie aur TV ka page alag rakhenge, lekin genuinely reusable cheezein shared hongi.**

Tere current designs ke hisaab se main structure ye rakhunga:

---

# 1. Overall folder structure

```text
src/
│
├── components/
│   │
│   ├── details/
│   │   ├── shared/
│   │   │   ├── DetailHero.jsx
│   │   │   ├── WatchProviders.jsx
│   │   │   ├── CastSection.jsx
│   │   │   ├── CastCard.jsx
│   │   │   ├── MoreLikeThis.jsx
│   │   │   ├── MovieCard.jsx
│   │   │   ├── Rating.jsx
│   │   │   ├── GenrePills.jsx
│   │   │   └── BackButton.jsx
│   │   │
│   │   ├── movie/
│   │   │   ├── MovieDetails.jsx
│   │   │   └── MovieTrailer.jsx
│   │   │
│   │   └── tv/
│   │       ├── CurrentSeason.jsx
│   │       ├── AboutShow.jsx
│   │       ├── SeasonTabs.jsx
│   │       ├── SeasonList.jsx
│   │       ├── SeasonCard.jsx
│   │       ├── SeasonHero.jsx
│   │       ├── EpisodeList.jsx
│   │       └── EpisodeCard.jsx
│
├── pages/
│   ├── MovieDetailsPage.jsx
│   ├── TVDetailsPage.jsx
│   ├── TVSeasonsPage.jsx
│   └── TVSeasonDetailsPage.jsx
│
├── hooks/
│   ├── useMovieDetails.js
│   ├── useMovieCertification.js
│   ├── useMovieWatchProviders.js
│   │
│   ├── useTVDetails.js
│   ├── useTVCertification.js
│   ├── useTVWatchProviders.js
│   ├── useTVSeason.js
│   └── useTVSeasonDetails.js
│
└── utils/
    ├── movieDetailsSlice.js
    └── tvDetailsSlice.js