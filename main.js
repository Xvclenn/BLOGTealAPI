const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

const port = 2470;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/blogList", (req, res) => {
    const blogList = readBlogList();
    res.json(blogList);
});

function readBlogList() {
    const blog = fs.readFileSync("blogList.json");
    const blogList = JSON.parse(blog);
    return blogList;
}

app.get("/blogList/:id", (req, res) => {
    const { id } = req.params;
    const blogList = readBlogList();
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

    const blogList = readBlogList();

    blogList.unshift(newBlog);

    fs.writeFileSync("blogList.json", JSON.stringify(blogList));

    res.json(blogList);
    res.sendStatus(201);
});

app.delete("/blogList/:id", (req, res) => {
    const blogList = readBlogList();
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
