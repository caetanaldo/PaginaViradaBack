import app from "./src/app.js"
import sequelize from "./src/config/database.js"
import "./src/models/Usuario.js"
import "./src/models/Reserva.js"
import "./src/models/Livro.js"

const PORT = process.env.PORT || 3000

sequelize.authenticate()
  .then(() => {
    console.log('Banco de dados conectado!');
    return sequelize.sync();
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erro ao conectar ao banco:', err);
  });