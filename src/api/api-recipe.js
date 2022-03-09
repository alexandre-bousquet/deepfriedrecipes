const axios = require("axios")
const settings = require("../settings.js")

function getAllRecipes(req, res) {
    axios.get('https://deepfriedrecipes-be35.restdb.io/rest/recipes', settings.config)
        .then(results => {
            res.send(results.data)
        })
        .catch(error => {
            console.log(error)
        })
}

function getRecipe(req, res) {
    axios.get('https://deepfriedrecipes-be35.restdb.io/rest/recipes/' + req.params.id, settings.config)
        .then(results => {
            res.send(results.data)
        })
        .catch(error => {
            console.log(error)
        })
}

async function getRecipeWithReturn(id) {
    const response = await axios.get('https://deepfriedrecipes-be35.restdb.io/rest/recipes/' + id, settings.config)
    return response.data
}

function createRecipe(req, res) {
    axios.post('https://deepfriedrecipes-be35.restdb.io/rest/recipes', {
        name_recette: req.body.name_recette,
        description_recette: req.body.description_recette,
        ingredients_recette: req.body.ingredients_recette,
        image_recette: req.body.image_recette,
        temps_recette: req.body.temps_recette,
        etapes_recettes: req.body.etapes_recettes,
        user: req.user
    }, settings.config)
        .then(results => {
            res.send(results.data)
        })
        .catch(error => {
            console.log(error)
        })
}

function editRecipe(req, res) {
    axios.put('https://deepfriedrecipes-be35.restdb.io/rest/recipes/' + req.params.id, {
        name_recette: req.body.name_recette,
        description_recette: req.body.description_recette,
        ingredients_recette: req.body.ingredients_recette,
        temps_recette: req.body.temps_recette,
        etapes_recettes: req.body.etapes_recettes
    }, settings.config)
        .then(results => {
            res.send(results.data)
        })
        .catch(error => {
            console.log(error)
        })
}

function deleteRecipe(req, res) {
    axios.delete('https://deepfriedrecipes-be35.restdb.io/rest/recipes/' + req.params.id, settings.config)
        .then(results => {
            res.send(results.data)
        })
        .catch(error => {
            console.log(error)
        })
}

module.exports = {
    getAllRecipes: getAllRecipes,
    getRecipe: getRecipe,
    getRecipeWithReturn: getRecipeWithReturn,
    createRecipe: createRecipe,
    editRecipe: editRecipe,
    deleteRecipe: deleteRecipe,
}