import express, { response } from "express";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let blogList = [];
let blogContent = [];
let blogId = [];

app.get("/", (req, res) => {
  res.render("index.ejs");
});

let links = {
  blogList: blogList,
  blogId: blogId,
};

app.post("/submit", (req, res) => {
  let responseBlog = req.body;
  let id = uuidv4();

  blogId.push(id);
  blogList[id] = responseBlog.title;
  blogContent[id] = responseBlog.blog;

  res.render("index.ejs", links);
});

app.post("/blog/:id", (req, res) => {
  console.log(req.params.id);
  const id = req.params.id;

  res.render("blog.ejs", {
    blogTitle: blogList[id],
    blogCont: blogContent[id],
  });
});

app.post("/delete/:id", (req, res) => {
  const id = req.params.id;

  const index = blogId.indexOf(id);
  if (index !== -1) {
    blogId.splice(index, 1);
    blogList.splice(index, 1);
    blogContent.splice(index, 1);
  }

  res.render("index.ejs", links);

  console.log(blogId);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
