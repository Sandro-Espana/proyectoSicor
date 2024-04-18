// FORM LIST PQRS
const formPqrsAdmin = () => {
  Swal.fire({
    html:
      '<br><br><center><form id="formPqrsAdmin" name="formPQRS" class="formSwal">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b id="titregcli" class="titulo">Gestionar PQRS</b></h2><br>' +
      '<button type="button" id="btnList" name="btnList" onClick="listPqrs(event)"'+
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

// FUNCTION LISTS ALL PQRS
const listPqrs = async (event) => {
  event.preventDefault();
  
  document.getElementById("info").innerHTML = "Listando PQRS...";
  try {
    const response = await axios.get("/api/listPqrs");
    console.log(response);
    renderPqrs(response);
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

//Renderiza JSON
function renderPqrs(response) {
  cerrarSwal();
  const data = response.data;
  if (data && data.length > 0) {
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
      const fecha = new Date(item.date_creation);
      const fechaFormateada = `${fecha.getDate()}/${fecha.getMonth() + 1}`;
      tableHtml += `<tr>
      <td>${item.id_pqrs}</td>
      <td>${item.state}</td>
      <td>${item.type}</td>
      <td>${item.subject}</td>
      <td>${item.description}</td>
      <td>${fechaFormateada}</td>
      <td><button
      type='button'
      class=''
      onclick='formUpdatePqrs(${item.id_pqrs}, "${item.state}", "${item.subject}", "${item.description}")'
      >modificar
      </button>
      </td>
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

// FORM UPDATE PQRS
const formUpdatePqrs = (idPqrs, state, subject, description) => {
  Swal.fire({
    html:
      '<br><br><center><form id="modiData" name="" class="formSwal" onsubmit="sendText(event)">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b id="titregcli" class="titulo">Responder PQRS</b></h2><br>' +
      '<label class="label"><b>Estado</b></label><br>' +
      '<select id="state" name="state" class="input inputMax" title="estado"><option>' +
      "</option><option>Pendiente</option><option>En Proceso</option><option>Resuelto</option>" +
      "</select><br>" +
      '<label class="label"><b>ID Pqrs</b></label><br>' +
      '<input type="text" id="idPqrs" name="idPqrs" class="input" readOnly><br>' +
      '<label class="label"><b>Asunto</b></label><br>' +
      '<input type="text" id="subject" name="subject" class="input" readOnly><br><br><br>' +
      '<label class="label"><b>Descripcion</b></label><br>' +
      '<textarea id="description" name="description" class="input inputext" readonly'+
      'rows="4" placeholder="Descripción"></textarea><br>' +
      '<label class="label"><b>Respuesta</b></label><br>' +
      '<textarea id="response" name="response" class="input inputext"  rows="4" ' +
      'placeholder="Respuesta"></textarea><br>' +
      '<input type="button" id="updatePqrs" name="updatePqrs" class="btn" '+
      'onclick="sendUpdatePqrs(event)" value="Guardar"><br><br>' +
      '<input type="button" id="Eliminar" name="Eliminar" class="btn btninfo"' +
      'onClick="formConfirDelet()" value="Eliminar"><br><br>' +
      '<h3 id="info" class="titazul">.</h3>' +
      "</div>" +
      "</form></center><br><br>",
    width: "100%",
    background: "rgba(0,0,0,0.0)",
    backdrop: true,
    allowOutsideClick: false,
    showConfirmButton: false,
  });
  
  document.getElementById("idPqrs").value = idPqrs;
  document.getElementById("state").value = state;
  document.getElementById("subject").value = subject;
  document.getElementById("description").value = description;

 /* let table = document.getElementById("tablaPQRS");
  for (let i = 0, row; (row = table.rows[i]); i++) {
    if (table.rows[i].cells[0].innerHTML == idPqrs) {
      document.getElementById("subject").value =
        table.rows[i].cells[1].innerHTML;
      document.getElementById("description").value =
        table.rows[i].cells[2].innerHTML;
      return;
    }
  }*/
};


//UPDATE PQRS
const sendUpdatePqrs = async (event) => {
  event.preventDefault();

  const state = document.getElementById("state").value;
  const id_pqrs = document.getElementById("idPqrs").value;
  const reply = document.getElementById("response").value;

  if (state == "" || reply == "") {
    document.getElementById("info").innerHTML =
      "Los campos estado y respuesta son obligatorio";
    setTimeout("document.getElementById('info').innerHTML = ''", 4000);
    return;
  }
  document.getElementById("updatePqrs").disabled = true;
  document.getElementById("info").innerHTML = "Enviando.....";
  try {
    const response = await axios.put(`/api/updatePqrs/${id_pqrs}`, {
      state,
      reply,
    });
    if (response.status === 201) {
      Swal.fire({
        icon: "success",
        text: message,
      });
    }
  } catch (error) {
    if (error.response) {
      const message = error.response.data.error;
      Swal.fire({
        icon: "error",
        text: message,
      });
    } else {
      console.error("Error en la solicitud:", error.message);
    }
  }
};

//FORM DELETE CONFIRM
const formConfirDelet = () => {
  let idPqrs = document.getElementById("idPqrs").value;
  Swal.fire({
    html:
      '<br><br><center><form id="formPqrsAdmin" name="formPQRS" class="formSwal">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b id="titregcli" class="titulo">¿Eliminar PQRS?</b></h2><br>' +
      '<input type="button" id="id_pqrs" name="id_pqrs" class="btn btninfo" readonly><br><br>' +
      '<button type="button" id="eliminarBtn" name="eliminarBtn" onClick="deletePqrs(event)"'+
      'class="btn btnMedio">Eliminar ' +
      '<h3 id="info" class="titazul"></h3>' +
      "</div>" +
      "</form></center><br><br>",
    width: "100%",
    background: "rgba(0,0,0,0.0)",
    backdrop: true,
    allowOutsideClick: false,
    showConfirmButton: false,
  });
  document.getElementById("id_pqrs").value = idPqrs;
};

//FUNCTION DELETE
const deletePqrs = async (event) => {
  event.preventDefault();

  const id_pqrs = document.getElementById("id_pqrs").value;
  //document.getElementById("info").innerHTML = "Eliminando...";
  try {
    const response = await axios.delete(`/api/deletePqrs/${id_pqrs}`);
    if (response.status === 201) {
      const message = response.data.message;
      Swal.fire({
        icon: "success",
        text: message,
      });
    }
  } catch (error) {
    if (error.response) {
      const message = error.response.data.error;
      Swal.fire({
        icon: "error",
        text: message,
      });
    } else {
      console.error("Error en la solicitud:", error.message);
    }
  }
};
