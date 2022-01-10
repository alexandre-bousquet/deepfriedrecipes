const express = require('express')
const app = express()

const axios = require("axios");
const PORT = process.env.PORT || 5000 // this is very important

app.get('/', function (req, res) {
    res.send('Hello the World!')
})

/*app.get('/recipes', function (req, res) {
    res.send('B̵̛͎̹̮̲̑́̓͑̄͂̂̇̕̕͘Ó̷̡͙͚̻̾̋̈́͒̈́͠Ņ̶̬͎̭̺̞̮̖͈̖̞͚̯͉͇͙͍͒̽͒͛̓̈́̄̉̈́̚N̸̡͈̖̟̠͖̗̟̭̺̠̜̦̽͊̐̏̀̾͐̔̅̈́̂̇͝͝ͅÈ̵̟Ş̸̧̗͔̼͖̪͙̟̱͉̯̭̯͗̈́͝ ̴̢̗̻̦̪̎͋̿̈́̋̔̔̏̎͋͐̉̅́͠ͅR̴̲͊͊͋͊̊̈̂͝͝E̶̝̅͘͠C̸̝̠̞̈̓̎̐͊̈Ẹ̵̡͇̝̦̝͔̦̗̘̝͙̒̏̓͌͂̊͛̀́T̴̛̮̬̥̤͇̠̑̇͑̍͜T̸͇̩̾̀̊̾̈́̂͛̔̓͊͗̑͊͘É̴̝̜͇̫̣̙͉̬͚̹̅̔̒̓̈̽̚ͅS̷̱̤̑̓ ̷̨̛̟̝̖̱̋̂̐̿͑̈̆͗̈́́̚͝͝D̵̜̅̀̃Ę̶͕̠̘̩̍̄̑̂̓̓̍͌̾ ̴̧̗̣͍͉̟̲̉̒̍͐͐̊̌͆͒̚͜Ç̵̼̤͓̦̣̠͕̘͙̻̟͎͓̪͋͆͌̓̋̈́U̴̢̮̘͗̑̈́͗͐͐͝I̷̛͚̹͋̇͒̽̆͗́S̵̢̼͎̯̤͕̗̦̲̮̗̩̪̹̀̽̎̽͑͜͝͝I̶̧̱̣̦͉̞̙̝̞̾̆̎̑̇̅Ṋ̶̨̢̛̯͙͕͓͓̰̪̅̐̊̐̅͑̋͒͊̏̕͘E̷̢̩͙͓͖̮͕͓̥̟̫̲̓̔̈́͊̄́͌̀͆͝S̴͉̀̈͑͆͊̅̾̿̓̑̅͂͑̂̚͘')
})*/

app.use(express.json())

const config = {
    headers : {
        'x-apikey' : '7d35e6b431fed775185712e24ba0faa1597ec'
    }
}

app.get('/recipes', async function(req, res) {
    axios.get('https://deepfriedrecipes-be35.restdb.io/rest/recipes', config)
    .then(results => {
        res.send(results.data)
    })
    .catch(error => {
        console.log(error)
    })
})

app.listen(PORT, function () {
    console.log('Example app listening on port ', PORT)
})
