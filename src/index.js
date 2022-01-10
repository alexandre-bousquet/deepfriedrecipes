const express = require('express')
const path = require('path')
const app = express()
const axios = require("axios");
const PORT = process.env.PORT || 5000
const config = {
    headers : {
        'x-apikey' : '7d35e6b431fed775185712e24ba0faa1597ec'
    }
}

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/html/index.html")
})

// GET
app.get('/recipes/get', async function(req, res) {
    axios.get('https://deepfriedrecipes-be35.restdb.io/rest/recipes', config)
        .then(results => {
            res.send(results.data)
        })
        .catch(error => {
            console.log(error)
        })
})

// POST
app.post('/recipes/post', async function(req, res) {
    console.log(req.body)
    axios.post('https://deepfriedrecipes-be35.restdb.io/rest/recipes', {
        name_recette: req.body.name_recette,
        description_recette: req.body.description_recette,
        ingredients_recette: req.body.ingredients_recette,
        image_recette: req.body.image_recette,
        temps_recette: req.body.temps_recette,
        etapes_recettes: req.body.etapes_recettes
    }, config)
        .then(results => {
            res.send(results.data)
        })
        .catch(error => {
            console.log(error)
        })
})

// GET/{id}
app.get('/recipes/get/:id', async function(req, res) {
    axios.get('https://deepfriedrecipes-be35.restdb.io/rest/recipes/' + req.params.id, config)
        .then(results => {
            res.send(results.data)
        })
        .catch(error => {
            console.log(error)
        })
})

// PUT/{id}
app.post('/recipes/put/:id', async function(req, res) {
    axios.put('https://deepfriedrecipes-be35.restdb.io/rest/recipes/' + req.params.id, {
        name_recette: req.body.name_recette,
        description_recette: req.body.description_recette,
        ingredients_recette: req.body.ingredients_recette,
        image_recette: req.body.image_recette,
        temps_recette: req.body.temps_recette,
        etapes_recettes: req.body.etapes_recettes
    }, config)
        .then(results => {
            res.send(results.data)
        })
        .catch(error => {
            console.log(error)
        })
})

// DELETE/{id}
app.get('/recipes/delete/:id', async function(req, res) {
    axios.delete('https://deepfriedrecipes-be35.restdb.io/rest/recipes/' + req.params.id, config)
        .then(results => {
            res.send(results.data)
        })
        .catch(error => {
            console.log(error)
        })
})

app.get("*",(req,res) => {
    res.sendFile(__dirname + "/public/html/404.html")
})

app.listen(PORT, function () {
    console.log('Server running on the port', PORT)
})
