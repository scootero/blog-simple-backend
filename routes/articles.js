const express = require("express");
const Article = require("./../models/article");
const router = express();

router.get("/new", (req, res) => {
  console.log("new");
  res.render("articles/new");
});

router.get("/:id", (req, res) => {
  res.send("it worked");
});
router.post("/", async (req, res) => {
  let article = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown,
  });
  try {
    console.log(article);
    article = await article.save();
    res.redirect(`/articles/${article.id}`);
  } catch (e) {
    console.log("IT FAILED!!!! : ", e);
    // res.send("it failed!");
    res.render("articles/new", { article: article });
  }
});

module.exports = router;
