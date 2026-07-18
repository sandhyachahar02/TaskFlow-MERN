import {
  LayoutDashboard,
  CheckSquare,
  CalendarDays,
  Clock3,
  CheckCircle2,
  FolderKanban,
  Settings,
  LogOut,
  X,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const menu = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    title: "All Tasks",
    icon: CheckSquare,
    path: "/tasks",
  },
  {
    title: "Today",
    icon: CalendarDays,
    path: "/tasks/today",
  },
  {
    title: "Upcoming",
    icon: Clock3,
    path: "/tasks/upcoming",
  },
  {
    title: "Completed",
    icon: CheckCircle2,
    path: "/tasks/completed",
  },
  {
    title: "Categories",
    icon: FolderKanban,
    path: "/categories",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { user, logout } = useAuth();

  return (
    <>
      {/* Overlay */}

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="
          fixed
          inset-0
          bg-black/40
          z-40
          lg:hidden
          "
        />
      )}

      <aside
        className={`
    fixed
    lg:sticky
    lg:top-0
    top-0
    left-0
    z-50
    h-screen
    w-72
    xl:w-80
    bg-white
    border-r
    flex
    flex-col
    overflow-y-auto
    transition-transform
    duration-300
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
    lg:translate-x-0
  `}
      >
        {/* Mobile Close */}

        <div className="lg:hidden flex justify-end p-4">
          <button
            onClick={() => setSidebarOpen(false)}
            className="
            w-10
            h-10
            rounded-xl
            border
            flex
            items-center
            justify-center
            hover:bg-gray-100
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* Logo */}

        <div className="px-8 pt-4 lg:pt-10 pb-8">
          <h1
            className="text-4xl"
            style={{
              fontFamily: "General Sans SemiBold",
            }}
          >
            TaskFlow
          </h1>

          <p
            className="
            uppercase
            text-xs
            tracking-[0.35em]
            text-gray-400
            mt-3
            "
            style={{
              fontFamily: "IBM Plex Mono",
            }}
          >
            SHIP YOUR DAY
          </p>
        </div>

        {/* Navigation */}

        <nav className="flex-1 px-4">
          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `
                  flex
                  items-center
                  gap-4
                  px-5
                  py-4
                  rounded-2xl
                  mb-2
                  transition-all
                  ${isActive ? "bg-black text-white" : "hover:bg-gray-100"}
                  `
                }
              >
                <Icon size={20} />
                {item.title}
              </NavLink>
            );
          })}
        </nav>

        {/* User */}

        <div className="border-t p-6">
          <div className="flex items-center gap-4">
            <div
              className="
              w-12
              h-12
              rounded-full
              bg-black
              text-white
              flex
              items-center
              justify-center
              text-lg
              "
            >
              {user?.username?.charAt(0).toUpperCase()}
            </div>

            <div>
              <h3 className="font-semibold">{user?.username}</h3>

              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="
            w-full
            mt-6
            h-12
            rounded-xl
            border
            hover:bg-gray-100
            transition
            flex
            items-center
            justify-center
            gap-2
            "
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
