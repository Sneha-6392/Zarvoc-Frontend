import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners"; // Import HashLoader

export default function EditProfile() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true); // Add loading state
  const [user, setUser] = useState({
    profileImage: "",
    fullName: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    gender: "",
    role: "",
    bio: "",
  });

  useEffect(() => {
    // Simulate a loading period for 3 seconds
    const timer = setTimeout(() => {
      const savedUser = JSON.parse(localStorage.getItem("user"));
      if (savedUser) {
        setUser(savedUser);
      }
      setLoading(false); // Set loading to false after the simulated delay
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setUser((prev) => ({ ...prev, profileImage: imageURL }));
    }
  };

  const handleRemoveImage = () => {
    setUser((prev) => ({ ...prev, profileImage: "" }));
  };

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/profile");
  };

  // Show loader while loading is true
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        {/* HashLoader component with customizable color and size */}
        <HashLoader color="#3182CE" size={80} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center px-4 py-10">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-3xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
          Edit Your Profile
        </h2>

        {/* Profile Image Upload */}
        <div className="flex flex-col items-center mb-6">
          {user.profileImage ? (
            <img
              src={user.profileImage}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-blue-300 shadow-md object-cover mb-4"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center text-3xl font-bold mb-4 shadow-md">
              {user.fullName
                .split(" ")
                .map((word) => word[0]?.toUpperCase())
                .join("")}
            </div>
          )}

          <div className="flex gap-4">
            <label className="px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 transition">
              Choose File
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>

            <button
              onClick={handleRemoveImage}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              Remove Image
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Full Name" name="fullName" value={user.fullName} onChange={handleChange} />
          <Input label="Email" name="email" value={user.email} onChange={handleChange} />
          <Input label="Phone" name="phone" value={user.phone} onChange={handleChange} />
          <Input label="Date of Birth" name="dob" type="date" value={user.dob} onChange={handleChange} />
          <Select
            label="Gender"
            name="gender"
            value={user.gender}
            onChange={handleChange}
            options={["Male", "Female", "Other"]}
          />
          <Input label="Role" name="role" value={user.role} onChange={handleChange} />
          <Input label="Address" name="address" value={user.address} onChange={handleChange} />
        </div>

        {/* Bio */}
        <div className="mt-4">
          <label className="block text-gray-700 text-sm mb-1">Bio</label>
          <textarea
            name="bio"
            rows="3"
            value={user.bio}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-blue-400 resize-none"
            placeholder="Write something about yourself..."
          />
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="px-5 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// Reusable Input Field
function Input({ label, name, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="block text-gray-700 text-sm mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-blue-400"
        required
      />
    </div>
  );
}

// Gender Select Dropdown
function Select({ label, name, value, onChange, options }) {
  return (
    <div>
      <label className="block text-gray-700 text-sm mb-1">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-blue-400"
        required
      >
        <option value="">Choose Gender</option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
