const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
// zpctmZ8eoxbnrbhy
mongoose
  .connect(
    "mongodb+srv://kingdev5809:zpctmZ8eoxbnrbhy@cluster0.4srfehb.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/auth", authRoutes);
app.use("/post", postRoutes);

const server = app.listen(5000, () => console.log(`Server started on 5000`));
