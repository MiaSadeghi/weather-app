const path = require("path");
const express = require("express");
const moment = require("moment");
const ejs = require("ejs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");
const port = process.env.PORT || 3000;

//path definitions for views , partials and public
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
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
    title: "Weather App",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpMsg: "this is the help message.",
    title: "Help",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMsg: "help article not found",
    title: "Help",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.render("weather", {
      error: "please enter a location",
      title: "Weather",
      name: "Kimia",
    });
  }

  geocode(req.query.address, ({ lat, lon, location } = {}) => {
    forecast({ lat, lon }, (data) => {
      const current = data.current;
      console.log({ data });
      if (typeof current === "string") {
        return res.render("weather", {
          title: "Weather",
          error: current,
        });
      }
      const time = moment(data.location.localtime).format("h:mm a");
      return res.render("weather", {
        title: "Weather",
        location,
        time: time,
        ...current,
      });
    });
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errorMsg: "page not found",
    title: "Weather",
  });
});

app.listen(port, () => {
  console.log("server is up and running on port " + port);
});
