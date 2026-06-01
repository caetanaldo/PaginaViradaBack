const DataTypes = require('sequelize')
const sequelize = require('../config/database')
const Usuario = require('./Usuario')
const Livro = require('./Livro')

const Reserva = sequelize.define('Reserva', {
    status: {
        type: DataTypes.ENUM('pendente', 'confirmada', 'cancelada'),
        defaultValue: 'pendente'
    },
    dataReserva: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
})

Reserva.belongsTo(Usuario, {foreignKey: 'usuarioId'})
Reserva.belongsTo(Livro, {foreignKey: 'livroId'})

module.exports = Reserva