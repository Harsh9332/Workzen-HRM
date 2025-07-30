import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./utilis/AuthContext";
import axios from "axios";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Login = ({ onLoginClick, handleSignUpClick }) => {
  const [loginType, setLoginType] = useState("");
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showSignUpButton, setShowSignUpButton] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginType = (type) => {
    setLoginType(type);
    setFormData({ username: "", password: "" });
    setErrors({ username: "", password: "" });
    setShowPassword(false);
    setShowSignUpButton(type === "applicant");
  };

  const handleSubmit = async () => {
    const { username, password } = formData;
    let newErrors = { username: "", password: "" };

    if (!username.trim()) newErrors.username = "Username is required";
    if (!password.trim()) newErrors.password = "Password is required";

    if (newErrors.username || newErrors.password) {
      setErrors(newErrors);
      return;
    }

    try {
      const endpoint =
        loginType === "admin"
          ? "http://localhost:5000/api/login_admin"
          : loginType === "employee"
            ? "http://localhost:5000/api/login_employee"
            : "http://localhost:5000/api/login";

      const response = await axios.post(
        endpoint,
        { email: username, password },
        { withCredentials: true }
      );

      login(response.data);
      onLoginClick(loginType);
    } catch (error) {
      alert("Invalid username or password. Please try again.");
    }
  };

  return (
    <div class="auth-background">
      <div className="login-container">
        <div className="login-box">
          <h2>Welcome to HRM</h2>

          <div className="login-buttons">
            {["admin", "employee", "applicant"].map((type) => (
              <button
                key={type}
                className={loginType === type ? "active" : ""}
                onClick={() => handleLoginType(type)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          {showSignUpButton && (
            <p className="signup-text">
              Not registered yet?{" "}
              <button onClick={handleSignUpClick} className="sign-up-btn">
                Sign Up
              </button>
            </p>
          )}

          <div className="input-group">
            <input
              type="text"
              name="username"
              placeholder="Email"
              value={formData.username}
              onChange={handleInputChange}
              className={errors.username ? "input-error" : ""}
            />
            {errors.username && <p className="error-message">{errors.username}</p>}
          </div>

          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className={errors.password ? "input-error" : ""}
            />
            <button className="toggle-password" onClick={togglePasswordVisibility}>
              {showPassword ? <AiFillEyeInvisible size={20} color="#ffffff" /> : <AiFillEye size={20} color="#ffffff" />}
            </button>
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>

          {/* <div className="remember-forgot">
          <input type="checkbox"/> Remember me
        </div> */}

          <button className="login-btn" onClick={handleSubmit}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
