const WhereToWatch = ({ watchProviders }) => {

    if (!watchProviders) return null;

    const providers = [
        ...(watchProviders.flatrate || []),
        ...(watchProviders.rent || []),
        ...(watchProviders.buy || []),
    ];

    if (providers.length === 0) {
        return (
            <section className="px-6 py-8">
                <h2 className="text-2xl font-semibold text-white">
                    Where to Watch
                </h2>

                <p className="mt-2 text-white/50">
                    No streaming information available.
                </p>
            </section>
        );
    }

    // Remove duplicate providers
    const uniqueProviders = Array.from(
        new Map(
            providers.map((provider) => [
                provider.provider_id,
                provider
            ])
        ).values()
    );

    return (
        <section className="px-6 py-8">

            <h2 className="text-2xl font-semibold text-white">
                Where to Watch
            </h2>

            <div className="flex flex-wrap gap-4 mt-5">

                {uniqueProviders.map((provider) => (

                    <div
                        key={provider.provider_id}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10"
                    >

                        <img
                            src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                            alt={provider.provider_name}
                            className="w-10 h-10 rounded-lg"
                        />

                        <span className="text-white">
                            {provider.provider_name}
                        </span>

                    </div>

                ))}

            </div>

        </section>
    );
};

export default WhereToWatch;