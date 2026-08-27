import { deleteDoc, doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore"
import { db } from "./firebase"
import { collection, getDocs } from "firebase/firestore";

export const addMovieToWatchlist = async (uid,movie,mediaType)=>{

    const finalMediaType = mediaType || movie.media_type || "movie";
    const movieRef = doc(
        db,
        "users",
        uid,
        "watchlist",
        `${finalMediaType}_${movie.id}`
    );

    const watchlistMovie = {
        movieId: movie.id,
        mediaType: finalMediaType,

        title: movie.title || movie.name,
        overview: movie.overview,

        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,

        vote_average: movie.vote_average,

        release_date: movie.release_date || movie.first_air_date,

        genre_ids: movie.genre_ids,

        addedAt: serverTimestamp(),
    };

    await setDoc(movieRef,watchlistMovie)
    // return watchlistMovie
    const snapshot = await getDoc(movieRef);

    return snapshot.data();
}

export const getWatchlist = async (uid) => {
    const watchlistRef = collection(
        db,
        "users",
        uid,
        "watchlist"
    )
    const snapshot = await getDocs(watchlistRef)

    return snapshot.docs.map(doc=>doc.data())
}

export const removeMovieFromWatchlist = async (
    uid,
    movieId,
    mediaType
) => {
    console.log("Deleting:", `${mediaType}_${movieId}`);
    const movieRef = doc(
        db,
        "users",
        uid,
        "watchlist",
        `${mediaType}_${movieId}`
    );

    await deleteDoc(movieRef);
}