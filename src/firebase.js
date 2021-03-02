const firebase = require('firebase/app')
require('firebase/firestore')

const firebaseConfig = {
    apiKey: "AIzaSyC7GNmm-HFibjBbpPIFuihnhGcoYMEFzWY",
    authDomain: "dastackbyniemand.firebaseapp.com",
    projectId: "dastackbyniemand",
    appId: "1:702436102104:web:ff5ee7ceb18e0f489dacad",
}
  
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig)
else firebase.app()

const fire = firebase.firestore()

const getTech = async (tech) => {
    console.log('Fetching ', tech)
    const query = await fire.collection('tech').doc(tech).get()
    return query.data()
}

const addTech = async (tech, techData) => {
    console.log('Adding ', tech)
    await fire.collection('tech').doc(tech).set(techData)
}

const getStack = async (company) => {
    console.log('Fetching ', company)
    const query = await fire.collection('company').doc(company).get()
    return query.data()
}

const addStack = async (company, techs) => {
    console.log('Adding ', company)
    console.log()
    await fire.collection('company').doc(company).set({ techs: techs.join(' ')})
}

module.exports = {
    addTech,
    getTech,
    addStack,
    getStack
}
