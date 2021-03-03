const express = require('express')
const cors = require('cors')
const { getPage } = require('./src/app.js')

const app = express()
const APP = process.env.URL
const port = process.env.PORT || 8000


app.get('/stack/:stack', cors({ 
    origin: APP,
    credentials: true,
 }), async (req, res) => {
    const { stack } = req.params
    const data = await getPage(stack)
    return res.json(data)
})

app.get('/', cors({origin: true}), (req, res) => res.json({msg: 'Welcome to daStack API'}))

app.listen(port, () => console.log('Server is Running'))

