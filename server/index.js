const express = require("express");
const bodyParser = require("body-parser");
const os = require("os");
const path = require("path");
const app = express();
const cors = require("cors");
app.use(cors());

app.get("/load-average", function(req, res) {
  const cpus = os.cpus().length;
  const loadAverage = os.loadavg();
  const averages = loadAverage.map(avg => avg / cpus);
  return res.send(JSON.stringify({ loadAverage: averages }));
});

app.get("/cpus", function(req, res) {
  const cpus = os.cpus().length;
  return res.send(JSON.stringify({ cpus }));
});

app.listen(process.env.PORT || 8080);
