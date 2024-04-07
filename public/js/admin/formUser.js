// FORM LIST USER
const formUser = () => {
  Swal.fire({
    html:
      '<br><br><center><form id="formUser" name="formUser=" class="formSwal">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b id="titregcli" class="titulo">Gestionar usuarios</b></h2><br>' +
      '<button type="button" id="Btnlistar" name="Btnlistar" onClick="listUser(event)"' +
      'class="btn btnMedio">Listar</button>&nbsp;&nbsp;&nbsp;&nbsp;' +
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

// RENDER JSON IN TABLE HTML
function rendertUser(response) {
  cerrarSwal();
  const data = response.data;
  if (data && data.length > 0) {
    // Construir la tabla HTML para mostrar los datos
    let tableHtml =
      "<table id='tablaSancion'><thead><tr>" +
      "<th>ID User</th>" +
      "<th>ID Apt</th>" +
      "<th>Nombres</th>" +
      "<th>Apellidos</th>" +
      "<th>Email</th>" +
      "<th>Celular</th>" +
      "<th>Propietario</th>" +
      "<th>Gestionar</th>" +
      "</tr></thead><tbody>";
    data.forEach((item) => {
      tableHtml += `<tr>
      <td>${item.id_residente}</td>
      <td>${item.unidad_residencial}</td>
      <td>${item.nombre}</td>
      <td>${item.apellido}</td>
      <td>${item.username}</td>
      <td>${item.celular}</td>
      <td>${item.prpietario_id}</td>
      <td><button
      type='button'
      class=''
      onclick='modiUser(${item.id_residente}, "${item.unidad_residencial}")'>
      Gestionar
      </button></td>
      </tr>`;
    });
    tableHtml += "</tbody></table>";

    // RENDER SEARCH BAR
    document.getElementById("container-table").innerHTML = tableHtml;
    document.getElementById("searchInput").style.display = "block";
  } else {
    // Mostrar un mensaje si no hay datos
    document.getElementById("container-table").innerHTML =
      "No hay datos disponibles.";
  }
}

// FORM MANAGE USER
let modiUser = (id, unidad_residencial) => {
  console.log("modiUser ", id, "unidad_residencial ", unidad_residencial);
  Swal.fire({
    html:
      '<br><br><center><form id="modiUser" name="modiUser" class="formSwal" onsubmit="sendText(event)">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b id="titregcli" class="titulo">Gestionar usuarios</b></h2><br>' +
      '<input type="button" id="sancionar" name="sancionar" class="btn btninfo" ' +
      'onClick="formSanciones(' + id + ', \'' + unidad_residencial + '\')"'+
      'value="Sancionar"><br><br><input type="button" id="Eliminar" name="Eliminar" class="btn btninfo"' +
      'onClick="formDeleUser(' +
      id +
      ')" value="Eliminar"><br><br>' +
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
let formSanciones = (id, unidad_residencial) => {
  console.log("formSancione ", id, "unidad_residencial ", unidad_residencial);
  Swal.fire({
    html:
      '<br><br><center><form id="regSancion" name="regSancion" class="formSwal" onsubmit="sendText(event)">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b class="titulo">Formulario de Sancion</b></h2><br>' +
      '<label class="label"><b>Estado</b></label><br>' +
      '<select id="estado" name="tipo" class="input inputMax" title="Tipo">' +
      "<option></option><option>Activa</option>" +
      "<option>Revocada</option><option>Apelación</option></select><br>" +
      '<label class="label"><b>ID Residente</b></label><br>' +
      '<input type="text" id="residenteID" name="residenteID" class="input" readonly ' +
      'autocomplete="off"><br>' +
      '<label class="label"><b>ID Apartamento</b></label><br>' +
      '<input type="text" id="id_apat" name="id_apat" class="input" readonly ' +
      'autocomplete="off"><br>' +
      '<label class="label"><b>Fecha y hora</b></label><br>' +
      '<input type="datetime-local" id="fechaCreacion" name="fechaCreacion" readonly class="input"><br>' +
      '<textarea id="descripcion" name="descripcion" class="input inputext" rows="4" ' +
      'placeholder="Descripción"></textarea><br>' +
      '<label class="label"><b>Foto de Evidencia</b></label><br>' +
      '<input type="file" id="fotoEvidencia" name="fotoEvidencia" class="input" accept="image/*"><br><br>' +
      '<input type="button" id="guardarSancion" name="guardar" class="btn" onClick="saveSanction(event)" ' +
      'value="Guardar">&nbsp;&nbsp;&nbsp;&nbsp;' +
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
  document.getElementById("residenteID").value = id;
  document.getElementById("id_apat").value = unidad_residencial;
};

// FUNCTION SEND SANCTION
const saveSanction = async (event) => {
  event.preventDefault();

  const residente_id = document.getElementById("residenteID").value;
  const fecha_hora = document.getElementById("fechaCreacion").value;
  const descripcion = document.getElementById("descripcion").value;
  const estado = document.getElementById("estado").value;
  const foto_evidencia = document.getElementById("fotoEvidencia").value;
  const unidad_residencial = document.getElementById("id_apat").value;
  if (
    residente_id == "" ||
    fecha_hora == "" ||
    descripcion == "" ||
    estado == "" ||
    foto_evidencia == "" ||
    unidad_residencial == ""
  ) {
    document.getElementById("info").innerHTML =
      "Todos los campos son requeridos.";
    return;
  }
  document.getElementById("guardarSancion").disabled = true;
  document.getElementById("info").innerHTML = "Enviando.....";
  try {
    const response = await axios.post("/api/newSanction", {
      residente_id,
      fecha_hora,
      descripcion,
      estado,
      foto_evidencia,
      unidad_residencial
    });
    if (response.status === 201) {
      console.log("Registro de Sancion exitoso");
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
    } else {
      console.error("Error en la solicitud:", error.message);
    }
  }
};

// FORM DELETE CONFIRM
const formDeleUser = (id) => {
  console.log("formDeleUser ", id);

  // let cod = document.getElementById("codigo").value;
  Swal.fire({
    html:
      '<br><br><center><form id="formDeleUser" name="formDeleUser" class="formSwal">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b id="titregcli" class="titulo">¿Eliminar usuario?</b></h2><br>' +
      '<input type="button" id="BtndeleUser" name="codi" class="btn btninfo" readonly><br><br>' +
      '<input type="button" id="codi" name="codi" class="btn btninfo" onclick="deletUser(' +
      id +
      ')"' +
      'value="Eliminarr"><br><br>' +
      '<h3 id="info" class="titazul"></h3>' +
      "</div>" +
      "</form></center><br><br>",
    width: "100%",
    background: "rgba(0,0,0,0.0)",
    backdrop: true,
    allowOutsideClick: false,
    showConfirmButton: false,
  });
  document.getElementById("BtndeleUser").value = id;
};

// FUNCTION DELETE USER
const deletUser = async (codi) => {
  //event.preventDefault();
  let id_user = codi;
  //codigo = document.getElementById("BtndeleUser").value;
  console.log(" codigo deletUser : ", id_user);
  document.getElementById("info").innerHTML = "Eliminando.....";
  try {
    const response = await axios.delete(`/api/deleteUser/${id_user}`);
    if (response.status === 201) {
      console.log("Residente eliminado con exito");
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
    } else {
      console.error("Error en la solicitud:", error.message);
    }
  }
};
