const MovieTrailer = ({ videos }) => {

    const trailer = videos?.find(
        (video) =>
            video.site === "YouTube" &&
            video.type === "Trailer"
    );

    if (!trailer) return null;

    return (
        <section id="trailer" className="py-8">

            <h2 className="text-2xl font-semibold text-yellow-100 mb-6">
                Trailer
            </h2>

            <div className="relative w-full aspect-video overflow-hidden rounded-2xl border border-white/10 bg-white/5">

                <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    title={trailer.name}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />

            </div>

        </section>
    );
};

export default MovieTrailer;