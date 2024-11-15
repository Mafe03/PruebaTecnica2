const express = require("express");
const router = express.Router();
const ControllerTarea = require("../controller/tareas");

router.post("/tarea/agregar", ControllerTarea.AgregarTarea);

router.put("/tarea/editar/:id", ControllerTarea.EditarTarea);

router.delete("/tarea/eliminar/:id", ControllerTarea.EliminarTarea);

router.get("/tarea/listarTodas", ControllerTarea.ListarTodasTareas);

router.get("/tarea/listarUno/:id", ControllerTarea.ListarUnaTarea);

module.exports = router;
