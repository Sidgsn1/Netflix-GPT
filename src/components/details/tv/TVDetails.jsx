import { useSelector } from "react-redux";
import { useParams } from "react-router";

import useTvDetails from "../../../hooks/useTvDetails";
import useTvCertification from "../../../hooks/useTvCertification";
import useTvWatchProviders from "../../../hooks/useTvWatchProviders"

const TVDetails = () => {

    const { tvId } = useParams();

    // Fetch TV details
    useTvDetails(tvId);

    // Fetch certification
    useTvCertification(tvId);

    // Fetch watch providers
    useTvWatchProviders(tvId);

    const tv = useSelector(
        (store) => store.tvDetails.data
    );

    const certification = useSelector(
        (store) => store.tvDetails.certification
    );

    const watchProviders = useSelector(
        (store) => store.tvDetails.watchProviders
    );

    console.log("tvId:", tvId);
    console.log("tv:", tv);
    console.log("certification:", certification);
    console.log("watchProviders:", watchProviders);

    if (!tv) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">

            <h1 className="text-4xl text-white p-10">
                {tv.name}
            </h1>

        </div>
    );
};

export default TVDetails;