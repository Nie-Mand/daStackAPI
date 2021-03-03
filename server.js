const express = require('express')
const cors = require('cors')
const { getPage } = require('./src/app.js')

const app = express()
const APP = process.env.URL
const port = process.env.PORT || 8000

app.use(cors({ 
    origin: true,
    credentials: true,
 }))

app.get('/stack/:stack', async (req, res) => {
    const { stack } = req.params
    const data = await getPage(stack)
    return res.json(data)
})

app.get('/', (req, res) => res.send('Welcome to daStack API'))

<<<<<<< HEAD
app.listen(port, () => console.log('Server is Running'))
=======
app.listen(8000, () => console.log('Server is Running'))
>>>>>>> fb90a8f0ce65f66e58c27f1befab5d29b40a457a
