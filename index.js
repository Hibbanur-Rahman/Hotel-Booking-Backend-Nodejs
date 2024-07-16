const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const { dbConnection } = require("./config/db");
const mainRoutes = require("./routes/mainRoutes");
const { PORT, MONGO_URL } = process.env;

dbConnection(MONGO_URL);
// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  })
);

// Serve static files (images) from the 'uploads' folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Routes
app.use("/", mainRoutes);
const port = PORT || 5000;
app.listen(port, () => {
  console.log(`app is running on http://localhost:${port}`);
});
