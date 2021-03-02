const axios = require('axios')
const { 
    addTech,
    getTech,
    addStack,
    getStack
 } = require('./api.js')

const STACKSHARE = 'https://stackshare.io/'
const id2look4 = 'StackProfile-apollo-state'
const category = 'is a tool in the'


const getCategory = async (toolUrl) => {
    // Load the Web Page from StackShare
    const { data } = await axios.get(`${STACKSHARE}${toolUrl}`)

    // Extract the Category
    const whereTheDataAreLocated = data.indexOf(category)
    const start = data.indexOf('<strong>', whereTheDataAreLocated)
    const end = data.indexOf('</strong>', start)

    return data.substring(start + 8, end)
}


const getPage = async (cp) => {
    company = cp.toLowerCase()
    let res = await getStack(company)
    if (res) {
        const { techs } = res
        res = []
        const slugs = techs.split(' ')
        for (let tool of slugs) {
            let q = await getTech(tool)
            res.push(q)
        }
    } else {
        console.log(company, ' Stack is New to the Database')

        // Load the Web Page from StackShare
        const { data } = await axios.get(`${STACKSHARE}/${company}/${company}`)

        // Extract the Resultig Query of GraphQL Part
        const whereTheDataAreLocated = data.indexOf(id2look4)
        const start = data.indexOf('>', whereTheDataAreLocated)
        const end = data.indexOf('</script>', start)
        const json = JSON.parse(data.substring(start + 1, end))

        // Get the Tools
        const tools = Object.keys(json).filter((key) => key.startsWith('Tool:'))
        res = []
        let slugs = []
        for (let tool of tools) {
            const { slug } = json[tool]
            let q = await getTech(slug)
            if (!q) {
                const { name, title, canonicalUrl } = json[tool]
                const category = await getCategory(canonicalUrl)
                q = await addTech(slug, { name, slug, title, category })
            }
            slugs.push(slug)
            res.push(q)
        }
        await addStack(company, slugs)
    }
    return res
}


module.exports = {
    getPage
}