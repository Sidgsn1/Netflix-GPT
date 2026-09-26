
const WhereToWatch = ({ watchProviders }) => {

    if (!watchProviders) return null;

    const providers = [
        ...(watchProviders.flatrate || []),
        ...(watchProviders.rent || []),
        ...(watchProviders.buy || []),
    ];

    const uniqueProviders = Array.from(
        new Map(
            providers.map((provider) => [
                provider.provider_id,
                provider,
            ])
        ).values()
    );

    return (
        <section className="py-8">

            <div className="flex items-center justify-between mb-5">

                <h2 className="
                    text-xl
                    md:text-2xl
                    font-semibold
                    text-white
                ">
                    Where to Watch
                </h2>

                {uniqueProviders.length > 3 && (
                    <button className="
                        text-sm
                        text-white/50
                        hover:text-white
                        transition
                    ">
                        See All →
                    </button>
                )}

            </div>


            {uniqueProviders.length === 0 ? (

                <p className="text-sm text-white/40">
                    No streaming information available.
                </p>

            ) : (

                <div className="
                    flex
                    gap-3
                    overflow-x-auto
                    no-scrollbar
                    pb-2
                ">

                    {uniqueProviders.map((provider) => (

                        <a
                            key={provider.provider_id}
                            href={watchProviders.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                                shrink-0
                                min-w-[130px]
                                md:min-w-[160px]
                                flex
                                items-center
                                gap-3
                                p-3
                                rounded-xl
                                bg-white/[0.04]
                                border border-white/10
                                hover:bg-white/[0.08]
                                transition
                            "
                        >

                            <img
                                src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                                alt={provider.provider_name}
                                className="
                                    w-10
                                    h-10
                                    rounded-lg
                                "
                            />

                            <span className="
                                text-sm
                                text-white
                                truncate
                            ">
                                {provider.provider_name}
                            </span>

                        </a>

                    ))}

                </div>

            )}

        </section>
    );
};

export default WhereToWatch;