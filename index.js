const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const authRouter = require("./Routes/authRoute");
const authProfile = require("./Routes/authProfiles");

require("dotenv").config();
require("./db.connect");


app.use(bodyParser.json());
app.use(cors());

app.use(bodyParser.json())
// app.use(cors())
app.use(cors({
  origin: 'http://localhost:5173', 
  methods: 'GET,POST,PUT,DELETE', 
  credentials: true, 
}));


app.use("/auth", authRouter);
app.use("/auth", authProfile);

app.get("/", (req, res) => {
  res.send("Hello Express");
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log("app is running on port ", PORT);
});
