import api from "../api/api";

// Get Logged-in User Profile
export const getProfile = async () => {
  const { data } = await api.get("/user/profile");
  return data;
};

// Update Profile
export const updateProfile = async (profileData) => {
  const { data } = await api.put("/user/profile", profileData);
  return data;
};

// Change Password
export const changePassword = async (passwordData) => {
  const { data } = await api.put("/user/change-password", passwordData);
  return data;
};