import { useNavigate } from "react-router-dom";
import { AlertTriangle, Home } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] px-6">
      <div className="max-w-lg text-center">
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center">
            <AlertTriangle size={48} className="text-red-500" />
          </div>
        </div>

        <h1
          className="mt-8 text-7xl font-bold"
          style={{
            fontFamily: "General Sans SemiBold",
          }}
        >
          404
        </h1>

        <h2 className="mt-4 text-3xl font-semibold">Page Not Found</h2>

        <p className="mt-4 text-gray-500 leading-7">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          className="
            mt-8
            px-8
            py-3
            rounded-xl
            bg-black
            text-white
            flex
            items-center
            gap-2
            mx-auto
            hover:bg-neutral-800
            transition
          "
        >
          <Home size={18} />
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default NotFound;
