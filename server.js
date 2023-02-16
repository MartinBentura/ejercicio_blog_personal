require("dotenv").config();

const express = require("express");
const app = express();
const port = 3000;
const routes = require("./routes/articleRoutes");
const dbInitialSetup = require("./dbInitialSetup");
const passport = require("./passport/passportConfig");
const passportConfig = require("./passport/passportConfig");

passportConfig(app);

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(makeUserAvailableInViews);

function makeUserAvailableInViews(req, res, next) {
  res.locals.user = req.user;
  return next();
}
module.exports = makeUserAvailableInViews;

app.use(routes);
dbInitialSetup();

app.listen(port, () => console.log(`Servidor corriendo en el puerto ${port}`));
