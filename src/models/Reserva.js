import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Usuario from './Usuario.js';
import Livro from './Livro.js';

const Reserva = sequelize.define('Reserva', {
  status: {
    type: DataTypes.ENUM('pendente', 'confirmada', 'cancelada'),
    defaultValue: 'pendente'
  },
  dataReserva: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

Reserva.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'usuario' });
Reserva.belongsTo(Livro, { foreignKey: 'livroId', as: 'livro' });

export default Reserva;