import React, { useState, useEffect } from "react";
import "./UpdateProfile.css";
import { Toaster, toast } from "sonner";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import apiUrl from "../../utils/apiUrl";
import useDetailStore from "../../utils/useDetailStore";

function UpdateProfile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [previousPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const navigate = useNavigate();

  const user = useDetailStore((state) => state.user);

  // Fetch user profile data
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setUsername(user.username);
    }
  }, [user]);

  // Update user profile mutation
  const { mutate: updateProfile, isLoading: isUpdating } = useMutation({
    mutationFn: async (updatedProfile) => {
      const response = await fetch(`${apiUrl}/profile/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProfile),
        credentials: "include",
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      toast.success("Profile updated successfully!", { duration: 3000 });
      setTimeout(() => navigate("/profile"), 2000);
    },
    onError: (error) => {
      toast.error(error.message, { duration: 3000 });
    },
  });

  // Update user password mutation
  const { mutate, isLoading: isUpdatingPassword } = useMutation({
    mutationFn: async (passwordData) => {
      const response = await fetch(`${apiUrl}/profile/update-password`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(passwordData),
        credentials: "include",
      });
      console.log("response-pass", response);
      if (response.ok === false) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const data = await response.json();
      console.log("data-pass", data);
      return data;
    },
    onSuccess: () => {
      toast.success("Password updated successfully!", { duration: 3000 });
    },
    onError: (error) => {
      toast.error(error.message, { duration: 3000 });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProfile = { firstName, lastName, email, username };
    updateProfile(updatedProfile);
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      toast.error("New password and confirm password do not match.", {
        duration: 3000,
      });
      return;
    }
    const passwordData = { previousPassword, newPassword };
    console.log(passwordData);
    mutate(passwordData);
  };

  if (isUpdating) return <p>Loading profile data...</p>;

  return (
    <div className="update-profile-container">
      <div className="profile-form-container">
        <h3>Update Profile</h3>
        <Toaster position="top-center" richColors />
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              id="first-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="form-group-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              id="last-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="form-group-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-group-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-group-input"
            />
          </div>
          <button type="submit" className="submit-button" disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
      // Password update form
      <div className="password-form-container">
        <h3>Update Password</h3>
        <form onSubmit={handlePasswordUpdate} className="password-form">
          <div className="form-group">
            <label htmlFor="current-password">Current Password</label>
            <input
              type="password"
              id="current-password"
              value={previousPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="form-group-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="new-password">New Password</label>
            <input
              type="password"
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-group-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-new-password">Confirm New Password</label>
            <input
              type="password"
              id="confirm-new-password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="form-group-input"
            />
          </div>
          <button
            type="submit"
            className="submit-button"
            disabled={isUpdatingPassword}
          >
            {isUpdatingPassword ? "Updating Password..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile;
