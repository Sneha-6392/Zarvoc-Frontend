import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

export default function ProfilePage() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")) || {
    fullName: "John Doe",
    email: "john@example.com",
    phone: "0000000000",
    address: "N/A",
    dob: "N/A",
    gender: "N/A",
    role: "User",
    bio: "No bio added.",
    profileImage: "", // default empty to trigger avatar logic
  };

  const getInitials = (name) => {
    const names = name.trim().split(" ");
    if (names.length === 1) return names[0][0].toUpperCase();
    return (names[0][0] + names[1][0]).toUpperCase();
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/WelcomePage");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white py-10 px-4 flex justify-center items-center">
        <div className="bg-white shadow-2xl rounded-3xl w-full max-w-4xl overflow-hidden transition-all duration-300">
          <div className="flex flex-col md:flex-row p-6 md:p-10 gap-8">
            {/* Profile Image / Initials Avatar */}
            <div className="flex flex-col items-center md:w-1/3">
              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt="Profile"
                  className="w-40 h-40 rounded-full shadow-lg object-cover border-4 border-blue-400"
                />
              ) : (
                <div className="w-40 h-40 rounded-full bg-blue-500 text-white flex items-center justify-center text-5xl font-bold shadow-lg">
                  {getInitials(user.fullName)}
                </div>
              )}

              <h2 className="mt-4 text-2xl font-semibold text-gray-800">{user.fullName}</h2>
              <p className="text-sm text-gray-500">{user.role}</p>

              <button
                onClick={() => navigate("/editprofile")}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Edit Profile
              </button>

              <button
                onClick={handleLogout}
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>

            {/* Profile Details */}
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-4 text-blue-800 border-b pb-2">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Info label="Email" value={user.email} />
                <Info label="Phone" value={user.phone} />
                <Info label="Address" value={user.address} />
                <Info label="Date of Birth" value={user.dob} />
                <Info label="Gender" value={user.gender} />
                <Info label="Role" value={user.role} />
              </div>

              <div className="mt-6">
                <h4 className="text-md font-medium text-gray-700 mb-2">Bio</h4>
                <p className="text-gray-600 text-sm leading-relaxed bg-gray-100 p-3 rounded-md shadow-sm min-h-[60px]">
                  {user.bio || "No bio available."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Reusable info component
function Info({ label, value }) {
  return (
    <div className="bg-gray-50 p-3 rounded-md shadow-sm">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-medium text-gray-800 break-words">{value || "N/A"}</p>
    </div>
  );
}
