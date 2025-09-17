import express from "express";
import process from "process";
import "./models/User.js";
import "./services/passport.js";
//require('./services/passport'); // Old way
import authRoutes from "./routes/authRoutes.js"; // Add this import
import mongoose from "mongoose";
import cookieSession from "cookie-session";
// import session from "express-session";
import passport from "passport";
import keys from "./config/keys.js";

mongoose.connect(keys.mongoURI);

const app = express();

// Middleware to handle cookies and sessions
// app.use(
//   session({
//     secret: keys.cookieKey,
//     resave: false,
//     saveUninitialized: false,
//     // cookie: { secure: true } // enable if using HTTPS
//   }),
// );

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys: [keys.cookieKey], // Encryption key
  }),
);

// Initialize Passport and use session
app.use(passport.initialize());
app.use(passport.session());

// Basic route to test server
app.get("/", (_req, res) => {
  res.send("Welcome to the server!");
});

//require('./routes/authRoutes')(app); // Old way

authRoutes(app); // Use the imported function

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on URL http://localhost:${PORT}`);
});
