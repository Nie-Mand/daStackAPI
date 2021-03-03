const express = require('express')
const cors = require('cors')
const { getPage } = require('./src/app.js')

const app = express()
const APP = process.env.URL
const port = process.env.PORT || 8000

app.use(cors({ origin: '*' }))

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", '*')
    res.header("Access-Control-Allow-Credentials", true)
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json')
    next()
})

app.get('/stack/:stack', async (req, res) => {
    const { stack } = req.params
    const data = await getPage(stack)
    return res.json(data)
})

app.get('/', (req, res) => res.send('Welcome to daStack API'))

app.listen(port, () => console.log('Server is Running'))