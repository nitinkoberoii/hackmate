import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const requireAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.hm_token || (req.headers.authorization?.startsWith("Bearer ") ? req.headers.authorization.split(" ")[1] : undefined);
    if (!token) return res.status(401).json({ error: "Unauthorized" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.sub).select("_id name email");
    if (!user) return res.status(401).json({ error: "Unauthorized" });
    req.user = { id: user._id.toString(), name: user.name, email: user.email };
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};


