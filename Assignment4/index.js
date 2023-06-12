const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const path = require("path");
var cookieParser = require("cookie-parser");
var expressLayouts = require("express-ejs-layouts");
let Students = require("./models/students");

let checkSessionAuth = require("./middlewares/checkSessionAuth");
var session = require("express-session");

// const cookieParser = require('cookie-parser');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

//Talha
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static("public"));



app.use(
    session({
        secret: "have your own code plz",
        cookie: { maxAge: 600000 },
        resave: true,
        saveUninitialized: true,
    })
);


app.use(cookieParser());

app.use(expressLayouts);
app.use(require("./middlewares/siteSettings"));
//

// Define your routes here
app.get("/", (req, res) => {
    res.render("Home");
});

app.get("/About", (req, res) => {
    res.render("About");
});

app.get("/Contact", (req, res) => {
    res.render("Contact");
});

app.get("/Login", (req, res) => {
    res.render("Login");
});

app.get("/Women", (req, res) => {
    res.render("Women");
});

app.get("/Navbar", (req, res) => {
    res.render("Navbar");
});

app.get("/Booking", checkSessionAuth, (req, res) => {
    res.render("Booking");
});

app.get("/Register", (req, res) => {
    res.render("Register");
});

app.get("/Profile", (req, res) => {
    res.render("Profile");
});

app.get("/Admin-Profile", (req, res) => {
    res.render("Admin-Profile");
});

app.get("/Edit", (req, res) => {
    res.render("Edit");
});

// app.get("/edit", (req, res) => {
//     res.render("edit");
// });

// app.get("/add", (req, res) => {
//     res.render("add");
// });

app.get("/views", (req, res) => {
    res.render("views");
});




// Talha

app.get("/Checkout", checkSessionAuth, async (req, res, next) => {
    let students = await Students.find();
    res.render("Checkout", { students });
});

app.get("/views:id", checkSessionAuth, async (req, res, next) => {
    console.log("IDD", req.params.id)
    let students = await Students.find({ _id: (req.params.id).split(":")[1] });
    console.log("Students find", students)
    res.render("views", { data: students[0] });
});

app.get("/Edit:id", checkSessionAuth, async (req, res, next) => {
    console.log("IDD", req.params.id)
    let students = await Students.find({ _id: (req.params.id).split(":")[1] });
    console.log("Students find", students)
    res.render("Edit", { data: students[0] });
});
app.post("/update", checkSessionAuth, async (req, res, next) => {
    console.log("body in update", req.body)
    let students = await Students.find({ rollnumber: req.body.rollnumber });
    let stude = await Students.updateOne({ _id: students[0]._id }, req.body);
    console.log("Students find in original", students)
    console.log("Students find in update", stude)
    res.redirect('/Checkout')
});


//Students
app.post('/addStudents', async (req, res) => {

    let student = new Students(req.body);
    console.log(student)
    console.log(req.body)
    await student.save()
    res.redirect('/Checkout')
})


app.get("/delete:id", checkSessionAuth, async (req, res) => {
    console.log("IDD", req.params.id)
    let students = await Students.findByIdAndDelete({ _id: (req.params.id).split(":")[1] });
    console.log("Students deleted", students);
    res.redirect('/Checkout')
});















app.use("/api/auth", require("./routes/auth"));



// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});

const MONGODBURL = "mongodb+srv://Irsha:issue723@atlascluster.xeeiehj.mongodb.net/abc";
mongoose
    .connect(MONGODBURL, { useNewUrlParser: true })
    .then(() => console.log("Connected to Mongo ...."))
    .catch((error) => console.log(error.message));
