import { motion } from "framer-motion";

const StatCard = ({ title, value, icon, color }) => {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
      bg-white
      border
      border-gray-200
      rounded-3xl
      shadow-sm
      p-5
      sm:p-6
      min-h-[150px]
      flex
      items-center
      "
    >
      <div className="flex justify-between items-start w-full">
        <div className="flex-1">
          <p
            className="
            uppercase
            tracking-[0.25em]
            sm:tracking-[0.35em]
            text-[10px]
            sm:text-xs
            text-gray-400
            "
            style={{
              fontFamily: "IBM Plex Mono",
            }}
          >
            {title}
          </p>

          <h2
            className="
            mt-4
            text-3xl
            sm:text-4xl
            lg:text-5xl
            leading-none
            "
            style={{
              fontFamily: "General Sans SemiBold",
            }}
          >
            {value}
          </h2>
        </div>

        <div
          className={`
          flex
          items-center
          justify-center
          w-12
          h-12
          sm:w-14
          sm:h-14
          rounded-2xl
          text-white
          ${color}
          `}
        >
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
