import { deleteDoc, doc, serverTimestamp, setDoc } from "firebase/firestore"
import { db } from "./firebase"
import { collection, getDocs } from "firebase/firestore";

export const addMovieToWatchlist = async (uid,movie)=>{
    const movieRef = doc(
        db,
        "users",uid,
        "watchlist",movie.id.toString()
    )

    const watchlistMovie = {
        movieId: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
        release_date: movie.release_date,
        genre_ids: movie.genre_ids,
        addedAt: serverTimestamp()
    }

    await setDoc(movieRef,watchlistMovie)
    return watchlistMovie
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

export const removeMovieFromWatchlist = async (uid, movieId) => {

    const movieRef = doc(
        db,
        "users",
        uid,
        "watchlist",
        movieId.toString()
    );

    await deleteDoc(movieRef);
}