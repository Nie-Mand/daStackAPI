const DataLoader = require('dataloader')
const { 
    addTech,
    getTech,
    addStack,
    getStack
 } = require('./firebase.js')

const getTechLoader = new DataLoader( async (keys) => {
    console.log('fetching : ', keys)
    let res = []
    for (let key of keys) {
        let q = await getTech(key)
        res.push(q)
    }
    return res
})

const getStackLoader = new DataLoader( async (keys) => {
    console.log('fetching : ', keys)
    let res = []
    for (let key of keys) {
        let q = await getStack(key)
        res.push(q)
    }
    return res
})

module.exports = {
    getTech: (key) => getTechLoader.load(key),
    addTech,
    addStack,
    getStack: (key) => getStackLoader.load(key)
}