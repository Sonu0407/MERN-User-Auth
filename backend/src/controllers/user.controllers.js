import User from "../models/user.models.js";
import bcrypt from "bcrypt";
import emailValidator from "node-email-verifier";

export const signup = async (req, res) => {
  try {
    // inputs from body
    const { firstname, lastname, email, password } = req.body;

    // for password
    const maxlength = 8;

    // for password special check
    const regex = {
      upper: /[A-Z]/,
      lower: /[a-z]/,
      digit: /[0-9]/,
      special: /[!@#$%^&*(),.?:{}|<>]/,
    };

    // checking if user already exists or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message:
          "User already exists. Please log in or register with a different email.",
      });
    }

    // password checking function
    function passwordChecker(password) {
      if (password.length < maxlength)
        return `Password must be at least ${maxlength} characters long.`;

      // special characters check
      if (!regex.upper.test(password))
        return "Must contain at least one uppercase letter.";
      if (!regex.lower.test(password))
        return "Must contain at least one lowercase letter.";
      if (!regex.digit.test(password))
        return "Must contain at least one digit.";
      if (!regex.special.test(password))
        return "Must contain at least one special character.";

      return null;
    }

    const passwordError = passwordChecker(password);
    if (passwordError) {
      return res.status(400).json({ message: passwordError });
    }

    // email validating
    const isValid = await emailValidator(email);

    if (!isValid) {
      return res
        .status(406)
        .json({ message: "Invaild Email Please Re-check it." });
    }

    // save newUser to database
    const newUser = new User({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
    });

    // save
    await newUser.save();
    res.status(201).json({
      message: "Registered User Successfully",
      newUser: {
        email: newUser.email,
        firstname: newUser.firstname,
      },
    });
  } catch (error) {
    console.log("Error while creating the user", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    // first lets take the email and password
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    // Check if the provided password matches the stored password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect email or password" });
    } else {
      return res.status(200).json({
        message: "Login successful",
        user: {
          email: user.email,
        },
      });
    }
  } catch (error) {
    console.log("Error while finding user", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
