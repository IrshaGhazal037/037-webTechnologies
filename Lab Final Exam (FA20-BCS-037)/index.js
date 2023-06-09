const express = require("express");
const server = express();
const port = 3000;
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");
const productsRouter = require("./routes/products");
const usersRouter = require("./routes/users");

var path = require("path");
// var logger = require("morgan");


// view engine setup
server.set("views", path.join(__dirname, "views"));
server.set("view engine", "pug");

// server.use(logger("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
// server.use(cookieParser());
server.use(express.static(path.join(__dirname, "public")));

server.use("/", indexRouter);
server.use("/products", productsRouter);
// server.use("/users", usersRouter);

// catch 404 and forward to error handler
server.use(function (req, res, next) {
    next(createError(404));
});

// error handler
server.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});



server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});

const MONGODBURL = "mongodb+srv://Irsha:issue723@atlascluster.xeeiehj.mongodb.net/";
mongoose
    .connect(MONGODBURL, { useNewUrlParser: true })
    .then(() => console.log("Connected to Mongo ...."))
    .catch((error) => console.log(error.message));

