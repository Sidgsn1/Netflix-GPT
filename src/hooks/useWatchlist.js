import { useDispatch, useSelector } from "react-redux"
import { getWatchlist } from "../utils/firestore"
import { setWatchlist } from "../utils/watchlistSlice"
import { useEffect } from "react"



const useWatchlist = ()=>{
    const user = useSelector(store=>store.user)
    const dispatch = useDispatch()

    const fetchWatchlist = async ()=>{
        if(!user) return

        const movies = await getWatchlist(user.uid)

        dispatch(setWatchlist(movies))
    }

    useEffect(()=>{
        fetchWatchlist()
    },[user])
}

export default useWatchlist