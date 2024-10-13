// src/components/Signup.js
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../context/AuthContext";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { setIsLoggedIn, setAuthUser } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!name) {
      validationErrors.name = "Name is required";
    }

    if (!email) {
      validationErrors.email = "Email is required";
    }

    if (!password) {
      validationErrors.password = "Password is required";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log({ name, email, password });
      // Handle signup logic (e.g., API call) here
      try {
        const res = await axios.post("/api/user/signup", {
          email,
          password,
          name,
        });

        if (res.status === 200) {
          localStorage.setItem("email", res.data.email);
          localStorage.setItem("id", res.data.id);
          localStorage.setItem("name", res.data.name);
          setAuthUser({ email: res.data.email, id: res.data.id, name: res.data.name });
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.log(error);
        console.log("Invalid credentials");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-center">Signup</h2>

          <form onSubmit={handleSubmit}>
            {/* Name Input */}
            <div className="form-control">
              <label htmlFor="name" className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                className="input input-bordered"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <span className="text-error text-sm">{errors.name}</span>}
            </div>

            {/* Email Input */}
            <div className="form-control mt-4">
              <label htmlFor="email" className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="input input-bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <span className="text-error text-sm">{errors.email}</span>}
            </div>

            {/* Password Input */}
            <div className="form-control mt-4">
              <label htmlFor="password" className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="input input-bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <span className="text-error text-sm">{errors.password}</span>}
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Signup
              </button>
            </div>
          </form>
          <div className="mt-2 text-center">
            Already have an account
            <Link to="/login" className="underline text-blue-400 pl-2">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
