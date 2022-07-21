const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const blogRoutes = require("./routes/blogRoutes")

//express app
const app = express()

//port
const port = process.env.PORT || 5000

//connect to mongoDB
const dbURI = 'mongodb+srv://mtn6901:mtn1133112@mtn.btk8gfs.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(dbURI) 
    .then((result) => app.listen(port))
    .catch((error) => console.log(error))

//register view engine
app.set("view engine", "ejs")

//middleware and static files
app.use(express.static("public"))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

//routes
app.get('/', (req, res) => {
    res.redirect("/blogs")
})

app.get('/about', (req, res) => {
    res.render("about", { title : "About"})
})

//blog routes
app.use(blogRoutes)

app.use((req, res) => {
    res.status(404).render('404', { title : "404"})
});
