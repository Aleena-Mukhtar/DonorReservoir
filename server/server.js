const express = require("express");
const mongoose = require("mongoose");
var path = require("path");
const logger = require("morgan");
const router = require("express").Router();
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const db = require("./config/config").get(process.env.NODE_ENV);

const _class = require("./routes/class");

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

mongoose.Promise = global.Promise;
mongoose.connect(
  db.DATABASE,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err) {
    if (err) console.log(err);
    console.log("database is connected");
  }
);

app.use("/class", _class);

// app.use("/", (req, res) => {
//   const d =
//     '%7B"occupation"%3A%5B%5D%2C"earning"%3A0%2C"classesId"%3A%5B%5D%2C"response_rate"%3A0%2C"delivery_time"%3A0%2C"order_completion"%3A0%2C"is_active"%3Atrue%2C"is_email_verified"%3Afalse%2C"is_phone_verified"%3Afalse%2C"is_profile_completed"%3Afalse%2C"is_payment_verified"%3Afalse%2C"_id"%3A"633dc2bb467f1f0d804827a9"%2C"first_name"%3A"Ben"%2C"last_name"%3A"Dunk"%2C"google_oauth_id"%3A"112069601084137864513"%2C"img"%3A"https%3A%2F%2Flh3.googleusercontent.com%2Fa%2FALm5wu2Mq7b80Cvld1403-EkwtajhIt3atHlOXBhfYTR%3Ds96-c"%2C"email"%3A"bdunk1122%40gmail.com"%2C"skills"%3A%5B%5D%2C"education"%3A%5B%5D%2C"certification"%3A%5B%5D%2C"goals"%3A%5B%5D%2C"createdAt"%3A"2022-10-05T17%3A45%3A31.691Z"%2C"updatedAt"%3A"2022-10-05T17%3A45%3A31.691Z"%2C"__v"%3A0%7D';
//   const data = decodeURIComponent(d);
//   console.log(data);
//   console.log(JSON.parse(data));
// });

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "..", "client", "build", "index.html")
    );
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("App running on port " + PORT);
});
