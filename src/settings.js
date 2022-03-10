const PORT = process.env.PORT || 5000

const apiUrl = 'https://deepfriedrecipes-be35.restdb.io/rest'

const config = {
    headers: {
        'x-apikey': '7d35e6b431fed775185712e24ba0faa1597ec'
    }
}

module.exports = {
    config: config,
    port: PORT,
    apiUrl: apiUrl
}