// FORM LIST PQRS
const formPqrsAdmin = () => {
  Swal.fire({
    html:
      '<br><br><center><form id="formPqrsAdmin" name="formPQRS" class="formSwal">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b id="titregcli" class="titulo">GESTIONAR PQRS</b></h2><br>' +
      '<button type="button" id="listarBtn" name="listarBtn" onClick="listarPQRS(event)"'+
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

// FUNCTION LIST PQRS
const listarPQRS = async (event) => {
  event.preventDefault();
  
  document.getElementById("info").innerHTML = "Listando PQRS.....";
  try {
    const response = await axios.get("/api/listarPQRS");
    listData(response);
    if (response.status === 200) {
      console.log("Listado de PQRS exitoso");
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
};

// RENDER JSON
function listData(response) {
  cerrarSwal();
  const data = response.data;
  if (data && data.length > 0) {
    // Construir la tabla HTML para mostrar los datos
    let tableHtml =
      "<table id='tablaPQRS'>" +
      "<thead><tr>" +
      "<th>ID</th>" +
      "<th>Estado</th>" +
      "<th>Tipo</th>" +
      "<th>Asunto</th>" +
      "<th>Descripción</th>" +
      "<th>Fecha</th>" +
      "<th>Gestionar</th>" +
      "</tr></thead><tbody>";
    data.forEach((item) => {
      const fecha = new Date(item.FechaCreacion);
      const fechaFormateada = `${fecha.getDate()}/${fecha.getMonth() + 1}`;
      tableHtml += `<tr>
      <td>${item.PQRSID}</td>
      <td>${item.Estado}</td>
      <td>${item.Tipo}</td>
      <td>${item.Asunto}</td>
      <td>${item.Descripcion}</td>
      <td>${fechaFormateada}</td>
      <td><button
      type='button'
      class=''
      onclick='modiData(${item.PQRSID})'
      >modificar
      </button>
      </td>
      </tr>`;
    });
    tableHtml += "</tbody></table>";

    // Renderizar la tabla en el contenedor deseado
    document.getElementById("container-table").innerHTML = tableHtml;
    document.getElementById("searchInput").style.display = "block";
  } else {
    // Mostrar un mensaje si no hay datos
    document.getElementById("container-table").innerHTML =
      "No hay datos disponibles.";
  }
}

// FORM UPDATE PQRS
let modiData = (cod) => {
  console.log(cod);
  Swal.fire({
    html:
      '<br><br><center><form id="modiData" name="" class="formSwal" onsubmit="sendText(event)">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b id="titregcli" class="titulo">Responder PQRS</b></h2><br>' +
      '<label class="label"><b>Estado</b></label><br>' +
      '<select id="estado" name="estado" class="input inputMax" title="estado"><option>' +
      "</option><option>Pendiente</option><option>En Proceso</option><option>Resuelto</option>" +
      "</select><br>" +
      '<label class="label"><b>Codigo</b></label><br>' +
      '<input type="text" id="codigo" name="codigo" class="input" readOnly><br>' +
      '<label class="label"><b>Asunto</b></label><br>' +
      '<input type="text" id="asunto" name="asunto" class="input" readOnly><br><br><br>' +
      '<label class="label"><b>Descripcion</b></label><br>' +
      '<textarea id="descripcion" name="descripcion" class="input inputext" readonly' +
      'rows="4" placeholder="Descripción"></textarea><br>' +
      '<label class="label"><b>Respuesta</b></label><br>' +
      '<textarea id="respuesta" name="respuesta" class="input inputext"  rows="4" ' +
      'placeholder="Respuesta"></textarea><br>' +
      '<input type="button" id="Eliminar" name="Eliminar" class="btn btninfo"' +
      'onClick="formConfirDelet()" value="Eliminar"><br><br>' +
      '<input type="button" id="actualizar" name="actualizar" class="btn" ' +
      'onclick="UpdatePqrs(event)" value="Guardar"><br><br>' +
      '<h3 id="info" class="titazul">.</h3>' +
      "</div>" +
      "</form></center><br><br>",
    width: "100%",
    background: "rgba(0,0,0,0.0)",
    backdrop: true,
    allowOutsideClick: false,
    showConfirmButton: false,
  });

  document.getElementById("codigo").value = cod;

  let table = document.getElementById("tablaPQRS");
  for (let i = 0, row; (row = table.rows[i]); i++) {
    if (table.rows[i].cells[0].innerHTML == cod) {
      document.getElementById("asunto").value =
        table.rows[i].cells[1].innerHTML;
      document.getElementById("descripcion").value =
        table.rows[i].cells[3].innerHTML;
      return;
    }
  }
};

// FUNCTION SEARCH-BAR
function doSearch() {
  if (document.getElementById("tablaPQRS")) {
    const tableReg = document.getElementById("tablaPQRS");
    const searchText = document
      .getElementById("searchInput")
      .value.toLowerCase();
    let total = 0;

    // Recorremos todas las filas con contenido de la tabla
    for (let i = 1; i < tableReg.rows.length; i++) {
      let found = false;
      const cellsOfRow = tableReg.rows[i].getElementsByTagName("td");
      // Recorremos todas las celdas
      for (let j = 0; j < cellsOfRow.length && !found; j++) {
        const compareWith = cellsOfRow[j].innerHTML.toLowerCase();
        // Buscamos el texto en el contenido de la celda
        if (searchText.length == 0 || compareWith.indexOf(searchText) > -1) {
          found = true;
          total++;
        }
      }
      if (found) {
        tableReg.rows[i].style.display = "";
      } else {
        // si no ha encontrado ninguna coincidencia, esconde la fila de la tabla
        tableReg.rows[i].style.display = "none";
      }
    }
    // mostramos las coincidencias
  } else {
    document.getElementById("container-table").innerHTML =
      "No hay PQRS para buscar";
  }
}

// FUNCTION UPDATE PQRS
const UpdatePqrs = async (event) => {
  event.preventDefault();

  const estado = document.getElementById("estado").value;
  const codigo = document.getElementById("codigo").value;
  const respuesta = document.getElementById("respuesta").value;
  if (estado == "" || respuesta == "") {
    Swal.fire({
      icon: "error",
      text: "Todos los campos son obligatorios",
    });
    return;
  }
  document.getElementById("actualizar").disabled = true;
  document.getElementById("info").innerHTML = "Enviando.....";
  try {
    const response = await axios.put(`/api/updatePQRS/${codigo}`, {
      estado,
      respuesta,
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
    console.error("Error en la solicitud:", error);
  }
};

// FORM DELETE CONFIRM
const formConfirDelet = () => {
  let cod = document.getElementById("codigo").value;
  Swal.fire({
    html:
      '<br><br><center><form id="formPqrsAdmin" name="formPQRS" class="formSwal">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b id="titregcli" class="titulo">¿Eliminar PQRS?</b></h2><br>' +
      '<input type="button" id="codi" name="codi" class="btn btninfo" readonly><br><br>' +
      '<button type="button" id="eliminarBtn" name="eliminarBtn" onClick="deletePQRS(event)" class="btn btnMedio">Eliminar ' +
      '<h3 id="info" class="titazul"></h3>' +
      "</div>" +
      "</form></center><br><br>",
    width: "100%",
    background: "rgba(0,0,0,0.0)",
    backdrop: true,
    allowOutsideClick: false,
    showConfirmButton: false,
  });
  document.getElementById("codi").value = cod;
};

// FUNCTION DELETE PQRS BY ID
const deletePQRS = async (event) => {
  event.preventDefault();

  const id_pqrs = document.getElementById("codi").value;
  
  document.getElementById("info").innerHTML = "Eliminando";
  //document.getElementById("guardarPqrs").disabled = true;
  try {
    const response = await axios.delete(`/api/deletePQRS/${id_pqrs}`);
    if (response.status === 201) {
      console.log("PQRS eliminada con exitosa");
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
    }
  }
};

/*
formPqrsAdmin() + listarPQRS -> LIST PQRS OBJECTS
listData() -> RENDERS THE OBJECTS LISTED IN AN HTML TABLE
modiData() -> FORM TO ANSWER PQRS
doSearch() -> FUNCTION TO SEARCH IN THE TABLE
UpdatePqrs -> FUNCTION TO SEND A RESPONSE TO THE SERVER
formConfirDelet -> CONFIRMATION FORM TO DELETE PQRS
deletePQRS -> FUNCTION TO DELETE PQRS
*/