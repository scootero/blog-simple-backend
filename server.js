const express = require("express");
const mongoose = require("mongoose");
const articleRouter = require("./routes/articles");
const Article = require("./models/article");
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

mongoose.connect("mongodb://localhost/blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set("view engine", "ejs");

app.use("/articles", articleRouter);

app.get("/", async (req, res) => {
  // let articles = await Article.find();
  let articles = await Article.find().sort({
    createdAt: "desc",
  });
  res.render("articles/index", { articles: articles });
});

app.listen(3000);
