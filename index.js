require("dotenv").config();

const path = require("path");
const session = require("express-session");
const userAuth = require("./routes/auth");
const dashboard = require("./routes/dashboard");
const getHostel = require("./routes/hostel");
const admin = require("./routes/admin");
const mongoose = require("mongoose");
const express = require("express");
const flashmessage = require("./middleware/flashmessage");
const app = express();

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.set(path.join(__dirname, "public"), "views");

app.use(express.static("public"));
// app.use("/css", express.static("public/css"));
// app.use("/images", express.static("public/images"));
// app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
// app.use(idAuth);
// useSession(app, 60 * 30 * 1000);
app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: false,
    rolling: true,
    cookie: {
      maxAge: 60 * 30 * 1000,
    },
  })
);

app.use(flashmessage);
// app.use(sessionAuth);
app.use("/", admin);
app.use("/", userAuth);
app.use("/", dashboard);
app.use("/", getHostel);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.error("could not connect to mongodb", err));

app.listen(process.env.PORT || 5512);
