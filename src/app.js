const path = require("path");
const express = require("express");
const ejs = require("ejs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

//path definitions for views , partials and public
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
//initializing express
const app = express();

// ejs setup
app.set("view engine", "ejs");
app.set("views", viewsPath);
ejs.re;
//public directory access setup
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    name: "kimia",
    title: "Weather App",
  });
});

// app.get("/api/search", (req, res) => {
//   geocode(req.query.address, ({ lat, lon } = {}) => {
//     forecast({ lat, lon }, (data) => {
//       res.json(data);
//     });
//   });
// });

app.get("/about", (req, res) => {
  res.render("about", {
    name: "kimia",
    title: "About Me",
    chartdata: { x: 1, y: 2 },
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpMsg: "this is the help message.",
    title: "Help",
    name: "Kimia",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMsg: "help article not found",
    title: "Help",
    name: "Kimia",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.json({ error: "please enter a location" });
  }

  console.log(req.header("myToken"));

  geocode(req.query.address, ({ lat, lon, location } = {}) => {
    forecast({ lat, lon }, (data) => {
      console.log({ data });
      if (typeof data === "string") {
        console.log("here");
        console.log(data);
        return res.json({
          name: "Kimia",
          title: "weather",
          error: data,
        });
      }
      return res.json({
        name: "Kimia",
        title: "weather",
        location,
        ...data,
        // error: "",
      });
    });
  });
});

app.get("/products", (req, res) => {
  console.log(req.query);
  res.send({ products: [] });
});

app.get("*", (req, res) => {
  res.render("404", {
    errorMsg: "page not found",
    title: "Help",
    name: "Kimia",
  });
});

app.listen(3000, () => {
  console.log("server is up and running.");
});
