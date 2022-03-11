const express = require('express')
const path = require('path')
const app = express()
const passport = require('passport')
const cors = require('cors')
const recipe = require("./api/api-recipe.js")
const users = require("./api/api-users.js")
const settings = require("./settings.js")

app.use(express.json())
app.use(cors())

app.use(passport.initialize())
app.use(express.static(path.join(__dirname, 'public')))

// GET
app.get('/recipes/get', passport.authenticate('jwt', {session: false}), async function (req, res) {
    if (req.user) {
        recipe.getAllRecipes(req, res)
    }
})

// POST
app.post('/recipes/post', passport.authenticate('jwt', {session: false}), async function (req, res) {
    if (req.user) {
        recipe.createRecipe(req, res)
    }
})

// GET/{id}
app.get('/recipes/get/:id', passport.authenticate('jwt', {session: false}), async function (req, res) {
    if (req.user) {
        recipe.getRecipe(req, res)
    }
})

// PUT/{id}
app.post('/recipes/put/:id', passport.authenticate('jwt', {session: false}), async function (req, res) {
    const recette = await recipe.getRecipeWithReturn(req.params.id)
    if (req.user && req.user._id === recette.user[0]._id) {
        recipe.editRecipe(req, res)
    }
})

// DELETE/{id}
app.get('/recipes/delete/:id', passport.authenticate('jwt', {session: false}), async function (req, res) {
    const recette = await recipe.getRecipeWithReturn(req.params.id)
    if (req.user && req.user._id === recette.user[0]._id) {
        recipe.deleteRecipe(req, res)
    }
})

// POST
app.post('/my-users/post', async function (req, res) {
    users.createUser(req, res)
})

// POST/LOGIN
app.post('/login', async (req, res) => {
    await users.login(req, res)
})

// Homepage
app.get('/', function (req, res) {
    res.sendFile(__dirname.concat("/public/html/index.html"))
})

// API Rest doc page
app.get('/doc', function (req, res) {
    res.sendFile(__dirname.concat("/public/html/redoc-static.html"))
})

// Error page
app.get("*", (req, res) => {
    res.sendFile(__dirname.concat("/public/html/404.html"))
})

app.listen(settings.port, function () {
    console.log('Server running on the port', settings.port)
})
