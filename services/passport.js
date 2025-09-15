//const passport = require('passport'); // Old way
import passport from "passport";
//const GoogleStrategy = require('passport-google-oauth20').Strategy; // Old way
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import keys from "../config/keys.js";

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
