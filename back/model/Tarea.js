const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "tareas", // El nombre de la tabla en la base de datos
    {
      idTarea: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      titulo: {
        type: DataTypes.STRING(250),
      },
      descripcion: {
        type: DataTypes.STRING(256),
      },
      estado: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      timestamps: false,
      tableName: "tareas",
    }
  );
};
