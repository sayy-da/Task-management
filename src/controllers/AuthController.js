import userService from "../services/UserService.js";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name,email,password,'safaa')
    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const user = await userService.register(name, email, password);
    res.status(201).json({ message: "Registered successfully", user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const { user, token } = await userService.login(email, password);
    res.cookie("token", token, cookieOptions);
    res.json({ message: "Logged in successfully", user });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};

export const getMe = (req, res) => {
  res.json({ user: req.user });
};