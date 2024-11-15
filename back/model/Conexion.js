const { Sequelize } = require("sequelize");

const Tareas = require("./Tarea"); // Importa el archivo del modelo

// Configuración de la base de datos
const dbConfig = {
  database: "Crud",
  username: "postgres",
  password: "12345",
  host: "localhost",
  dialect: "postgres",
};

// Crear instancia de Sequelize con la configuración
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
  }
);

// Definir el modelo
const Tarea = Tareas(sequelize); // Pasa la instancia de sequelize al modelo

// Sincronizar la base de datos
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Base de datos sincronizada");
  })
  .catch((error) => {
    console.error("Error al sincronizar la base de datos:", error);
  });

module.exports = {
  Tarea,
  sequelize,
};
