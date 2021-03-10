require("dotenv").config();
require("./config/mongo");
require("./config/passport");

// base dependencies
const createError = require("http-errors");
const express = require("express");
const path = require("path");
// const cookieParser = require("cookie-parser");
const logger = require("morgan");
const hbs = require("hbs");
// dependencies for authentication
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const passport = require("passport");
const flash = require("connect-flash");

const app = express();

// routes
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/auth.routes");
const giftRouter = require("./routes/gift.routes");
const listRouter = require("./routes/list");
const eventRouter = require("./routes/event");
const authRouter = require("./routes/auth.routes");

// local variable
app.locals.userId = "60486d2923e12406f4514db2";

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "views/partials"));

// initial config
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// session setup
app.use(
  session({
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false, // <== false if you don't want to save empty session object to the store
    cookie: {
      sameSite: "none",
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 24h * 60 min *60 s * 1000 ms === 1 day
    },
  })
);

// passport initialisation
app.use(passport.initialize());
app.use(passport.session());

// flash initialization
app.use(flash());

// routers
app.use("/", indexRouter);
app.use("/events", eventRouter);
app.use("/users", usersRouter);
app.use("/lists", listRouter);
app.use("/gifts", giftRouter);
app.use("/", authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
