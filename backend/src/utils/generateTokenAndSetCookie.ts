import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (res: any, userId: string) => {
  const token = jwt.sign(
    { id: userId },
    process.env.JWT_SECRET || "default_secret",
    { expiresIn: "7d" }
  );
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  });

  res.setHeader("Authorization", `Bearer ${token}`);
};

export default generateTokenAndSetCookie;
