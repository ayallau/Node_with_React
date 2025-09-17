import passport from "passport";

// module.exports = app => { // Old way

const authRoutes = (app) => {
  // Initiate Google OAuth flow
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] }),
  );
  // Handle the callback after Google has authenticated the user
  app.get("/auth/google/callback", passport.authenticate("google"));

  // Route to get the current logged-in user
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });

  // Route to log out the user
  app.get("/api/logout", (req, res) => {
    req.logout(() => {
      res.redirect("/");
    });
  });
};
export default authRoutes;
