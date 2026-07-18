import { Bell, Menu, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import NotificationDropdown from "./NotificationDropdown";
import useAuth from "../../hooks/useAuth";

const Navbar = ({ setSidebarOpen }) => {
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const hour = new Date().getHours();
  const navigate = useNavigate();
  let greeting = "GOOD EVENING";

  if (hour < 12) greeting = "GOOD MORNING";
  else if (hour < 17) greeting = "GOOD AFTERNOON";

  return (
    <header
      className="
      px-4
      sm:px-6
      lg:px-10
      xl:px-12
      pt-6
      lg:pt-10
      "
    >
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
        {/* Left */}

        <div className="flex items-start gap-4">
          {/* Mobile Hamburger */}

          <button
            onClick={() => setSidebarOpen(true)}
            className="
            lg:hidden
            w-11
            h-11
            rounded-xl
            border
            bg-white
            flex
            items-center
            justify-center
            hover:bg-gray-100
            transition
            "
          >
            <Menu size={22} />
          </button>

          <div>
            <p
              className="
              uppercase
              tracking-[0.25em]
              sm:tracking-[0.35em]
              lg:tracking-[0.45em]
              text-[10px]
              sm:text-xs
              text-gray-400
              "
              style={{
                fontFamily: "IBM Plex Mono",
              }}
            >
              {greeting}
            </p>

            <h1
              className="
              text-3xl
              sm:text-4xl
              lg:text-5xl
              xl:text-6xl
              leading-tight
              "
              style={{
                fontFamily: "General Sans SemiBold",
              }}
            >
              {user?.username} — let's focus.
            </h1>
          </div>
        </div>

        {/* Right */}

        <div
          className="
          flex
          flex-wrap
          items-center
          gap-2
          sm:gap-3
          lg:gap-4
          "
        >
          <button
            onClick={() => navigate("/tasks")}
            className="
    w-10 h-10
    sm:w-11 sm:h-11
    lg:w-12 lg:h-12
    rounded-full
    border
    bg-white
    hover:bg-gray-100
    transition
    flex
    items-center
    justify-center
  "
          >
            <Search size={18} />
          </button>

          <div className="relative">
            <button
              onClick={() => setShowNotifications((prev) => !prev)}
              className="
      w-10 h-10
      sm:w-11 sm:h-11
      lg:w-12 lg:h-12
      rounded-full
      border
      bg-white
      hover:bg-gray-100
      transition
      flex
      items-center
      justify-center
    "
            >
              <Bell size={18} />
            </button>

            <NotificationDropdown open={showNotifications} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
