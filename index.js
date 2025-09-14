import express from "express";
import process from "process";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import keys from "./config/keys.js";

const app = express();

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("accessToken:", accessToken);
      console.log("refreshToken:", refreshToken);
      console.log("profile:", profile);
      // Here, you would typically find or create a user in your database
      // For this example, we'll just return the profile object
      console.log("done:", done);
    },
  ),
);

app.get("/", (req, res) => {
  res.send("Welcome to the server!");
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

app.get("/auth/google/callback", passport.authenticate("google"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on URL http://localhost:${PORT}`);
});
