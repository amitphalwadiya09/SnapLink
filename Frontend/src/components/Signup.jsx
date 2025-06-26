import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import "../Styles/Login.css";
import ParticlesComponent from "./particles";

const Signup = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        "https://snaplink-lxa1.onrender.com/api/v1/user/register",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
        setInput({
          username: "",
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.log(error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message); // this will show "User already exists" if returned by backend
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);
  return (
    <div className="login-container">
      <ParticlesComponent id="particles" />
      <form onSubmit={signupHandler} className="form-box">
        <div className="form-heading">
          <h1 className="logo">Register</h1>
          <p className="sub-heading">
            Signup to see photos & videos from your friends
          </p>
        </div>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={input.username}
            onChange={changeEventHandler}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            className="form-input"
          />
        </div>
        {loading ? (
          <button className="form-button loading">
            <span className="loader"></span> Please wait
          </button>
        ) : (
          <button type="submit" className="form-button">
            Register
          </button>
        )}
        <p className="signup-link">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
