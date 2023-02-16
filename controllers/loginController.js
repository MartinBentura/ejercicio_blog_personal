const { User } = require("../models");
const bcrypt = require("bcryptjs");
const passport = require("passport");

async function loginIndex(req, res) {
  return res.render("login");
}

const login = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
});

module.exports = {
  loginIndex,
  login,
};
