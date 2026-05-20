import { Link, useNavigate } from "react-router";
import "../styles/SignUpPage.css";
import { useState } from "react";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    // console.log(firstname); // testing purpose
    // console.log(lastname);
    // console.log(email);
    // console.log(password);

    // try catch block
    try {
      const url = "http://localhost:3000/api/user/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.status == 400) {
        return toast.error(data.message);
      } else {
        navigate("/");
        return toast.success(data.message);
      }
    } catch (error) {
      console.log("Error while posting the data to database", error);
      toast.error("Not able to create an account.");
    }
  };

  return (
    <div className="signup-container">
      <h1>Sign up</h1>
      <form className="signup-form">
        {/* for fristname */}
        <div className="login-form-email">
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            placeholder="Enter your FirstName"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        {/* // for lastname */}
        <div className="login-form-email">
          <label htmlFor="name">Last Name</label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Enter your LastName"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
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
        {/* for password */}
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
        <div className="signup-actions">
          <button type="submit" onClick={(e) => handleSignup(e)}>
            Sign up
          </button>
          <h4>
            Already have an account?{" "}
            <Link className="link" to={"/"}>
              Log in
            </Link>
          </h4>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
