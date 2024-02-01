const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./Schema')
const colors = require('colors')
const connectDB = require('./config/db')
require('dotenv').config()


const app = express()

connectDB()

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
}))



const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Server listening on port ${port}`))