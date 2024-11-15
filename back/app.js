const express = require("express");
const cors = require("cors");

const RutaTareas = require("./router/Tareas");

const app = express();
require("./model/Conexion");
const puerto = 3600;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", RutaTareas);

app.listen(puerto, () => {
  console.log("Aplicacion ejecutandose en : http://localhost:3600");
});
