let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let express = require('express');
let app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

let apiRoutes = require("./api-routes");
app.use('/api', apiRoutes);
app.get('/', (req, res) => res.send('Hello World'));

mongoose.connect('mongodb+srv://cs3219-KL:JSJvoagKsBHhIGMT@cs3219team40.gaxbfpm.mongodb.net/test', { useNewUrlParser: true});
var db = mongoose.connection;

var port = process.env.PORT || 3000;

const path = require("path");

app.use(express.static(path.resolve(__dirname, "./employees/build")));
app.get("/app", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./employees/build", "index.html"));
});
  

app.listen(port, function () {
    console.log("Running Employees on port " + port);
});

var cors = require('cors');
app.use(cors());

module.exports = app;