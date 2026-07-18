import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getProfile, updateProfile } from "../../services/userService";
import useAuth from "../../hooks/useAuth";
import Skeleton from "../common/Skeleton";
const ProfileForm = () => {
  const { updateUser } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setFetching(true);

      const res = await getProfile();

      setFormData({
        username: res.user.username,
        email: res.user.email,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load profile.");
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username.trim() || !formData.email.trim()) {
      return toast.error("All fields are required.");
    }

    try {
      setLoading(true);

      const res = await updateProfile(formData);

      // Update AuthContext + localStorage instantly
      updateUser(res.user);

      toast.success(res.message || "Profile updated successfully.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-5 w-28" />
        <Skeleton className="h-12 w-full rounded-xl" />

        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-12 w-full rounded-xl" />

        <Skeleton className="h-12 w-40 rounded-xl" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Username
        </label>

        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Email
        </label>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 disabled:opacity-60"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
};

export default ProfileForm;
