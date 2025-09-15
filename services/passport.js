//const passport = require('passport'); // Old way
import passport from "passport";
//const GoogleStrategy = require('passport-google-oauth20').Strategy; // Old way
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import keys from "../config/keys.js";
import mongoose from "mongoose";
import { log } from "console";

const User = mongoose.model("users");

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile) => {
      new User({ googleId: profile.id }).save().then((user) => {
        log(user);
      });
    },
  ),
);
