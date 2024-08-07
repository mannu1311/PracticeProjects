const express = require("express");
const methodOverride = require("method-override");
const app = express();
const port = 3031;
const path = require("path");
const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: uuidv4(),
        username: "manoharsingh",
        content: "I love coding!"
    },
    {
        id: uuidv4(),
        username: "rahuldubey",
        content: "Hard work is important to achieve success!"
    },
    {
        id: uuidv4(),
        username: "shrutijoshi",
        content: "I got my first internship"
    }
];

app.get("/posts", (req, res) => {
    res.render("index", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new");
});

app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4(); // Generate a unique ID for the new post
    posts.push({ id, username, content });
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);

    if (!post) {
        return res.status(404).send('Post not found');
    }

    res.render("show", { post });
});
app.patch("/posts/:id",(req,res)=>{
    let {id} =req.params;
    let  newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
})
app.get("/posts/:id/edit",(req,res)=>{
    let {id} =req.params;
    let post = posts.find((p)=>id == p.id);
    res.render("edit.ejs",{post});
})
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
