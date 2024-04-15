// EN PROPIETARIOS PONER COEFICIENTE DE COPROPIEDAD  UN NUMERO PORCENTUAL

// FORM LISTAR USER
const formUser = () => {
  Swal.fire({
    html:
      '<br><br><center><form id="formUser" name="formUser=" class="formSwal">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b id="titregcli" class="titulo">Gestionar usuarios</b></h2><br>' +
      '<button type="button" id="BtnlistReside" name="Btnlistar" onClick="listResident(event)"' +
      'class="btn ">Residentes</button>&nbsp;&nbsp;&nbsp;&nbsp;' +
      '<button type="button" id="BtnlistPropie" name="Btnlistar" onClick="listResident(event)"' +
      'class="btn ">Propietarios</button>&nbsp;&nbsp;&nbsp;&nbsp;<br><br>' +
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

//RENDER JSON
function renderResident(response) {
  cerrarSwal();
  const data = response.data;
  if (data && data.length > 0) {
    // Construir la tabla HTML para mostrar los datos
    let tableHtml =
      "<table id='tablaPQRS'><thead><tr>" +
      "<th>Residente</th>" +
      "<th>APT</th>" +
      "<th>Nombres</th>" +
      "<th>Apellidos</th>" +
      "<th>Email</th>" +
      "<th>Celular</th>" +
      "<th>Propietario</th>" +
      "<th>Gestionar</th>" +
      "</tr></thead><tbody>";
    data.forEach((item) => {
      tableHtml += `<tr>
      <td>${item.id_resident}</td>
      <td>${item.id_apartament}</td>
      <td>${item.name}</td>
      <td>${item.lastname}</td>
      <td>${item.username}</td>
      <td>${item.mobile}</td>
      <td><button
      type='button'
      class=''
      onclick='modiUser(${item.id_owner})'>
      Gestionar
      </button></td>
      <td><button
      type='button'
      class=''
      onclick='sanUser(${item.id_resident},  "${item.id_apartament}")'>
      Gestionar
      </button></td>
      </tr>`;
    });
    tableHtml += "</tbody></table>";

    document.getElementById("container-table").innerHTML = tableHtml;
    document.getElementById("searchInput").style.display = "block";
  } else {
    document.getElementById("container-table").innerHTML =
      "No hay datos disponibles.";
  }
}

//FORM MANAGE USER
let sanUser = (id, apt) => {
  console.log("sanUser ", id, apt);
  Swal.fire({
    html:
      '<br><br><center><form id="modiUser" name="modiUser" class="formSwal" onsubmit="sendText(event)">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b id="titregcli" class="titulo">Gestionar usuarios</b></h2><br>' +
      '<input type="button" id="sancionar" name="sancionar" class="btn btninfo" ' +
      'onClick="formSanciones(' +
      id +
      ", '" +
      apt +
      '\')" value="Sancionar"><br><br>' +
      '<input type="button" id="Eliminar" name="Eliminar" class="btn btninfo"' +
      ' onClick="formDeleUser(' +
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
let formSanciones = (id, apt) => {
  Swal.fire({
    html:
      '<br><br><center><form id="regSancion" name="regSancion" class="formSwal" onsubmit="sendText(event)">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b class="titulo">Formulario de Sanciones</b></h2><br>' +
      '<label class="label"><b>Estado</b></label><br>' +
      '<select id="status" name="status" class="input inputMax" title="Tipo">' +
      "<option></option><option>Enviado</option>" +
      "<option>Conciliado</option><option>Sancionado</option></select><br>" +
      '<label class="label"><b>Apartamento</b></label><br>' +
      '<input type="text" id="idApartament" name="idApartament" class="input" readonly ' +
      'autocomplete="off"><br>' +
      '<label class="label"><b>Residente</b></label><br>' +
      '<input type="text" id="idResident" name="idResident" class="input" readonly ' +
      'autocomplete="off"><br>' +
      '<label class="label"><b>Fecha y hora</b></label><br>' +
      '<input type="datetime-local" id="dateCreation" name="dateCreation" readonly class="input"><br>' +
      '<label class="label"><b>Llamado de atencion</b></label><br>' +
      '<input type="text" id="attention" name="attention" class="input" accept=".pdf" placeholder="Llamado de atencion" ' +
      'autocomplete="off"><br>' +
      '<label class="label"><b>Documento</b></label><br>' +
      '<input type="file" id="documentPdf" name="document" class="input" accept="image/*"><br><br>' +
      '<input type="button" id="save" name="save" class="btn" onClick="saveSanction(event)" ' +
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
  document.getElementById("dateCreation").value = vfecha();
  document.getElementById("idResident").value = id;
  document.getElementById("idApartament").value = apt;
};

// FUNCTION SEND SANCTION
const saveSanction = async (event) => {
  event.preventDefault();

  const id_resident = document.getElementById("idResident").value;
  const date_time = document.getElementById("dateCreation").value;
  const attention = document.getElementById("attention").value;
  const state = document.getElementById("status").value;
  const documentPdf = document.getElementById("documentPdf").value;
  const id_apt = document.getElementById("idApartament").value
  if (
    id_resident == "" ||
    date_time == "" ||
    attention == "" ||
    state == "" ||
    id_apt == "" ||
    document == ""
  ) {
    document.getElementById("info").innerHTML =
      "Todos los campos son obligatorio";
    setTimeout("document.getElementById('info').innerHTML  = ''", 3000);
    return;
  }
  //document.getElementById("actualizar").disabled = true;
  document.getElementById("info").innerHTML = "Enviando.....";
  try {
    const response = await axios.post("/api/newSanction", {
      id_resident,
      date_time,
      attention,
      state,
      id_apt,
      documentPdf,
    });
    if (response.status === 201) {
      const mensaje = response.data.message;
      Swal.fire({
        icon: "success",
        text: mensaje,
      });
    }
  } catch (error) {
    if (error.response) {
      const mensaje = error.response.data.error;
      console.log("mensaje: ", mensaje);
      Swal.fire({
        icon: "error",
        text: mensaje,
      });
    } else {
      console.error("Error en la solicitud:", error.message);
    }
  }
};

//FORM DELETE CONFIRM
const formDeleUser = (id) => {

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
const deletUser = async (id_resident) => {

  document.getElementById("info").innerHTML = "Eliminando.....";
  try {
    const response = await axios.delete(`/api/deleteResident/${id_resident}`);
    if (response.status === 201) {
      const message = response.data.message;
      Swal.fire({
        icon: "success",
        text: message,
      });
    }
  } catch (error) {
    if (error.response) {
      const mensaje = error.response.data.error.message;
      console.log("mensaje: ", mensaje);
      Swal.fire({
        icon: "error",
        text: mensaje,
      });
    } else {
      console.error("Error en la solicitud:", error);
    }
  }
};
