// FORM LIST SANCTIONS
const formSanctions = () => {
  Swal.fire({
    html:
      '<br><br><center><form id="formPqrsAdmin" name="formPQRS" class="formSwal">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b id="titregcli" class="titulo">Gestionar Sanciones</b></h2><br>' +
      '<button type="button" id="btnSanction" name="btnSanction" onClick="listSanctions(event)"' +
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

// FUNCTION LIST SANCTIONS
const listSanctions = async (event) => {
  event.preventDefault();

  document.getElementById("info").innerHTML = "Listando Sanciones...";
  try {
    const response = await axios.get("/api/listSanction");
    renderSanction(response);
    console.log(response);
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

// RENDER JSON
function renderSanction(response) {
  cerrarSwal();
  const data = response.data;
  if (data && data.length > 0) {
    let tableHtml =
      "<table id='tablaPQRS'>" +
      "<thead><tr>" +
      "<th>Apt</th>" +
      "<th>Residente</th>" +
      "<th>Estado</th>" +
      "<th>Asunto</th>" +
      "<th>Respuesta</th>" +
      "<th>Fecha</th>" +
      "<th>Gestionar</th>" +
      "</tr></thead><tbody>";
    data.forEach((item) => {
      const fecha = new Date(item.date_attention);
      const fechaFormateada = `${fecha.getDate()}/${fecha.getMonth() + 1}`;
      console.log(item.date_attention);
      tableHtml += `<tr>
      <td>${item.id_apt}</td>
      <td>${item.id_resident}</td>
      <td>${item.state}</td>
      <td>${item.attention}</td>
      <td>${item.response}</td>
      <td>${fechaFormateada}</td>
      <td><button
      type='button'
      class=''
      onclick='formTracking(${item.id_resident},
      "${item.state}", "${item.attention}", "${item.response}", "${item.date_attention}")'
      >seguimiento
      </button>
      </td>
      </tr>`;
    });
    tableHtml += "</tbody></table>";

    // RENDER THE TABLE IN THE CONTAINER
    document.getElementById("container-table").innerHTML = tableHtml;
    document.getElementById("searchInput").style.display = "block";
  } else {
    document.getElementById("container-table").innerHTML =
      "No hay datos disponibles.";
  }
}

// FOLLOW-UP FORM SANCTION
let formTracking = (id_resident, state, attention, response, fechaFormateada) => {
  Swal.fire({
    html:
      '<br><br><center><form id="regSancion" name="regSancion" class="formSwal" onsubmit="sendText(event)">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b class="titulo">Proceso sancion</b></h2><br>' +
      '<label class="label"><b>Estado</b></label><br>' +
      '<select id="state" name="state" class="input inputMax" title="Tipo">' +
      "<option></option><option>enviado</option>" +
      "<option>conciliado</option><option>sancionado</option></select><br>" +
      '<label class="label"><b>Llamado de atencion</b></label><br>' +
      '<input type="text" id="attention" name="attention" class="input" readonly ' +
      'autocomplete="off"><br>' +
      '<label class="label"><b>Respuesta</b></label><br>' +
      '<input type="text" id="response" name="response" class="input" readonly ' +
      'autocomplete="off"><br>' +
      '<label class="label"><b>Fecha y hora</b></label><br>' +
      '<input type="date-local" id="date_time" name="date_time" readonly class="input"><br>' +
      '<label class="label"><b>Acta conciliacion</b></label><br>' +
      '<input type="file" id="conciliation_act" name="conciliation_act" class="input" ' +
      'placeholder="Acta conciliacion" accept=".pdf"' +
      'autocomplete="off"><br>' +
      '<label class="label"><b>Sancionar</b></label><br>' +
      '<select id="sanction" name="sanction" class="input inputMax" title="Tipo">' +
      "<option></option><option>No</option>" +
      "<option>Si</option></select><br><br>" +
      '<input type="button" id="update" name="update" class="btn" onClick="updateSantion(' +
      id_resident +
      ')" ' +
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
  document.getElementById("state").value = state;
  document.getElementById("attention").value = attention;
  document.getElementById("response").value = response;
  document.getElementById("date_time").value = vfecha();
};

// FUNCTION UPDATE SANCTION
const updateSantion = async (id_resident) => {
  console.log(id_resident);
  const state = document.getElementById("state").value;
  const date_conciliation = document.getElementById("date_time").value;
  const documentPdf = document.getElementById("conciliation_act").value;
  const sanctioned = document.getElementById("sanction").value;
  console.log(sanctioned)
  if (state == "" || date_conciliation == "" || documentPdf == ""  || sanctioned == "") {
    document.getElementById("info").innerHTML =
      "Todos los campos son obligatorio";
    setTimeout("document.getElementById('info').innerHTML  = ''", 3000);
    return;
  }
  try {
    const response = await axios.put(`/api/updateSanction/${id_resident}`, {
      state,
      date_conciliation,
      documentPdf,
      sanctioned,
    });
    if (response.status === 201) {
      console.log("Sancion actualizado");
      const message = response.data.message;
      Swal.fire({
        icon: "success",
        text: message,
      });
    }
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
