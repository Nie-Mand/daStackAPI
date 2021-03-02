const express = require('express')
const { join, resolve } = require('path')
const { getPage } = require('./src/app.js')

const __root = resolve()

const app = express()

app.get('/', (req, res) => {
    return res.sendFile(join(__root + '/src/index.html'))
})

app.get('/company/:company', async (req, res) => {
    const { company } = req.params
    const data = await getPage(company)
    return res.json(data)
})

app.get('/tech/:tech', (req, res) => {
    console.log(req.params)
    return res.send('Ok')
})

app.listen(8000, () => console.log('Server is Running'))