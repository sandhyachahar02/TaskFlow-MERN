const AuthInput = ({ label, ...props }) => {
    return (
        <div className="mb-10">

            <label
                className="block mb-4 uppercase tracking-[0.45em] text-xs text-gray-500"
                style={{
                    fontFamily: "IBM Plex Mono"
                }}
            >
                {label}
            </label>

            <input
                {...props}
                className="
                w-full
                h-16
                rounded-2xl
                border
                border-gray-200
                bg-white
                px-6
                text-lg
                outline-none
                transition-all
                duration-300
                focus:border-black
                focus:shadow-lg
                "
            />

        </div>
    );
};

export default AuthInput;