const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const port = 247;
const app = express();

let blogList = [];

app.use(cors());
app.use(express.json());

app.get("/blogList", (req, res) => {
    res.json(blogList);
});

app.get("/blogList/:id", (req, res) => {
    const { id } = req.params;
    const one = blogList.find((blog) => blog.id === id);
    if (one) {
        res.json(one);
    } else {
        res.sendStatus(404);
    }
});

app.post("/blogList", (req, res) => {
    const { title, author, img, blogBody, date } = req.body;

    const newBlog = {
        id: uuidv4(),
        title,
        author,
        blogBody,
        img,
        date,
    };
    blogList.push(newBlog);
    res.json(blogList);
});

app.delete("/blogList/:id", (req, res) => {
    const { id } = req.params;
    const one = blogList.find((blog) => blog.id === id);
    if (one) {
        const newList = blogList.filter((blog) => blog.id !== id);
        blogList = newList;
        res.json({ deletedId: id });
    } else {
        res.sendStatus(404);
    }
});

app.listen(port, () => {
    console.log("OK", port);
});
