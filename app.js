var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
var logger = require("morgan");
var cors = require("cors");
// const swaggerUi = require("swagger-ui-express"),
//   swaggerDocument = require("./swagger.json");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

var corsOptions = {
  origin: "http://rainflow.live/api",
};

var app = express();

const db = require("./models");
// db.sequelize.sync();

// swagger.setAppHandler(app);
// swagger.configure("/api-docs", "0.1");

const options = {
  swaggerDefinition: {
    // Like the one described here: https://swagger.io/specification/#infoObject
    info: {
      title: "RainFLOW Mobile API",
      version: "1.0.0",
      description: "Test Express API with autogenerated swagger doc",
    },
  },
  // List of files to be processes. You can also set globs './routes/*.js'
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // Swagger UI

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.listen(8085);
app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var reportRouter = require("./routes/report");

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/report", reportRouter);

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

console.log("App is listening on port 8085.");

module.exports = app;
