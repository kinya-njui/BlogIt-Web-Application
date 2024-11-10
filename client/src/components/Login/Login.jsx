import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { useState } from "react";
import { useMutation } from "react-query";
import apiUrl from "../../utils/apiUrl";
import { useNavigate } from "react-router-dom";
import useDetailStore from "../../utils/useDetailStore";

function Login() {
  const setUser = useDetailStore((state) => state.setUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: async (userDetails) => {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userDetails),
      });

      if (response.ok === false) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      return data;
    },

    onSuccess: (user) => {
      setUser(user);
      navigate("/blogs");
      toast.success("logged in success", {
        duration: 2000,
      });
    },

    onError: (error) => {
      toast.error(error.message, {
        duration: 3000,
      });
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) {
      toast.error("Enter your email", {
        duration: 3000,
      });
      return;
    }
    if (!password) {
      toast.error("Enter your password", {
        duration: 3000,
      });
      return;
    }
    mutate({ email, password });
  }

  return (
    <div>
      <div className="blogs-form-container">
        <Toaster richColors position="top-center" />
        <h3>Welcome back to BlogIt!</h3>
        <form className="blogs-form">
          <div className="form-group">
            <label htmlFor="username" className="form-group-label">
              username or email
            </label>
            <input
              type="text"
              id="username"
              name="usernameOrEmail"
              className="form-group-input"
              placeholder="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-group-label">
              password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-group-input"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="submit-button"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            Submit
          </button>
          <div class="Signup-link">
            <p>
              Don't have an account?
              <Link to="/signup">Signup</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
