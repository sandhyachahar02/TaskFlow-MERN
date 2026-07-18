import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const PasswordInput = ({
    label,
    ...props
}) => {

    const [show, setShow] = useState(false);

    return (

        <div className="mb-8">

            <label

                className="
                block
                mb-4
                uppercase
                tracking-[0.35em]
                text-xs
                text-gray-500
                "

                style={{
                    fontFamily:"IBM Plex Mono"
                }}

            >

                {label}

            </label>

            <div className="relative">

                <input

                    {...props}

                    type={show ? "text":"password"}

                    className="
                    w-full
                    h-16
                    rounded-2xl
                    border
                    px-6
                    pr-16
                    outline-none
                    "

                />

                <button

                    type="button"

                    onClick={() => setShow(!show)}

                    className="
                    absolute
                    right-5
                    top-5
                    "

                >

                    {

                        show

                        ? <EyeOff/>

                        : <Eye/>

                    }

                </button>

            </div>

        </div>

    );

};

export default PasswordInput;