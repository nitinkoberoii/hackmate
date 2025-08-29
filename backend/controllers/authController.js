import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const TOKEN_COOKIE_NAME = "hm_token";
const TOKEN_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

function signToken(user) {
  const payload = { sub: user._id.toString(), email: user.email, name: user.name };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: TOKEN_TTL_SECONDS });
}

function setAuthCookie(res, token) {
  const isProd = process.env.NODE_ENV === "production";
  res.cookie(TOKEN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    maxAge: TOKEN_TTL_SECONDS * 1000,
    path: "/",
  });
}

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email and password are required" });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ error: "Email already registered" });
    }

    // Basic password strength check
    const strongEnough = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
    if (!strongEnough) {
      return res.status(400).json({ error: "Password must be 8+ chars with upper, lower, digit" });
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email: email.toLowerCase(), password_hash });
    const token = signToken(user);
    setAuthCookie(res, token);
    return res.status(201).json({
      message: "Registration successful",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !user.password_hash) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = signToken(user);
    setAuthCookie(res, token);
    return res.json({
      message: "Login successful",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const me = async (req, res) => {
  try {
    // req.user is set by auth middleware
    return res.json({ user: req.user });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const logout = async (_req, res) => {
  const isProd = process.env.NODE_ENV === "production";
  res.clearCookie(TOKEN_COOKIE_NAME, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    path: "/",
  });
  return res.json({ message: "Logged out" });
};


