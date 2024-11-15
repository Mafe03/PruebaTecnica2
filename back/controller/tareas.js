const { Tarea, sequelize } = require("../model/Conexion");
const { QueryTypes } = require("sequelize");

const AgregarTarea = async (req, res) => {
  try {
    const Tareas = await Tarea.create(req.body);
    res.send({ id: 200, mensaje: "Tarea agregada correctamente" });
  } catch (error) {
    res.send({ id: 400, mensaje: error.message });
  }
};

const EditarTarea = async (req, res) => {
  try {
    const Tareas = await Tarea.update(req.body, {
      where: { idTarea: req.params.id },
    });
    res.send({ id: 200, mensaje: "Tarea editada correctamente" });
  } catch (error) {
    res.send({ id: 400, mensaje: error.message });
  }
};

const EliminarTarea = async (req, res) => {
  try {
    const Tareas = await Tarea.destroy({
      where: { idTarea: req.params.id },
    });
    res.send({ id: 200, mensaje: "Tarea eliminada correctamente" });
  } catch (error) {
    res.send({ id: 400, mensaje: error.message });
  }
};

const ListarTodasTareas = async (req, res) => {
  try {
    const Users = await sequelize.query(
      `SELECT "idTarea", titulo, descripcion, estado
	FROM public.tareas`,
      { type: QueryTypes.SELECT }
    );
    res.send({ id: 200, mensaje: Users });
  } catch (error) {
    res.send({ id: 400, mensaje: error.messages });
  }
};

const ListarUnaTarea = async (req, res) => {
  try {
    const Users = await sequelize.query(
      `SELECT "idTarea", titulo, descripcion, estado
	FROM public.tareas Where "idTarea" = ${req.params.id};`,
      { type: QueryTypes.SELECT }
    );
    res.send({ id: 200, mensaje: Users });
  } catch (error) {
    res.send({ id: 400, mensaje: error.message });
  }
};

module.exports = {
  AgregarTarea,
  EditarTarea,
  EliminarTarea,
  ListarTodasTareas,
  ListarUnaTarea,
};
