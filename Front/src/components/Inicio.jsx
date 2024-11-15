import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import HelperForm from "../helper/Helperform";
import Swal2 from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import EditarTarea from "./EditarTarea";
const Swal = withReactContent(Swal2);

const Inicio = (props) => {
  const [datos, SetDatos] = useState([]);
  const { form, cambiar } = HelperForm({});
  const [Editar, setEditar] = useState(null);

  const AgregarTarea = async (e) => {
    const titulo = document.querySelector("#titulo");
    const descripcion = document.querySelector("#descripcion");
    const estado = document.querySelector("#estado");

    e.preventDefault();

    let formulario = form;

    try {
      const request = await fetch("http://localhost:3600/tarea/agregar", {
        method: "POST",
        body: JSON.stringify(formulario),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await request.json();

      if (data.id === 200) {
        let mensaje = data.mensaje;
        Swal.fire({
          title: <strong>{"Agregado"}</strong>,
          html: <i>{mensaje}</i>,
          icon: "success",
        });

        ListarTareas();

        titulo.value = "";
        descripcion.value = "";
      } else {
        let mensaje = data.mensaje;
        Swal.fire({
          title: <strong>{"Error"}</strong>,
          html: <i>{mensaje}</i>,
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: <strong>{"Error"}</strong>,
        html: <i>Hubo un problema con la solicitud.</i>,
        icon: "error",
      });
    }
  };

  const Eliminar = (id, titulo) => {
    Swal.fire({
      title: `¿Desea eliminar la tarea ${titulo}?`,
      showDenyButton: true,
      confirmButtonText: "Sí",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3600/tarea/eliminar/${id}`, {
          method: "DELETE",
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (data.id === 200) {
              Swal.fire({
                title: <strong>Eliminado</strong>,
                html: <i>Tarea eliminada exitosamente</i>,
                icon: "success",
              });
              ListarTareas();
            }
          });
      }
    });
  };

  const ListarTareas = async () => {
    const request = await fetch("http://localhost:3600/tarea/listarTodas", {
      method: "GET",
    });
    const data = await request.json();
    SetDatos(data.mensaje);
  };

  useEffect(() => {
    ListarTareas();
  }, []);

  const CambiarEstado = async (idTarea, estado) => {
    const nuevoEstado = !estado;

    try {
      const response = await fetch(
        `http://localhost:3600/tarea/editar/${idTarea}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            estado: nuevoEstado,
          }),
        }
      );

      const data = await response.json();

      if (data.id === 200) {
        Swal.fire({
          title: <strong>{"Estado Actualizado"}</strong>,
          html: <i>El estado de la tarea ha sido actualizado exitosamente</i>,
          icon: "success",
        });

        ListarTareas();
      } else {
        Swal.fire({
          title: <strong>{"Error"}</strong>,
          html: <i>{data.mensaje}</i>,
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: <strong>{"Error"}</strong>,
        html: <i>Hubo un problema al actualizar el estado de la tarea.</i>,
        icon: "error",
      });
    }
  };

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Dividimos las tareas en dos categorías: incompletas y completadas
  const tareasIncompletas = datos.filter((tarea) => !tarea.estado);
  const tareasCompletadas = datos.filter((tarea) => tarea.estado);

  return (
    <>
      <Modal
        show={show2}
        onHide={handleClose2}
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton id="gradient">
          <Modal.Title id="contained-modal-title-vcenter">
            Agregar Tarea
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={AgregarTarea}>
          <Modal.Body>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control border-secondary"
                id="titulo"
                name="titulo"
                placeholder="Titulo de la tarea"
                onChange={cambiar}
              />
              <label>Titulo de la tarea</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control border-secondary"
                id="descripcion"
                name="descripcion"
                placeholder="Descripción"
                onChange={cambiar}
              />
              <label>Descripción de la tarea</label>
            </div>
            <div className="form-floating mb-3">
              <select
                className="form-control border-secondary"
                id="estado"
                name="estado"
                onChange={cambiar}
                defaultValue="Incompleto"
              >
                <option value="false">Incompleto</option>
                <option value="true">Completado</option>
              </select>
              <label>Estado de la tarea</label>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn-gradient" type="submit">
              <i className="fa-solid fa-floppy-disk"></i> Agregar
            </button>
          </Modal.Footer>
        </form>
      </Modal>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container px-5">
          <a class="navbar-brand" href="#!">
            Tareitas
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>

      <div class="container px-4 px-lg-5">
        <div class="row gx-4 gx-lg-5 align-items-center my-5">
          <div className="col-12 text-end mt-4">
            <button onClick={handleShow2} className="btn-gradient">
              <i className="fa fa-plus-circle" aria-hidden="true"></i> Agregar
              Tarea
            </button>
          </div>

          <div className="row gx-4 gx-lg-5 align-items-center my-5 mt-5">
            <div className="col-lg-6">
              <h4 className="">Tareas Incompletas</h4>
              <table className="table border border-black table-hover">
                <thead>
                  <tr id="tr">
                    <th id="th">ID</th>
                    <th id="th">Titulo</th>
                    <th id="th">Descripción</th>
                    <th id="th">Editar</th>
                    <th id="th">Estado</th>
                    <th id="th">Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  {tareasIncompletas.map((tareas) => {
                    return (
                      <tr key={tareas.idTarea}>
                        <td>{tareas.idTarea}</td>
                        <td>{tareas.titulo}</td>
                        <td>{tareas.descripcion}</td>
                        <td>
                          <a
                            className="btn btn-app btn-gradient2"
                            onClick={() => {
                              setEditar(tareas.idTarea);
                              handleShow();
                            }}
                          >
                            <i className="bi bi-pencil-square"></i>
                          </a>
                        </td>
                        {Editar == tareas.idTarea && (
                          <EditarTarea
                            props={props}
                            show={show}
                            handleClose={handleClose}
                            id={tareas.idTarea}
                            titulo={tareas.titulo}
                            descripcion={tareas.descripcion}
                            estado={tareas.estado}
                            setEditar={setEditar}
                            listarTarea={ListarTareas}
                          ></EditarTarea>
                        )}
                        <td>
                          <button
                            className={`btn btn-${
                              tareas.estado ? "success" : "warning"
                            }`}
                            onClick={() =>
                              CambiarEstado(tareas.idTarea, tareas.estado)
                            }
                          >
                            {tareas.estado ? "Completado" : "Incompleto"}
                          </button>
                        </td>
                        <td>
                          <a
                            className="btn btn-app btn-gradient"
                            onClick={() =>
                              Eliminar(tareas.idTarea, tareas.titulo)
                            }
                          >
                            <i
                              className="bi bi-trash3"
                              style={{ color: "white" }}
                            ></i>
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="col-lg-6">
              <h4 className="">Tareas Completadas</h4>
              <table className="table border border-black table-hover">
                <thead>
                  <tr id="tr">
                    <th id="th">ID</th>
                    <th id="th">Titulo</th>
                    <th id="th">Descripción</th>
                    <th id="th">Editar</th>
                    <th id="th">Estado</th>
                    <th id="th">Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  {tareasCompletadas.map((tareas) => {
                    return (
                      <tr key={tareas.idTarea}>
                        <td>{tareas.idTarea}</td>
                        <td>{tareas.titulo}</td>
                        <td>{tareas.descripcion}</td>
                        <td>
                          <a
                            className="btn btn-app btn-gradient2"
                            onClick={() => {
                              setEditar(tareas.idTarea);
                              handleShow();
                            }}
                          >
                            <i className="bi bi-pencil-square"></i>
                          </a>
                        </td>
                        {Editar == tareas.idTarea && (
                          <EditarTarea
                            props={props}
                            show={show}
                            handleClose={handleClose}
                            id={tareas.idTarea}
                            titulo={tareas.titulo}
                            descripcion={tareas.descripcion}
                            estado={tareas.estado}
                            setEditar={setEditar}
                            listarTarea={ListarTareas}
                          ></EditarTarea>
                        )}
                        <td>
                          <button
                            className={`btn btn-${
                              tareas.estado ? "success" : "warning"
                            }`}
                            onClick={() =>
                              CambiarEstado(tareas.idTarea, tareas.estado)
                            }
                          >
                            {tareas.estado ? "Completado" : "Incompleto"}
                          </button>
                        </td>
                        <td>
                          <a
                            className="btn btn-app btn-gradient"
                            onClick={() =>
                              Eliminar(tareas.idTarea, tareas.titulo)
                            }
                          >
                            <i
                              className="bi bi-trash3"
                              style={{ color: "white" }}
                            ></i>
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Inicio;
