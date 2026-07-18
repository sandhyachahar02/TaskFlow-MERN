import { Bell, CheckCircle2, User, ClipboardCheck } from "lucide-react";

const notifications = [
  {
    id: 1,
    icon: <Bell size={18} className="text-blue-500" />,
    title: "Welcome to TaskFlow",
    time: "Just now",
  },
  {
    id: 2,
    icon: <User size={18} className="text-green-500" />,
    title: "Profile updated successfully",
    time: "2 mins ago",
  },
  {
    id: 3,
    icon: <ClipboardCheck size={18} className="text-purple-500" />,
    title: "Task marked as completed",
    time: "5 mins ago",
  },
];

const NotificationDropdown = ({ open }) => {
  if (!open) return null;

  return (
    <div
      className="
        absolute
        right-0
        top-14
        w-80
        rounded-2xl
        bg-white
        border
        shadow-xl
        z-50
        overflow-hidden
      "
    >
      <div className="px-5 py-4 border-b">
        <h3 className="font-semibold text-lg">Notifications</h3>
      </div>

      <div className="max-h-80 overflow-y-auto">
        {notifications.map((item) => (
          <div
            key={item.id}
            className="
              flex
              gap-4
              px-5
              py-4
              hover:bg-gray-50
              transition
            "
          >
            <div>{item.icon}</div>

            <div className="flex-1">
              <p className="font-medium text-sm">{item.title}</p>

              <p className="text-xs text-gray-400 mt-1">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationDropdown;
