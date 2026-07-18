const OverviewSection = () => {

    return (

        <section className="mt-20">

            <p
                className="
                uppercase
                tracking-[0.45em]
                text-xs
                text-gray-400
                "
                style={{
                    fontFamily:"IBM Plex Mono"
                }}
            >
                OVERVIEW
            </p>

            <h2
                className="text-7xl mt-6 leading-none"
                style={{
                    fontFamily:"General Sans SemiBold"
                }}
            >
                Your day,
                <br />
                at a glance.
            </h2>

        </section>

    );

};

export default OverviewSection;