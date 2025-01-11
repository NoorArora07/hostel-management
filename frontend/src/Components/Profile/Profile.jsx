'use client'

import React, { useState, useEffect } from "react";
import { patchToBackend, getFromBackend } from "@/store/fetchdata";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Skeleton } from "@/Components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { LogOut, User, Mail, Phone, MapPin, Briefcase, Calendar, Edit, Save, X } from "lucide-react";
import { AuroraBackground } from "../ui/aurora-background.tsx";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "@/urls.jsx";

const Profile = () => {
  const navigate = useNavigate();

  const [userProfile, setUserProfile] = useState(null);
  const [editedProfile, setEditedProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getFromBackend(`${baseUrl}/api/profile`);
        setUserProfile(response.data);
        setError(null); // Clear any existing error
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Failed to load profile data.");
      }
    };
    fetchProfile();
  }, []);

  const handleInputChange = (field, value) => {
    if (userProfile[field] !== value) {
      setEditedProfile((prev) => ({ ...prev, [field]: value }));
    } else {
      setEditedProfile((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const handleSaveChanges = async () => {
    try {
      await patchToBackend(`${baseUrl}/api/profile/edit`, editedProfile);
      setUserProfile((prev) => ({ ...prev, ...editedProfile }));
      setEditedProfile({});
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  const handleCancel = () => {
    setEditedProfile({});
    setIsEditing(false);
  };

  const handleLogout = () => {
    navigate("/");
  };

  const getIcon = (key) => {
    switch (key) {
      case "name":
        return <User className="h-4 w-4" />;
      case "email":
        return <Mail className="h-4 w-4" />;
      case "phone":
        return <Phone className="h-4 w-4" />;
      case "address":
        return <MapPin className="h-4 w-4" />;
      case "occupation":
        return <Briefcase className="h-4 w-4" />;
      case "dateOfBirth":
        return <Calendar className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen">
    {/* Aurora Background */}
    <AuroraBackground className="fixed top-0 left-0 right-0 z-0 h-full" />

    <div className="relative z-10 pt-24"> 
      <Card className="w-full items-center justify-between max-w-4xl mx-auto mt-24 shadow-lg">
        <CardHeader className="flex flex-row justify-between items-center pb-2">
          <CardTitle className="text-2xl font-bold">Profile</CardTitle>
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </CardHeader>
        <CardContent>
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : userProfile ? (
            <div className="space-y-8">
              <div className="flex items-center justify-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder-avatar.jpg" alt={userProfile.name} />
                  <AvatarFallback>{userProfile.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-semibold">{userProfile.name || "N/A"}</h2>
                  <p className="text-sm text-muted-foreground">{userProfile.email || "N/A"}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(userProfile || {}).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground flex items-center space-x-2">
                      {getIcon(key)}
                      <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                    </label>
                    {key === "sid" || key === "name" ? (
                      <p className="text-sm font-medium">{value || "N/A"}</p>
                    ) : isEditing ? (
                      <Input
                        type="text"
                        value={editedProfile[key] ?? value}
                        onChange={(e) => handleInputChange(key, e.target.value)}
                        className="max-w-md"
                      />
                    ) : (
                      <p className="text-sm font-medium">{value || "N/A"}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-20 w-20 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          {isEditing ? (
            <div className="flex space-x-2">
              <Button onClick={handleSaveChanges}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </div>
          ) : (
            <Button onClick={() => setIsEditing(true)} className="bg-violet-500 hover:bg-violet-700 font-semibold">
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  </div>
  );
};

export default Profile;
