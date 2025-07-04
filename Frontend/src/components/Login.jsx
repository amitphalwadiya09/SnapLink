import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "@/redux/authSlice";
import "../Styles/Login.css";
import ParticlesComponent from "./particles";
const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        "https://snaplink-lxa1.onrender.com/api/v1/user/login",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setAuthUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
        setInput({
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
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
          <h1 className="logo">Login</h1>
          <p className="sub-heading">
            Connect and share moments with your world
          </p>
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
            Login
          </button>
        )}

        <p className="signup-link">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600">
            SignUp
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
