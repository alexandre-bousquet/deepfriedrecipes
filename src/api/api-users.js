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

/**
 * Get all the users in the database
 * @returns {Promise<any>} - Array of all the users
 */
async function getUsers() {
    const response = await axios.get(url, settings.config)
    return response.data
}

/**
 * Get the user in the users list by email if it exist
 * @param email {string} - Email of the user searched
 * @returns {Promise<*>} - Data of the user researched
 */
async function getUser(email) {
    const users = await getUsers()
    return users.find(user => user.email === email)
}

/**
 * Create a new account if the email isn't already used
 * @param req {Object} - Request made by a visitor
 * @param res {Object} - Response of the server
 * @returns {Promise<void>} - New user data or error
 */
async function createUser(req, res) {
    // Check if a user with this email already exist or not
    if (!await getUser(req.body.email)) {
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

/**
 * Edit an user with the data in the request
 * @param req {Object} - Request made by a user
 * @param res {Object} - Response of the server
 */
function editUser(req, res) {
    const passwordRequest = req.body.password
    let passwordUser = getUser(req.body.email).password

    // Check if a new password has been sent
    if (passwordRequest !== null && passwordRequest !== passwordUser) {
        passwordUser = passwordRequest
    }

    axios.put(url.concat('/', req.params.id), {
        email: req.body.email,
        password: passwordUser,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }, settings.config)
        .then(results => {
            res.send(results.data)
        })
        .catch(error => {
            console.log(error)
        })
}

/**
 * Log in a user if the email and password he sent are corrects
 * @param req {Object} - Request made by a visitor with and email and a password in the body
 * @param res {Object} - Response of the server
 * @returns {Promise<void>} - User's data with an JWT or an error message
 */
async function login(req, res) {
    // Check if an email and a password has been sent in the request
    const email = req.body.email
    const password = req.body.password
    if (!email || !password) {
        res.status(401).json({error: 'Email or password was not provided.'})
    }

    // Check if the user exist and if the password in the database is the same that the one he sent
    const user = await getUser(email)
    if (!user || user.password !== password) {
        res.status(401).json({error: 'Email / password do not match.'})
    }

    // Create a JWT for the user
    const userJwt = jwt.sign({email: user.email}, secret)

    // Put in the response the user's data and the JWT created
    res.json({
        user: {
            _id: user._id,
            jwt: userJwt,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname
        }
    })

}

module.exports = {
    createUser: createUser,
    login: login,
    editUser: editUser
}
