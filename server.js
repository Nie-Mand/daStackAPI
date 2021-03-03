const express = require('express')
const cors = require('cors')
const { getPage } = require('./src/app.js')

const app = express()
const APP = process.env.URL || 'http://localhost:3000'

app.get('/stack/:stack', cors({origin: APP }), async (req, res) => {
    const { stack } = req.params
    const data = await getPage(stack)
    return res.json(data)
})

app.get('/', (req, res) => res.send('Welcome to daStack API'))

app.listen(8000, () => console.log('Server is Running'))