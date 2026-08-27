import { IMG_CDN_URL } from "../../../utils/constants";
import NoPosterExist from "../../../assets/images/noPoster.png";

const MoreLikeThis = ({ media }) => {

    if (!media || media.length === 0) return null;

    return (
        <section className="px-6 py-8">

            <h2 className="text-2xl font-semibold text-yellow-100">
                More Like This
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4 mt-6">

                {media.map((item) => {

                    const title = item.title || item.name;

                    return (
                        <div
                            key={item.id}
                            className="group cursor-pointer"
                        >

                            <div className="aspect-[2/3] rounded-xl overflow-hidden bg-white/5 border border-white/10">

                                <img
                                    src={
                                        item.poster_path
                                            ? IMG_CDN_URL + item.poster_path
                                            : NoPosterExist
                                    }
                                    alt={title}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />

                            </div>

                            <div className="mt-3">

                                <h3 className="text-sm font-medium text-white truncate">
                                    {title}
                                </h3>

                                <div className="flex items-center gap-2 mt-1 text-xs text-white/40">

                                    <span>
                                        {
                                            (
                                                item.release_date ||
                                                item.first_air_date
                                            )?.split("-")[0] || "-"
                                        }
                                    </span>

                                    <span>•</span>

                                    <span>
                                        ⭐ {item.vote_average?.toFixed(1) || "N/A"}
                                    </span>

                                </div>

                            </div>

                        </div>
                    );
                })}

            </div>

        </section>
    );
};

export default MoreLikeThis;