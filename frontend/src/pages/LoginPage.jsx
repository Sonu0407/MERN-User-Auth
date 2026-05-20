import { Link, useNavigate } from "react-router";
import "../styles/LoginPage.css";
import { useState } from "react";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // fetch
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const url = "http://localhost:3000/api/user/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.status === 401) {
        return toast.error(data.message);
      } else {
        navigate("/homepage");
        return toast.success(data.message);
      }

      // console.log(data);
    } catch (error) {
      console.log("Error while logging In", error);
      toast.error("Error in logging");
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form className="login-form">
        {/* for email */}
        <div className="login-form-email">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {/* // for password */}
        <div className="login-form-email">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="login-actions">
          <button type="submit" onClick={(e) => handleLogin(e)}>
            Login
          </button>
          <h4>
            Don't have an account yet?{" "}
            <Link className="link" to={"/signup"}>
              Sign up
            </Link>
          </h4>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
