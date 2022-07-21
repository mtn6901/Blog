const express = require('express')
const Blog = require('../models/blog')

const router = express.Router()

//blog routes
router.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1})
        .then((result) => {
            res.render("index", { title : "All blogs", blogs : result})
        })
        .catch((error) => {
            console.log(error)
        })
})

router.post('/blogs', (req, res) => {
    const newBlog = new Blog(req.body)

    newBlog.save()
        .then((result) => {
            res.redirect("/blogs")
        })
        .catch((error) => {
            console.log(error)
        })
})

router.get('/blogs/create', (req, res) => {
    res.render("create", { title : "Blog"})
})

router.get('/blogs/:id', (req, res) => {
    const id = req.params.id
    Blog.findById(id)
        .then((result) => {
            res.render("detail", { title: "Blog detail", blog: result})
        })
        .catch((error) => {
            console.log(error)
        })
})

router.delete('/blogs/:id', (req, res) => {
    const id = req.params.id
    Blog.findByIdAndDelete(id) 
        .then((result) => {
            res.json({site : "/blogs"})
        })
        .catch((error) => {
            console.log(error)
        })
})

module.exports = router