const axios = require("axios")
const passport = require('passport')
const jwt = require('jsonwebtoken')
const secret = 'JeNeSaisPasQuoiFairePourLeSecret'
const passportJWT = require('passport-jwt')
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy
const settings = require("../settings.js")
const url = settings.apiUrl.concat('/my-users')

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
}

passport.use(
    new JwtStrategy(jwtOptions, async function (payload, next) {
        const users = await getUsers()
        const user = users.find(user => user.email === payload.email)

        if (user) {
            next(null, user)
        } else {
            next(null, false)
        }
    })
)

async function getUsers() {
    const response = await axios.get(url, settings.config)
    return response.data
}

async function createUser(req, res) {
    const users = await getUsers()
    const user = users.find(user => user.email === req.body.email)

    if (!user) {
        axios.post(url, {
            email: req.body.email,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname
        }, settings.config)
            .then(results => {
                res.send(results.data)
            })
            .catch(error => {
                console.log(error)
            })
    } else {
        res.status(401).json({error: 'Email already taken'})
    }
}

async function login(req, res) {
    const email = req.body.email
    const password = req.body.password

    if (!email || !password) {
        res.status(401).json({error: 'Email or password was not provided.'})
        return
    }

    const users = await getUsers()
    const user = users.find(user => user.email === email)

    if (!user || user.password !== password) {
        res.status(401).json({error: 'Email / password do not match.'})
        return
    }

    const userJwt = jwt.sign({email: user.email}, secret)

    res.json({
        user: {
            jwt: userJwt,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname
        }
    })

}

module.exports = {
    createUser: createUser,
    login: login
}