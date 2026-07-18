import { Moon, Plus } from "lucide-react";
import Button from "../common/Button";
import useAuth from "../../hooks/useAuth";

const DashboardHeader = () => {

    const { user } = useAuth();

    const hour = new Date().getHours();

    let greeting = "GOOD EVENING";

    if(hour < 12)
        greeting = "GOOD MORNING";

    else if(hour < 17)
        greeting = "GOOD AFTERNOON";

    return (

        <div className="flex justify-between items-start">

            <div>

                <p
                    className="
                    uppercase
                    tracking-[0.45em]
                    text-gray-400
                    text-xs
                    "
                    style={{
                        fontFamily:"IBM Plex Mono"
                    }}
                >
                    {greeting}
                </p>

                <h1
                    className="
                    mt-4
                    text-[58px]
                    leading-none
                    "
                    style={{
                        fontFamily:"General Sans SemiBold"
                    }}
                >
                    {user?.username?.toLowerCase()} — let's focus.
                </h1>

            </div>

            <div className="flex gap-5">

                <button
                    className="
                    w-12
                    h-12
                    rounded-full
                    border
                    flex
                    items-center
                    justify-center
                    hover:bg-gray-100
                    transition
                    "
                >
                    <Moon size={20}/>
                </button>

                <Button className="rounded-full px-8 py-3">

                    <Plus size={18}/>

                    <span className="ml-2">

                        New task

                    </span>

                </Button>

            </div>

        </div>

    );

};

export default DashboardHeader;