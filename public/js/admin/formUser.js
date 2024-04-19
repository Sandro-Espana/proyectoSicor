<<<<<<< HEAD
// FORM LIST USER
=======


// FORM LISTAR USER
>>>>>>> desarrollo
const formUser = () => {
  Swal.fire({
    html:
      '<br><br><center><form id="formUser" name="formUser=" class="formSwal">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b id="titregcli" class="titulo">Gestionar usuarios</b></h2><br>' +
<<<<<<< HEAD
      '<button type="button" id="Btnlistar" name="Btnlistar" onClick="listUser(event)"' +
      'class="btn btnMedio">Listar</button>&nbsp;&nbsp;&nbsp;&nbsp;' +
=======
      '<button type="button" id="BtnlistReside" name="Btnlistar" onClick="listResident(event)"' +
      'class="btn ">Residentes</button>&nbsp;&nbsp;&nbsp;&nbsp;' +
      '<button type="button" id="BtnlistPropie" name="Btnlistar" onClick="formListRegister(event)"' +
      'class="btn ">Propietarios</button>&nbsp;&nbsp;&nbsp;&nbsp;<br><br>' +
>>>>>>> desarrollo
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
<<<<<<< HEAD
=======

>>>>>>> desarrollo

// FUNCTION LIST USERS
const listResident = async (event) => {
  event.preventDefault();
  document.getElementById("info").innerHTML = "Listando Residentes...";
  try {
    const response = await axios.get("/api/listResident");
    renderResident(response);
  } catch (error) {
    if (error.response) {
      const message = error.response.data.error;
      console.log("mensaje: ", message);
      Swal.fire({
        icon: "error",
        text: message,
      });
    } else {
      console.error("Error en la solicitud:", error.message);
    }
  }
};

<<<<<<< HEAD
// RENDER JSON IN TABLE HTML
function rendertUser(response) {
=======
// RENDER JSON
function renderResident(response) {
>>>>>>> desarrollo
  cerrarSwal();
  const data = response.data;
  if (data && data.length > 0) {
    // Construir la tabla HTML para mostrar los datos
    let tableHtml =
<<<<<<< HEAD
      "<table id='tablaSancion'><thead><tr>" +
      "<th>ID User</th>" +
      "<th>ID Apt</th>" +
=======
      "<table id='tablaPQRS'><thead><tr>" +
      "<th>Residente</th>" +
      "<th>APT</th>" +
>>>>>>> desarrollo
      "<th>Nombres</th>" +
      "<th>Apellidos</th>" +
      "<th>Email</th>" +
      "<th>Celular</th>" +
      "<th>Propietario</th>" +
      "<th>Gestionar</th>" +
      "</tr></thead><tbody>";
    data.forEach((item) => {
      tableHtml += `<tr>
<<<<<<< HEAD
      <td>${item.id_residente}</td>
      <td>${item.unidad_residencial}</td>
      <td>${item.nombre}</td>
      <td>${item.apellido}</td>
=======
      <td>${item.id_resident}</td>
      <td>${item.id_apartament}</td>
      <td>${item.name}</td>
      <td>${item.lastname}</td>
>>>>>>> desarrollo
      <td>${item.username}</td>
      <td>${item.mobile}</td>
      <td><button
      type='button'
      class=''
<<<<<<< HEAD
      onclick='modiUser(${item.id_residente}, "${item.unidad_residencial}")'>
=======
      onclick='modiUser(${item.id_owner})'>
      Gestionar
      </button></td>
      <td><button
      type='button'
      class=''
      onclick='formManageResident(${item.id_resident},  "${item.id_apartament}")'>
>>>>>>> desarrollo
      Gestionar
      </button></td>
      </tr>`;
    });
    tableHtml += "</tbody></table>";

<<<<<<< HEAD
    // RENDER SEARCH BAR
=======
>>>>>>> desarrollo
    document.getElementById("container-table").innerHTML = tableHtml;
    document.getElementById("searchInput").style.display = "block";
  } else {
    document.getElementById("container-table").innerHTML =
      "No hay datos disponibles.";
  }
}

<<<<<<< HEAD
// FORM MANAGE USER
let modiUser = (id, unidad_residencial) => {
  console.log("modiUser ", id, "unidad_residencial ", unidad_residencial);
=======
// FORM MANAGE RESIDENT
let formManageResident = (id, apt) => {
  console.log("sanUser ", id, apt);
>>>>>>> desarrollo
  Swal.fire({
    html:
      '<br><br><center><form id="modiUser" name="modiUser" class="formSwal" onsubmit="sendText(event)">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b id="titregcli" class="titulo">Gestionar usuarios</b></h2><br>' +
      '<input type="button" id="sancionar" name="sancionar" class="btn btninfo" ' +
<<<<<<< HEAD
      'onClick="formSanciones(' + id + ', \'' + unidad_residencial + '\')"'+
      'value="Sancionar"><br><br><input type="button" id="Eliminar" name="Eliminar" class="btn btninfo"' +
      'onClick="formDeleUser(' +
=======
      'onClick="formSanciones(' +
      id +
      ", '" +
      apt +
      '\')" value="Sancionar"><br><br>' +
      '<input type="button" id="Eliminar" name="Eliminar" class="btn btninfo"' +
      ' onClick="formDeletResident(' +
>>>>>>> desarrollo
      id +
      ')" value="Eliminar"><br><br>' +
      '<h3 id="info" class="titazul">.</h3>' +
      "</div>" +
      "</form></center><br><br>",
    width: "100%",
    background: "rgba(0,0,0,0.0)",
    backdrop: true,
    allowOutsideClick: false,
    showConfirmButton: false,
  });
};

// FORM SANCTION
<<<<<<< HEAD
let formSanciones = (id, unidad_residencial) => {
  console.log("formSancione ", id, "unidad_residencial ", unidad_residencial);
=======
let formSanciones = (id, apt) => {
>>>>>>> desarrollo
  Swal.fire({
    html:
      '<br><br><center><form id="regSancion" name="regSancion" class="formSwal" onsubmit="sendText(event)">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
<<<<<<< HEAD
      '<h2 class=""><b class="titulo">Formulario de Sancion</b></h2><br>' +
      '<label class="label"><b>Estado</b></label><br>' +
      '<select id="estado" name="tipo" class="input inputMax" title="Tipo">' +
      "<option></option><option>Activa</option>" +
      "<option>Revocada</option><option>Apelación</option></select><br>" +
      '<label class="label"><b>ID Residente</b></label><br>' +
      '<input type="text" id="residenteID" name="residenteID" class="input" readonly ' +
=======
      '<h2 class=""><b class="titulo">Llamado de atencion</b></h2><br>' +
      '<label class="label"><b>Estado</b></label><br>' +
      '<select id="status" name="status" class="input inputMax" title="Tipo">' +
      "<option></option><option>Enviado</option>" +
      "<option>Conciliado</option><option>Sancionado</option></select><br>" +
      '<label class="label"><b>Apartamento</b></label><br>' +
      '<input type="text" id="idApartament" name="idApartament" class="input" readonly ' +
      'autocomplete="off"><br>' +
      '<label class="label"><b>Residente</b></label><br>' +
      '<input type="text" id="idResident" name="idResident" class="input" readonly ' +
>>>>>>> desarrollo
      'autocomplete="off"><br>' +
      '<label class="label"><b>ID Apartamento</b></label><br>' +
      '<input type="text" id="id_apat" name="id_apat" class="input" readonly ' +
      'autocomplete="off"><br>' +
      '<label class="label"><b>Fecha y hora</b></label><br>' +
<<<<<<< HEAD
      '<input type="datetime-local" id="fechaCreacion" name="fechaCreacion" readonly class="input"><br>' +
      '<textarea id="descripcion" name="descripcion" class="input inputext" rows="4" ' +
      'placeholder="Descripción"></textarea><br>' +
      '<label class="label"><b>Foto de Evidencia</b></label><br>' +
      '<input type="file" id="fotoEvidencia" name="fotoEvidencia" class="input" accept="image/*"><br><br>' +
      '<input type="button" id="guardarSancion" name="guardar" class="btn" onClick="saveSanction(event)" ' +
=======
      '<input type="datetime-local" id="dateCreation" name="dateCreation" readonly class="input"><br>' +
      '<label class="label"><b>Llamado de atencion</b></label><br>' +
      '<input type="text" id="attention" name="attention" class="input" placeholder="Llamado de atencion" ' +
      'autocomplete="off"><br>' +
      '<label class="label"><b>Documento</b></label><br>' +
      '<input type="file" id="documentPdf" name="document" class="input" accept=".pdf"><br><br>' +
      '<input type="button" id="save" name="save" class="btn" onClick="saveSanction(event)" ' +
>>>>>>> desarrollo
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
<<<<<<< HEAD
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
=======
  document.getElementById("dateCreation").value = vfecha();
  document.getElementById("idResident").value = id;
  document.getElementById("idApartament").value = apt;
};

// FUNCTION TO SEND THE FORM DATA TO THE SERVER
const saveSanction = async (event) => {
  event.preventDefault();

  const id_resident = document.getElementById("idResident").value;
  const date_attention = document.getElementById("dateCreation").value;
  const attention = document.getElementById("attention").value;
  const state = document.getElementById("status").value;
  const documentPdf = document.getElementById("documentPdf").value;
  const id_apt = document.getElementById("idApartament").value
  if (
    id_resident == "" ||
    date_attention == "" ||
    attention == "" ||
    state == "" ||
    id_apt == "" ||
    document == ""
  ) {
    document.getElementById("info").innerHTML =
      "Todos los campos son obligatorio";
    setTimeout("document.getElementById('info').innerHTML  = ''", 3000);
>>>>>>> desarrollo
    return;
  }
  document.getElementById("guardarSancion").disabled = true;
  document.getElementById("info").innerHTML = "Enviando.....";
  try {
    const response = await axios.post("/api/newSanction", {
<<<<<<< HEAD
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
=======
      id_resident,
      date_attention,
      attention,
      state,
      id_apt,
      documentPdf,
    });
    if (response.status === 201) {
      const mensaje = response.data.message;
>>>>>>> desarrollo
      Swal.fire({
        icon: "success",
        text: mensaje,
      });
    }
  } catch (error) {
    if (error.response) {
      const mensaje = error.response.data.error;
<<<<<<< HEAD
=======
      console.log("mensaje: ", mensaje);
>>>>>>> desarrollo
      Swal.fire({
        icon: "error",
        text: mensaje,
      });
<<<<<<< HEAD
      console.error("Error catch, Error en la solicitud:", error);
=======
>>>>>>> desarrollo
    } else {
      console.error("Error en la solicitud:", error.message);
    }
  }
};

// FORM DELETE CONFIRM
<<<<<<< HEAD
const formDeleUser = (id) => {
  console.log("formDeleUser ", id);

  // let cod = document.getElementById("codigo").value;
=======
const formDeletResident = (id) => {

>>>>>>> desarrollo
  Swal.fire({
    html:
      '<br><br><center><form id="formDeleUser" name="formDeleUser" class="formSwal">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b id="titregcli" class="titulo">¿Eliminar usuario?</b></h2><br>' +
      '<input type="button" id="BtndeleUser" name="codi" class="btn btninfo" readonly><br><br>' +
<<<<<<< HEAD
      '<input type="button" id="codi" name="codi" class="btn btninfo" onclick="deletUser(' +
=======
      '<input type="button" id="codi" name="codi" class="btn btninfo" onclick="deletResident(' +
>>>>>>> desarrollo
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
<<<<<<< HEAD
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
=======
const deletResident = async (id_resident) => {

  document.getElementById("info").innerHTML = "Eliminando.....";
  try {
    const response = await axios.delete(`/api/deleteResident/${id_resident}`);
    if (response.status === 201) {
      const message = response.data.message;
      Swal.fire({
        icon: "success",
        text: message,
>>>>>>> desarrollo
      });
    }
  } catch (error) {
    if (error.response) {
<<<<<<< HEAD
      const mensaje = error.response.data.error;
=======
      const mensaje = error.response.data.error.message;
      console.log("mensaje: ", mensaje);
>>>>>>> desarrollo
      Swal.fire({
        icon: "error",
        text: mensaje,
      });
<<<<<<< HEAD
      console.error("Error catch, Error en la solicitud:", error);
    } else {
      console.error("Error en la solicitud:", error.message);
=======
    } else {
      console.error("Error en la solicitud:", error);
>>>>>>> desarrollo
    }
  }
};


/*
THIS FILE CONTAINS THE FUNCTION

*/