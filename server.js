require("dotenv").config();

const express = require("express");
const app = express();
const port = 3000;
const routes = require("./routes/articleRoutes");
const dbInitialSetup = require("./dbInitialSetup");
const passport = require("./passport/passportConfig");
const passportConfig = require("./passport/passportConfig");
const makeUserAvailableInViews = require("./middlewares/makeUserAvailableInViews");

passportConfig(app);

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(makeUserAvailableInViews);

app.use(routes);
dbInitialSetup();

app.listen(port, () => console.log(`Servidor corriendo en el puerto ${port}`));
