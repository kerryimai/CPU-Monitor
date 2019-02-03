const express = require("express");
const bodyParser = require("body-parser");
const os = require("os");
const path = require("path");
const app = express();
const cors = require("cors");
app.use(cors());

app.get("/load-average", function(req, res) {
  const loadAverage = os.loadavg();
  return res.send(JSON.stringify({ loadAverage }));
});

app.get("/cpus", function(req, res) {
  const cpus = os.cpus().length;
  return res.send(JSON.stringify({ cpus }));
});

app.listen(process.env.PORT || 8080);
