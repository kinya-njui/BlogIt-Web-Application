import React from "react";
import "./Signup.css";
import { Toaster, toast } from "sonner";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import apiUrl from "../../utils/apiUrl";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  const { mutate, isLoading, isError, eror } = useMutation({
    mutationFn: async (userDetails) => {
      const response = await fetch(`${apiUrl}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });

      console.log(response);

      if (response.ok === false) {
        const error = await response.json();
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      toast.success("Signup successful", {
        duration: 4000,
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    },

    onError: (error) => {
      toast.error(error.message, {
        duration: 3000,
      });
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match", {
        duration: 3000,
      });
      return;
    }
    const newUser = {
      firstName,
      lastName,
      email,
      username,
      password,
    };

    mutate(newUser);
  }
  return (
    <div className="blogs-form-container">
      <h3>Register BlogIt Platform</h3>
      <Toaster richColors position="top-center" />
      <form className="blogs-form">
        <div className="form-group-wrapper">
          <div className="form-group">
            <label htmlFor="first-name" className="form-group-label">
              FirstName
            </label>
            <input
              type="text"
              id="firts-name"
              name="firstName"
              className="form-group-input"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="last-name" className="form-group-label">
              LastName
            </label>
            <input
              type="text"
              id="last-name"
              name="firstName"
              className="form-group-input"
              placeholder="last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-group-label">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-group-input"
            placeholder="Email Address e.g. example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="username" className="form-group-label">
            username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-group-input"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group-wrapper">
          <div className="form-group">
            <label htmlFor="password" className="form-group-label">
              password
            </label>
            <input
              type="text"
              id="password"
              name="password"
              className="form-group-input"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confrim-password" className="form-group-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confrim-password"
              name="confrim-password"
              className="form-group-input"
              placeholder="confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        <button
          type="submit"
          className="submit-button"
          disabled={isLoading}
          onClick={handleSubmit}
        >
          {isLoading ? "registering..." : "click to register"}
        </button>
        <div class="Login-link">
          <p>
            You have an account?
            <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
