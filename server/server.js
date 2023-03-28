const express = require("express");
const mongoose = require("mongoose");
var path = require("path");
const logger = require("morgan");
const router = require("express").Router();
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const db = require("./config/config").get(process.env.NODE_ENV);
const _class = require("./routes/class");
const donor = require("./routes/Donor");

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET",
  })
);
app.use(passport.initialize());
app.use(passport.session());
const directory = path.join(__dirname, "/uploads");
app.use("/uploads", express.static(directory));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors(corsOptions));
app.use("/donor", donor);

mongoose.Promise = global.Promise;
mongoose.connect(
  db.DATABASE,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err) {
    if (err) console.log(err);
    console.log("database is connected");
  }
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "..", "client", "build", "index.html")
    );
  });
}

// to run server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("App running on port " + PORT);
});
