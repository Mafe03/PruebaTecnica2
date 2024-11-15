import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import HelperForm from "../helper/Helperform";
import Swal2 from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const Swal = withReactContent(Swal2);

const EditarTarea = ({
  props,
  show,
  handleClose,
  id,
  titulo,
  descripcion,
  estado,
  setEditar,
  listarTarea,
}) => {
  const { form, cambiar } = HelperForm({});

  // El estado que recibimos (booleano) lo transformamos a texto para manejarlo en el formulario
  const [estadoTarea, setEstadoTarea] = useState(
    estado ? "Completado" : "Incompleto"
  );

  useEffect(() => {
    // Cuando el modal se abre, sincronizamos el estado de la tarea con el form
    setEstadoTarea(estado ? "Completado" : "Incompleto");
  }, [estado]);

  const Editar = async (e) => {
    e.preventDefault();
    let formulario = form;

    // Aseguramos que el estado se envíe como un booleano
    const nuevoEstado = estadoTarea === "Completado"; // Convertir el valor del select a booleano

    formulario.estado = nuevoEstado; // Incluimos el estado en el formulario

    try {
      const request = await fetch(`http://localhost:3600/tarea/editar/${id}`, {
        method: "PUT",
        body: JSON.stringify(formulario),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await request.json();

      if (data.id === 200) {
        Swal.fire({
          title: <strong> {"Editado"}</strong>,
          html: <i>{data.mensaje}</i>,
          icon: "success",
        });
        setEditar(0);
        listarTarea();
      } else {
        Swal.fire({
          title: <strong> {"Error"}</strong>,
          html: <i>{data.mensaje}</i>,
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: <strong> {"Error"}</strong>,
        html: <i>Hubo un problema con la solicitud.</i>,
        icon: "error",
      });
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton id="gradient">
          <Modal.Title id="contained-modal-title-vcenter">
            Editar Tarea
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={Editar}>
          <Modal.Body>
            <div className="mb-2">
              <label className="form-label">Editar título</label>
              <input
                type="text"
                className="form-control border-secondary"
                id="titulo"
                name="titulo"
                onChange={cambiar}
                defaultValue={titulo}
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Editar descripción</label>
              <input
                type="text"
                className="form-control border-secondary"
                id="descripcion"
                name="descripcion"
                onChange={cambiar}
                defaultValue={descripcion}
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Estado</label>
              <select
                className="form-control border-secondary"
                id="estado"
                name="estado"
                onChange={(e) => setEstadoTarea(e.target.value)} // Actualizar el estado cuando cambie el select
                value={estadoTarea} // Sincronizamos el select con el estado actual
              >
                <option value="Incompleto">Incompleto</option>
                <option value="Completado">Completado</option>
              </select>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button type="submit" className="btn-gradient">
              <i className="fas fa-edit"></i> Editar
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default EditarTarea;
