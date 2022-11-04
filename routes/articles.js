const express = require("express");
const Article = require("./../models/article");
const router = express();

router.get("/new", (req, res) => {
  res.render("articles/new", { article: new Article() });
});

router.get("/:slug", async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug });
  if (article == null) res.redirect("/");
  res.render("articles/show", { article: article });
});

router.get("/edit/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (article == null) res.redirect("/");
  res.render("articles/edit", { article: article });
});

router.delete("/:id", async (req, res) => {
  // console.log(req.params);
  await Article.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

router.put("/:id", async (req, res) => {
  console.log(req.params);
  let article = await Article.findById(req.params.id);
  console.log(article);

  article.title = req.body.title;
  article.description = req.body.description;
  article.markdown = req.body.markdown;
  try {
    article = await article.save();
    res.redirect(`/articles/${article.slug}`);
  } catch (e) {
    console.log("IT FAILED!!!! : ", e);
    // res.send("it failed!");
    res.render("articles/edit", { article: article });
  }
});

router.post("/", async (req, res) => {
  let article = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown,
  });
  try {
    article = await article.save();
    res.redirect(`/articles/${article.slug}`);
  } catch (e) {
    console.log("IT FAILED!!!! : ", e);
    // res.send("it failed!");
    res.render("articles/new", { article: article });
  }
});

function saveArticleAndUpdate(path) {
  return (req, res) => {};
}

module.exports = router;
