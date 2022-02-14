const express = require('express')
const path = require('path')
const app = express()
const axios = require("axios")
const passport = require('passport')
const jwt = require('jsonwebtoken')
const passportJWT = require('passport-jwt')
const secret = 'JeNeSaisPasQuoiFairePourLeSecret'
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy
const PORT = process.env.PORT || 5000
const config = {
    headers : {
        'x-apikey' : '7d35e6b431fed775185712e24ba0faa1597ec'
    }
}
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
}

app.use(express.json())

async function getUsers(){
    const response = await axios.get('https://deepfriedrecipes-be35.restdb.io/rest/my-users', config)
    return response.data
}

async function getRecipe(id){
    const response = await axios.get('https://deepfriedrecipes-be35.restdb.io/rest/recipes/' + id, config)
    return response.data
}

passport.use(
    new JwtStrategy(jwtOptions, async function(payload, next) {
        const users = await getUsers()
        const user = users.find(user => user.email === payload.email)

        if (user) {
            next(null, user)
        } else {
            next(null, false)
        }
    })
)

app.use(passport.initialize())
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
app.post('/recipes/post', passport.authenticate('jwt',{session:false}), async function(req, res) {
    if (req.user) {
        axios.post('https://deepfriedrecipes-be35.restdb.io/rest/recipes', {
            name_recette: req.body.name_recette,
            description_recette: req.body.description_recette,
            ingredients_recette: req.body.ingredients_recette,
            image_recette: req.body.image_recette,
            temps_recette: req.body.temps_recette,
            etapes_recettes: req.body.etapes_recettes,
            user: req.user
        }, config)
            .then(results => {
                res.send(results.data)
            })
            .catch(error => {
                console.log(error)
            })
    }
})

// POST USERS
app.post('/my-users/post', async function(req, res) {
    axios.post('https://deepfriedrecipes-be35.restdb.io/rest/my-users', {
        email: req.body.email,
        password: req.body.password
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
app.post('/recipes/put/:id', passport.authenticate('jwt',{session:false}), async function(req, res) {
    const recipe = await getRecipe(req.params.id)
    if (req.user && req.user._id === recipe.user[0]._id) {
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
    }
})

// DELETE/{id}
app.get('/recipes/delete/:id', passport.authenticate('jwt',{session:false}), async function(req, res) {
    const recipe = await getRecipe(req.params.id)
    if (req.user && req.user._id === recipe.user[0]._id) {
        axios.delete('https://deepfriedrecipes-be35.restdb.io/rest/recipes/' + req.params.id, config)
            .then(results => {
                res.send(results.data)
            })
            .catch(error => {
                console.log(error)
            })
    }
})

app.get("*",(req,res) => {
    res.sendFile(__dirname + "/public/html/404.html")
})

// LOGIN
app.post('/login', async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    if (!email || !password) {
        res.status(401).json({ error: 'Email or password was not provided.' })
        return
    }

    const users = await getUsers()
    const user = users.find(user => user.email === email)

    if (!user || user.password !== password) {
        res.status(401).json({ error: 'Email / password do not match.' })
        return
    }

    const userJwt = jwt.sign({ email: user.email }, secret)

    res.json({ jwt: userJwt })
})

app.listen(PORT, function () {
    console.log('Server running on the port', PORT)
})
