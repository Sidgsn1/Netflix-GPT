import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTrendingToday,
  addTrendingWeek,
} from "../utils/moviesSlice";
import {
  API_OPTIONS,
  TRENDING_TODAY_API,
  TRENDING_WEEK_API,
} from "../utils/constants";

const useTrendingMedia = () => {
  const dispatch = useDispatch();

  const { trendingToday, trendingWeek } = useSelector(
    (store) => store.movies
  );

  const getTrendingMedia = async () => {
    const [todayRes, weekRes] = await Promise.all([
      fetch(TRENDING_TODAY_API, API_OPTIONS),
      fetch(TRENDING_WEEK_API, API_OPTIONS),
    ]);

    const [todayJson, weekJson] = await Promise.all([
      todayRes.json(),
      weekRes.json(),
    ]);

    dispatch(addTrendingToday(todayJson.results));
    dispatch(addTrendingWeek(weekJson.results));
  };

  useEffect(() => {
    if (!trendingToday || !trendingWeek) {
      getTrendingMedia();
    }
  }, []);
};

export default useTrendingMedia;