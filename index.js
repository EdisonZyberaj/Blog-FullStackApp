const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

let posts = [];

app.get("/", (req, res) => {
  res.render("index", { posts });
});

app.get("/create", (req, res) => {
  res.render("create");
});

app.post("/create", (req, res) => {
  const { title, content } = req.body;
  posts.push({ id: Date.now(), title, content });
  res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  res.render("edit", { post });
});

app.post("/edit/:id", (req, res) => {
  const { title, content } = req.body;
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (post) {
    post.title = title;
    post.content = content;
  }
  res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
  posts = posts.filter((p) => p.id !== parseInt(req.params.id));
  res.redirect("/");
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
