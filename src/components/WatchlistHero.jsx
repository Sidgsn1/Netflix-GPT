import { useSelector } from "react-redux";
// import watchlistBg from "../assets/images/watchlistBg.png";
import watchlistBgMobile from "../assets/images/watchlistbgmobile.png"
import watchlistBgPc from "../assets/images/watchlistBgpc.png"
import { ArrowLeft, Bookmark } from "lucide-react";
import { useNavigate } from "react-router";

const WatchlistHero = () => {
  const watchlistMovies = useSelector(
    (store) => store.watchlist.movies
  );

  const user = useSelector((store) => store.user);

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <section className=" relative h-[410px] md:h-[420px] overflow-hidden flex justify-center">

      {/* Background */}

      <div className="absolute inset-0">
        <picture>
          <source
            media="(min-width: 768px)"
            srcSet={watchlistBgPc}
          />

          <img
            src={watchlistBgMobile}
            alt=""
            className="w-full h-full object-cover object-center"
          />
        </picture>
      </div>


      {/* Black Overlay */}

      <div className="absolute inset-0 bg-black/25" />


      {/* Bottom Gradient */}

      <div
        className=" absolute inset-0 bg-gradient-to-b from-transparent  via-black/20  to-[#09090B]"/>

      {/* Back Button */}

      <button
        onClick={handleGoBack}
        className=" absolute top-26 left-4 md:top-28 md:left-10 lg:left-12 z-30
        flex h-10 w-10 md:h-12 md:w-12  items-center justify-center
        rounded-full border border-white/10  bg-black/20 backdrop-blur-md text-white
        transition-all duration-300
        hover:scale-105  hover:border-violet-500/50  hover:bg-violet-500/10
        cursor-pointer" >
        <ArrowLeft
          size={20}
          className="md:w-6 md:h-6"
        />
      </button>


      {/* Content */}

      <div
        className=" relative z-20 flex flex-col items-center text-center pt-26 px-4"
      >

        {/* Profile Image */}

        <div
          className="
            w-28 h-28
            md:w-32 md:h-32

            rounded-full
            overflow-hidden

            border-2
            border-violet-400/70

            shadow-[0_0_30px_rgba(139,92,246,0.35)]

            bg-zinc-900
          "
        >
          <img
            src={
              user?.photoURL ||
              "https://ui-avatars.com/api/?name=User&background=18181b&color=fff"
            }
            alt={user?.displayName || "User"}
            className="
              w-full
              h-full
              object-cover
            "
          />
        </div>


        {/* Username */}

        <h2
          className="
            mt-2
            text-xl
            md:text-2xl
            font-bold
            text-white
          "
        >
          {user?.displayName || "User"}
        </h2>


        {/* Title */}

        <h1
          className="
            mt-3
            text-3xl
            sm:text-4xl
            md:text-5xl
            font-bold
            text-white
          "
        >
          My{" "}
          <span className="text-violet-500">
            Watchlist
          </span>
        </h1>


        {/* Description */}

        <p
          className="
            mt-3
            text-sm
            md:text-base
            text-zinc-300
            max-w-xl
          "
        >
          Movies and shows you've saved to watch later
        </p>


        {/* Count + Status */}

        <div
          className="
            flex
            items-center
            gap-3
            md:gap-4
            mt-5
          "
        >

          {/* Items */}

          <div
            className="
              flex
              items-center
              gap-1.5
              px-3
              py-1
              rounded-lg
              border
              border-zinc-700/50
              bg-black/20
            "
          >
            <Bookmark
              className="text-violet-500"
              size={18}
            />

            <h4 className="text-sm md:text-base text-white">
              <span className="text-violet-500">
                {watchlistMovies.length}
              </span>{" "}
              Items
            </h4>
          </div>


          {/* Divider */}

          <div className="bg-zinc-300/50 w-[1px] h-5" />


          {/* Status */}

          <div className="text-xs md:text-sm text-zinc-300">
            {watchlistMovies.length === 0
              ? "Nothing saved yet"
              : "Updated just now"}
          </div>

        </div>

      </div>

    </section>
  );
};

export default WatchlistHero;