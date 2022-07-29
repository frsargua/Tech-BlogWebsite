const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const helpers = require("./utils/helpers");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const routes = require("./controllers/index");
const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3002;

const hbs = exphbs.create({ helpers });

const sess = {
  secret: "sequelize",
  cookie: {
    maxAge: 86400,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
