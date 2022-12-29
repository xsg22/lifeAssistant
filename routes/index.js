var express = require('express');
var router = express.Router();
const { Worker } = require("worker_threads");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/addRobot', function(req, res, next) {
  const workerThread = new Worker(__dirname + "/workerThread.js");
  workerThread.on("message", (result) => {
    if (!res.destroyed) {
      res.render('addRobot', {title: result});
    }
  });
  workerThread.on("close", () => {
    console.log("get msg close")
    this.terminate();
  });
  workerThread.postMessage(1);
});

module.exports = router;
