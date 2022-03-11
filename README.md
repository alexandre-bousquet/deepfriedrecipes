# Deep Fried Recipes
A Node.js back-end server with Restdb as database.

Made by Alexandre BOUSQUET and Hamza IKIOU, two students of the professional licence APIDAE.

## Links
<a href="https://deepfriedrecipes.herokuapp.com">Link to the Node.js server</a>

<a href="https://deepfriedrecipes.herokuapp.com/doc">Link to API Rest documentation</a>

<a href="https://deepfriedrecipes.netlify.app">Link to the Deep Fried Recipes website (with the front-end)</a>

## Features

######TODO

## Routes

All the routes of this API.

### Recipes

```js
// Get all the recipes
"https://deepfriedrecipes.herokuapp.com/recipes/get"
```

```js
// Get the recipe with the ID in url
"https://deepfriedrecipes.herokuapp.com/recipes/get/:id"
```

```js
// Create the recipe with the attributes in the body request
"https://deepfriedrecipes.herokuapp.com/recipes/put"
```

```js
// Delete the recipe with the ID in url
"https://deepfriedrecipes.herokuapp.com/recipes/delete/:id"
```

```js
// Update the recipe with the ID in url with the attributes in the body request
"https://deepfriedrecipes.herokuapp.com/recipes/put/:id"
```

### Users

```js
// Create a user with the attributes in the body request
"https://deepfriedrecipes.herokuapp.com/my-users/post"
```

```js
// Log in a user and give him a JWT to do other request
"https://deepfriedrecipes.herokuapp.com/login"
```

## Run

``` bash
# Install the dependencies in package.json
npm install

# Run the server on default port (5000)
npm start
```
