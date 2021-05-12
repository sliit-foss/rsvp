const passport = require("passport");
const User = require("./user.model");
import { HTTP_STATUS } from "../../utils/http";
import logger from "../../utils/logger";

module.exports = {
  async adminRegister(req, res, next) {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
    });

    const user = await User.register(newUser, req.body.password);
    res.json({user});
  },

  // Admin login
  adminLogin(req, res, next) {
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
    })(req, res, next);
  },

  // GET /logout
  getLogout(req, res, next) {
    req.logout();
    res.redirect("/");
  },
};
