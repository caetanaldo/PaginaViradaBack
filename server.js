const app = require('./src/app')
const sequelize = require('./src/config/database')
require('dotenv').config()
require('./src/models/Livro')
require('./src/models/Reserva')
require('./src/models/Usuario')

const PORT = process.env.PORT || 3000

sequelize.authenticate()
    .then(()=>{
        console.log('Banco de dados conectado!')
        return sequelize.sync()
    })
    .then(()=>{
        app.listen(PORT, ()=>{
            console.log(`Servidor rodando na porta em http://localhost:${PORT}`)
        })
    })
    .catch((err)=>{
        console.log('Erro ao conectar ao banco:', err)
    })