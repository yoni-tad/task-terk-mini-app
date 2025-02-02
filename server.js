const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const taskRoute = require("./routes/taskRoutes");
const app = express();
const path = require("path");
require("dotenv").config();

const coreOptions = {
  origin: "*",
  Credential: true,
  optionSuccessStatus: 200,
};

app.use(cors(coreOptions));
app.use(express.json());
app.use("/api/task", taskRoute);
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));
app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log("✅ Mongo db successfully connected");

    await app.listen(3000, () => console.log("✅ Server start at 3000"));
  } catch (e) {
    console.error("❌ Server error:", e.message);
  }
})();
