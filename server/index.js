//initializes
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
//const path = require("path");

//app
const app = express();

//port
const port = process.env.PORT || 8080;

//routes
const projectRoute = require("./routes/project");
const epicRoute = require("./routes/epic");
const sprintRoute = require("./routes/sprint");
const storyRoute = require("./routes/story");
const taskRoute = require("./routes/task");
const userRoute = require("./routes/user");
const loginRoute = require("./routes/auth");

//middleware
app.use(cors(
  // {
  //   origin:["https://agileflow-frontend.vercel.app"],
  //   methods: ["POST", "GET","PUT","DELETE"],
  //   credentials: true
  // }
));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/projects", projectRoute); //✅
app.use("/api/epics", epicRoute);
app.use("/api/sprints", sprintRoute);
app.use("/api/stories", storyRoute);
app.use("/api/tasks", taskRoute);

app.use("/api/users", userRoute); //✅
app.use("/api/login", loginRoute.login); //✅

app.get('/', (req, res) => {
  const htmlResponse = 
    `<hmtl>
      <head>
        <title> Node y Express server in Vercel</title>
      </head>
      <body>
        <h1>Node y Express server in Vercel</h1>
        <h2> AgileFlow BackEnd Server by Facundo Mozo </h2>
      </body>
    </hmtl>`
  ;
  res.send(htmlResponse)
})

app.get('/ping', (req, res) => {
  res.send('pong 🏓')
})


app.listen(port, (err, res) => {
  if (err) {
    console.log(err)
    return res.status(500).send(err.message)
  } else {
    console.log('[INFO] Server Running on port:', port)
    mongoose.set("useFindAndModify", false);
    mongoose.set("useUnifiedTopology", true);
    mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true })
  }
})

//module.exports = app;
