// CREAR LA RUTA PARA QUE LA IMG SE CARGUEN EN UNA CARPETA APARTE
// CAPTURAR EL ID DEL USER QUE CREA LAS PQRS

// FORM PQRS
const formPqrsResiden = () => {
  Swal.fire({
    html:
      '<br><br><center><form id="formPQRS" name="formPQRS" class="formSwal">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b id="titregcli" class="titulo">Formulario PQRS</b></h2><br>' +
      '<label class="label"><b>Tipo</b></label><br>' +
      '<select id="tipo" name="tipo" class="input inputMax" title="Tipo">' +
      "<option></option><option>Peticion</option><option>Queja</option>" +
      "<option>Reclamo</option><option>Sugerencia</option></select><br>" +
      '<label class="label"><b>Fecha de Creación</b></label><br>' +
      '<input type="datetime-local" id="fechaCreacion" name="fechaCreacion" readonly class="input"><br>' +
      '<label class="label"><b>Asunto</b></label><br>' +
      '<input type="text" id="asunto" name="asunto" class="input" placeholder="Asunto"' +
      'autocomplete="off"><br>' +
      '<label class="label"><b>Descripción</b></label><br>' +
      '<textarea id="descripcion" name="descripcion" class="input inputext" rows="4" ' +
      'placeholder="Descripción"></textarea><br>' +
      '<label class="label"><b>Imagen</b></label><br>' +
      '<input type="text" id="imagen" name="imagen" class="input"><br>' +
      '<label class="label"><b>ID de Usuario</b></label><br>' +
      '<input type="text" id="usuarioId" name="usuarioId" class="input" placeholder="FUNTION-ID-LOGIN" ' +
      'autocomplete="off"><br><br>' +
      '<button type="button" id="guardarPqrs" name="guardarPqrs" onClick="sendPQRS(event)" ' +
      'class="btn btnRegis">Guardar</button>&nbsp;&nbsp;&nbsp;&nbsp;' +
      '<h3 id="info" class="titazul">.</h3>' +
      "</div>" +
      "</form></center><br><br>",
    width: "100%",
    background: "rgba(0,0,0,0.0)",
    backdrop: true,
    allowOutsideClick: false,
    showConfirmButton: false,
  });
  document.getElementById("fechaCreacion").value = vfecha();
};

// FUNCTION TO SEND THE PQRS TO THE SERVER
const sendPQRS = async (event) => {
  event.preventDefault();

  const tipo = document.getElementById("tipo").value;
  const asunto = document.getElementById("asunto").value;
  const descripcion = document.getElementById("descripcion").value;
  const imagen = document.getElementById("imagen").value;
  const fechaCreacion = document.getElementById("fechaCreacion").value;
  const usuarioId = document.getElementById("usuarioId").value;
  console.log(tipo, asunto, descripcion, imagen, fechaCreacion, usuarioId);
  if (
    tipo == "" ||
    asunto == "" ||
    descripcion == "" ||
    imagen == "" ||
    fechaCreacion == "" ||
    usuarioId == ""
  ) {
    Swal.fire({
      icon: "error",
      text: "Todos los campos son obligatorios",
    });
    return;
  }
  document.getElementById("guardarPqrs").disabled = true;
  document.getElementById("info").innerHTML = "Enviando.....";
  try {
    const response = await window.axios.post("/api/createPQRS", {
      tipo,
      asunto,
      descripcion,
      imagen,
      fechaCreacion,
      usuarioId,
    });
    if (response.status === 201) {
      console.log("Registro de PQRS exitoso");
      const mensaje = response.data.mensaje;
      Swal.fire({
        icon: "success",
        text: mensaje,
      });
    }
  } catch (error) {
    if (error.response) {
      const mensaje = error.response.data.error;
      Swal.fire({
        icon: "error",
        text: mensaje,
      });
      console.error("Error catch, Error en la solicitud:", error);
    }else {
      console.error("Error en la solicitud:", error.message); // Muestra un mensaje de error en la consola si no hay una respuesta del servidor
    }
  }
};

/*
This file has the formPqrsResiden function to create a form with Swal and the asynchroned
sendPQRS function to capture form data and send it to the server.
*/
