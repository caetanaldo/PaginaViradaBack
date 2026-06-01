const {DataTypes} = require('sequelize')
const sequelize = require('../config/database')

const Livro = sequelize.define('Livro', {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    autor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT
    },
    preco: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    estoque: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    capa: {
        type: DataTypes.STRING
    }
})

module.exports = Livro