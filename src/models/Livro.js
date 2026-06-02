import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

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
});

export default Livro;