import { motion } from "framer-motion";

const DashboardCard = ({
    title,
    value,
    icon,
    color,
}) => {

    return (

        <motion.div

            whileHover={{
                y:-6
            }}

            transition={{
                duration:.25
            }}

            className="
            bg-white
            rounded-3xl
            p-7
            border
            shadow-sm
            "

        >

            <div className="flex justify-between">

                <div>

                    <p
                        className="
                        uppercase
                        tracking-[0.35em]
                        text-xs
                        text-gray-400
                        "
                    >

                        {title}

                    </p>

                    <h2
                        className="
                        text-5xl
                        mt-5
                        "
                        style={{
                            fontFamily:"General Sans SemiBold"
                        }}
                    >

                        {value}

                    </h2>

                </div>

                <div
                    className={`
                    w-14
                    h-14
                    rounded-2xl
                    ${color}
                    flex
                    justify-center
                    items-center
                    text-white
                    `}
                >

                    {icon}

                </div>

            </div>

        </motion.div>

    );

};

export default DashboardCard;