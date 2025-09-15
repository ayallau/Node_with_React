import express from "express";
import process from "process";
import "./services/passport.js";
//require('./services/passport'); // Old way
import authRoutes from "./routes/authRoutes.js"; // Add this import

const app = express();

app.get("/", (_req, res) => {
  res.send("Welcome to the server!");
});

//require('./routes/authRoutes')(app); // Old way

authRoutes(app); // Use the imported function

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on URL http://localhost:${PORT}`);
});
