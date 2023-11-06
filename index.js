const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const dbConnection = require("./config/dbCon");
const taskRoutes = require("./routes/task");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
dbConnection();

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Mern todo app");
});

app.use("/api/task", taskRoutes);

module.exports = app.listen(PORT, () => {
  console.log(`Server listen on port :${PORT}`);
});
