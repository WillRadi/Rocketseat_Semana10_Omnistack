const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
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

// Vazio, o cors possibilita q qqr um acesse a aplicação.
app.use(cors())
app.use(express.json())
//cadastra todas as rotas:
app.use(routes)

app.listen(3333)