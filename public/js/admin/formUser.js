//FORM LISTAR USER
const formUser = () => {
  Swal.fire({
    html:
      '<br><br><center><form id="formUser" name="formUser=" class="formSwal">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b id="titregcli" class="titulo">Gestionar usuarios</b></h2><br>' +
      '<button type="button" id="Btnlistar" name="Btnlistar" onClick="listUser(event)" class="btn btnMedio">Listar</button>&nbsp;&nbsp;&nbsp;&nbsp;' +
      '<h3 id="info" class="titazul"></h3>' +
      "</div>" +
      "</form></center><br><br>",
    width: "100%",
    background: "rgba(0,0,0,0.0)",
    backdrop: true,
    allowOutsideClick: false,
    showConfirmButton: false,
  });
};
function cerrarSwal() {
  Swal.close();
}

// FUNCTION LIST USERS
const listUser = async (event) => {
  event.preventDefault();
  document.getElementById("info").innerHTML = "Listando PQRS.....";
  try {
    const response = await axios.get("/api/listUsers");
    rendertUser(response);
    console.log("response: ", response);
    if (response.status === 200) {
      console.log("Listado de usuarios exitoso");
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
};

//RENDER JSON
function rendertUser(response) {
  cerrarSwal();
  const data = response.data;
  console.log("users: ", data.data);
  if (data && data.length > 0) {
    // Construir la tabla HTML para mostrar los datos
    let tableHtml =
      "<table id='tablaPQRS'><thead><tr>" +
      "<th>ID</th>" +
      "<th>Apt</th>" +
      "<th>Nombres</th>" +
      "<th>Apellidos</th>" +
      "<th>Email</th>" +
      "<th>Celular</th>" +
      "<th>Propietario</th>" +
      "<th>Gestionar</th>" +
      "</tr></thead><tbody>";
    data.forEach((item) => {
      tableHtml += `<tr>
      <td>${item.residente_id}</td>
      <td>${item.unidad_residencial}</td>
      <td>${item.nombre}</td>
      <td>${item.apellido}</td>
      <td>${item.username}</td>
      <td>${item.celular}</td>
      <td>${item.prpietario_id}</td>
      <td><button
      type='button'
      class=''
      onclick='modiUser(${item.residente_id})'>
      Gestionar
      </button></td>
      </tr>`;
    });
    tableHtml += "</tbody></table>";

    // RENDER TABLE
    document.getElementById("container-table").innerHTML = tableHtml;
    document.getElementById("searchInput").style.display = "block";
  } else {
    // Mostrar un mensaje si no hay datos
    document.getElementById("container-table").innerHTML =
      "No hay datos disponibles.";
  }
}

//FORM MANAGE USER
let modiUser = (cod) => {
  Swal.fire({
    html:
      '<br><br><center><form id="modiUser" name="modiUser" class="formSwal" onsubmit="sendText(event)">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b id="titregcli" class="titulo">Gestionar usuarios</b></h2><br>' +
      '<input type="button" id="sancionar" name="sancionar" class="btn btninfo" onClick="formSanciones()" value="Sancionar"><br><br>' +
      '<input type="button" id="Eliminar" name="Eliminar" class="btn btninfo" onClick="formConfirDelet()" value="Eliminar"><br><br>' +
      //'<input type="button" id="actualizar" name="actualizar" class="btn" onclick="UpdatePqrs(event)" value="Guardar"><br><br>' +
      '<h3 id="info" class="titazul">.</h3>' +
      "</div>" +
      "</form></center><br><br>",
    width: "100%",
    background: "rgba(0,0,0,0.0)",
    backdrop: true,
    allowOutsideClick: false, // solo puede cerrar con el boton
    showConfirmButton: false,
  });
};

// FORM SANCTION
let formSanciones = () => {
  Swal.fire({
    html:
      '<br><br><center><form id="regSancion" name="regSancion" class="formSwal" onsubmit="sendText(event)">' +
      '<h2 class=""><b class="titulo">Formulario de Sanciones</b></h2><br>' +
      '<label class="label"><b>Residente ID</b></label><br>' +
      '<input type="text" id="residenteID" name="residenteID" class="input" placeholder="Residente ID" autocomplete="off"><br>' +
      '<label class="label"><b>Fecha y Hora de Sanción</b></label><br>' +
      '<input type="datetime-local" id="fechaHoraSancion" name="fechaHoraSancion" class="input" placeholder="Fecha y Hora de Sanción" autocomplete="off"><br>' +
      '<label class="label"><b>Descripción</b></label><br>' +
      '<input type="text" id="descripcion" name="descripcion" class="input" placeholder="Descripción" autocomplete="off"><br>' +
      '<label class="label"><b>Estado</b></label><br>' +
      '<input type="text" id="estado" name="estado" class="input" placeholder="Estado" autocomplete="off"><br>' +
      '<label class="label"><b>Respuesta del Residente</b></label><br>' +
      '<input type="text" id="respuestaResidente" name="respuestaResidente" class="input" placeholder="Respuesta del Residente" autocomplete="off"><br>' +
      '<label class="label"><b>Foto de Evidencia</b></label><br>' +
      '<input type="file" id="fotoEvidencia" name="fotoEvidencia" class="input" accept="image/*"><br><br>' +
      '<input type="button" id="guardar" name="guardar" class="btn" onclick="saveSanction()" value="Guardar">&nbsp;&nbsp;&nbsp;&nbsp;' +
      '<input type="button" id="cerrar" name="cerrar" class="btn" onclick="cerrarSwal()" value="Cerrar"><br><br>' +
      '<h3 id="info" class="titazul">.</h3>' +
      "</form></center><br><br>",
    width: "100%",
    background: "rgba(0,0,0,0.0)",
    backdrop: true,
    allowOutsideClick: false,
    showConfirmButton: false,
  });
};

function cerrarSwal() {
  swal.close();
}

// FUNCTION SEND SANCTION
const saveSanction = async () => {
  const residenteID = document.getElementById("residenteID").value;
  const fechaHoraSancion = document.getElementById("fechaHoraSancion").value;
  const descripcion = document.getElementById("descripcion").value;
  const estado = document.getElementById("estado").value;
  const respuestaResidente = document.getElementById("respuestaResidente").value;

  try {
    const response = await axios.post("/api/newSanction", {
      residenteID,
      fechaHoraSancion,
      descripcion,
      estado,
      respuestaResidente
    });
    if (response.status === 201) {
      console.log("Sanción creada correctamente");
      Swal.fire({
        icon: 'success',
        text: 'Sanción creada correctamente',
        onClose: () => {
          // Cerrar el formulario después de mostrar el mensaje de éxito
          cerrarSwal();
        }
      });
    }
  } catch (error) {
    console.error("Error al guardar la sanción:", error);
    // Mostrar mensaje de error
    Swal.fire({
      icon: 'error',
      text: 'Error al guardar la sanción'
    });
  }
};

// Función para cerrar el formulario de SweetAlert
function cerrarSwal() {
  Swal.close();
}


//FORM DELETE CONFIRM
const formDeleUser = () => {
  // let cod = document.getElementById("codigo").value;
  Swal.fire({
    html:
      '<br><br><center><form id="formDeleUser" name="formDeleUser" class="formSwal">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b id="titregcli" class="titulo">¿Eliminar usuario?</b></h2><br>' +
      '<input type="button" id="codi" name="codi" class="btn btninfo" onclick="deletUser()" value="Eliminar usuario"><br><br>' +
      //'<input type="button" id="codi" name="codi" class="btn btninfo" onclick="formConfirDelet()" value="Eliminar"><br><br>' +
      '<button type="button" id="eliminarBtn" name="eliminarBtn" onClick="deletUser(event)" class="btn btnMedio">hola ' +
      '<h3 id="info" class="titazul"></h3>' +
      "</div>" +
      "</form></center><br><br>",
    width: "100%",
    background: "rgba(0,0,0,0.0)",
    backdrop: true,
    allowOutsideClick: false,
    showConfirmButton: false,
  });
  //document.getElementById("codi").value = cod;
  //console.log(cod);
};

// FUNCTION DELETE USER
const deletUser = async (event) => {
  event.preventDefault();

  const codigo = document.getElementById("codi").value;
  //console.log("LINEA 208 codigo: ", codigo);
  //document.getElementById("info").innerHTML = "Eliminando.....";
  try {
    const response = await axios.delete(`/api/deleteUser/${codigo}`);
    document.getElementById("info").innerHTML = "Eliminando";
    setTimeout("cerrarSwal()", 2000);
    if (response.status === 200) {
      console.log("Eliminación de PQRS exitosa");
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
};
