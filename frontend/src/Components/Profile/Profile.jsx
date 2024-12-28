import React, { useState, useEffect } from "react";
import { patchToBackend, getFromBackend } from "../../store/fetchdata";

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null); // Original profile from backend
  const [editedProfile, setEditedProfile] = useState({}); // Tracks changed fields
  const [isEditing, setIsEditing] = useState(false); // Toggles edit mode

  // Fetch user profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getFromBackend("http://127.0.0.1:5090/api/profile");
        setUserProfile(response.data); // Set fetched profile data
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  // Handle input change for editable fields
  const handleInputChange = (field, value) => {
    if (userProfile[field] !== value) {
      setEditedProfile((prev) => ({
        ...prev,
        [field]: value, // Update the edited field
      }));
    } else {
      // Remove from `editedProfile` if reverted to original value
      setEditedProfile((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  // Save changes to backend
  const handleSaveChanges = async () => {
    try {
      await patchToBackend("http://127.0.0.1:5090/api/profile/edit", editedProfile);
      setUserProfile((prev) => ({ ...prev, ...editedProfile })); // Update UI
      setEditedProfile({});
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setEditedProfile({});
    setIsEditing(false);
  };

  return (
    <div className="w-full px-4 md:px-8 py-16 mt-16">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md p-8"> {/* Increased width */}
        <h1 className="text-3xl font-bold text-dark-teal mb-6 text-center font-mono ">Profile</h1>
        {userProfile ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> {/* Flex/Grid layout */}
              {Object.entries(userProfile).map(([key, value]) => (
                <div key={key} className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-700 capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </label>
                  {key === "sid" || key === "name" ? (
                    // Non-editable fields
                    <p className="text-gray-800 mt-1 bg-gray-100 p-3 rounded-md">
                      {value}
                    </p>
                  ) : isEditing ? (
                    // Editable fields
                    <input
                      type="text"
                      value={editedProfile[key] ?? value} // Show edited value if available, otherwise original
                      onChange={(e) => handleInputChange(key, e.target.value)}
                      className="w-full border border-blue-500 rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-400"
                      style={{ backgroundColor: "#f0f9ff" }} // Highlighted appearance
                    />
                  ) : (
                    // Display value when not editing
                    <p className="text-gray-800 mt-1 bg-gray-100 p-3 rounded-md">
                      {value}
                    </p>
                  )}
                </div>
              ))}
            </div>
            {isEditing ? (
              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleSaveChanges}
                  className="bg-light-teal hover:bg-dark-teal text-white font-semibold py-2 px-4 rounded-md"
                >
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="mt-6 w-full bg-light-teal hover:bg-dark-teal text-white font-semibold py-2 px-4 rounded-md"
              >
                Edit Profile
              </button>
            )}
          </div>
        ) : (
          <p className="text-gray-700">Loading profile...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
