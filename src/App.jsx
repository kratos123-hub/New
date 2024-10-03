import React, { useState } from "react";
import {
  HashRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom"; // Use HashRouter for routing
import image from "./assets/images.jpeg";
import "./App.css";
import Home from "./Home/Home";
import HIH from "./HIH/HIH.jsx";
import Hanumanjee from "./Hanumanjee/Hanuman";
import Jyotisar from "./Jyotisar/Jyotisar";
import LucknowLibrary from "./LucknowLibrary/Lucknow";
import JEX from "./JEX/JEX";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import Projects from "./Projects/Projects.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route index element={<Auth />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/HIH" element={<HIH />} />
        <Route path="/Hanumanjee" element={<Hanumanjee />} />
        <Route path="/Jyotisar" element={<Jyotisar />} />
        <Route path="/LucknowLibrary" element={<LucknowLibrary />} />
        <Route path="/JEX" element={<JEX />} />
        <Route path="/Projects" element={<Projects />} />
      </Routes>
      <Footer />
    </Router>
  );
}

function Auth() {
  const [signIn, toggle] = useState(true);
  const navigate = useNavigate(); // useNavigate hook for redirection

  // State variables for login and signup
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupError, setSignupError] = useState("");
  const [loginError, setLoginError] = useState("");

  // Regex for email and strong password validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const strongPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // At least 8 characters, including 1 letter and 1 number

  // Set API_URL based on environment
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  // Handle Sign In submission
  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoginError(""); // Reset any previous errors

    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: loginEmail,
        password: loginPassword,
      }),
    });

    const data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token); // Store JWT token
      alert("Login successful");
      // Redirect to home page after login success
      navigate("/Home"); // Corrected path to "/Home"
    } else {
      setLoginError("Login failed: " + data.message);
    }
  };

  // Handle Sign Up submission
  const handleSignUp = async (e) => {
    e.preventDefault();
    setSignupError(""); // Reset any previous errors

    // Validate email and password
    if (!emailRegex.test(signupEmail)) {
      setSignupError("Invalid email format");
      return;
    }

    if (!strongPasswordRegex.test(signupPassword)) {
      setSignupError(
        "Password must be at least 8 characters long, and include at least one letter and one number."
      );
      return;
    }

    // Call the signup API
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: signupName,
        email: signupEmail,
        password: signupPassword,
      }),
    });

    const data = await response.json();
    if (data.message === "User registered successfully") {
      alert("Signup successful");
      // Redirect to login page after successful signup
      toggle(true); // Switch to login view
    } else {
      setSignupError("Signup failed: " + data.message);
    }
  };

  return (
    <div className="body">
      <div className={`container-main ${signIn ? "" : "right-panel-active"}`}>
        {/* Sign Up Container */}
        <div className="sign-up-container">
          <form className="form" onSubmit={handleSignUp}>
            <h1 className="title">Register</h1>
            <input
              className="input"
              type="text"
              placeholder="Name"
              value={signupName}
              onChange={(e) => setSignupName(e.target.value)}
            />
            <input
              className="input"
              type="email"
              placeholder="Email"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
            />
            <input
              className="input"
              type="password"
              placeholder="Password"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
            />
            <button className="button" type="submit">
              Sign Up
            </button>
            {signupError && <p style={{ color: "red" }}>{signupError}</p>}
          </form>
        </div>

        {/* Sign In Container */}
        <div className="sign-in-container">
          <form className="form" onSubmit={handleSignIn}>
            <h1 className="title">Login</h1>
            <input
              className="input"
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <input
              className="input"
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <a className="anchor" href="#">
              Forgot your password?
            </a>
            <button className="button" type="submit">
              Sign In
            </button>
            {loginError && <p style={{ color: "red" }}>{loginError}</p>}
          </form>
        </div>

        {/* Overlay Container */}
        <div className="overlay-container">
          <div className="overlay">
            {/* Left Overlay Panel */}
            <div className="overlay-panel left-overlay-panel">
              <img src={image} alt="Not Found" />
              <div className="title">
                <h1>Welcome Back!</h1>
              </div>
              <p className="paragraph">
                Enter your personal details to use all of <br />
                the site's features.
              </p>
              <button className="ghost-button" onClick={() => toggle(true)}>
                Sign In
              </button>
            </div>

            {/* Right Overlay Panel */}
            <div className="overlay-panel right-overlay-panel">
              <img src={image} alt="Not Found" />
              <div className="title">
                <h1>Hello, Friend!</h1>
              </div>
              <p className="paragraph">
                Register your personal details to use <br /> all of the site's
                features.
              </p>
              <button
                className="ghost-button"
                onClick={() => {
                  toggle(false);
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
