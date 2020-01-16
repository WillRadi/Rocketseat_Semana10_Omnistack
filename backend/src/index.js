const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')

const app = express()

mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

/*
mongoose.connect('mongodb+srv://williamw:mongo@cluster0-zngtt.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
*/

app.use(express.json())
//cadastra todas as rotas:
app.use(routes)

app.listen(3333)