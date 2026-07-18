import { LoaderCircle } from "lucide-react";

const AuthButton = ({
    loading,
    children,
    ...props
}) => {

    return (

        <button

            {...props}

            className="
            mt-8
            w-full
            h-16
            rounded-full
            bg-black
            text-white
            text-xl
            font-semibold
            transition-all
            hover:scale-[1.02]
            hover:bg-neutral-900
            active:scale-100
            flex
            justify-center
            items-center
            gap-3
            "

        >

            {

                loading

                ?

                <>

                    <LoaderCircle
                        className="animate-spin"
                        size={20}
                    />

                    Signing in...

                </>

                :

                children

            }

        </button>

    );

};

export default AuthButton;