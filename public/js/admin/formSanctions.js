// FORM LIST PQRS
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
      onclick='formUpdateSanc(${item.PQRSID})'
      >modificar
      </button>
      </td>
      </tr>`;
    });
    tableHtml += "</tbody></table>";

    // RENDER THE TABLE IN THE CONTAINER
    document.getElementById("container-table").innerHTML = tableHtml;
    document.getElementById("searchInput").style.display = "block";
  } else {
    // Mostrar un mensaje si no hay datos
    document.getElementById("container-table").innerHTML =
      "No hay datos disponibles.";
  }
}

// FORM SANCTION
let formUpdateSanc = (id, apt) => {
  console.log("formSancione ", id, apt);
  Swal.fire({
    html:
      '<br><br><center><form id="regSancion" name="regSancion" class="formSwal" onsubmit="sendText(event)">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b class="titulo">Responder sancion</b></h2><br>' +
      '<label class="label"><b>Estado</b></label><br>' +
      '<select id="estado" name="tipo" class="input inputMax" title="Tipo">' +
      "<option></option><option>Activa</option>" +
      "<option>Revocada</option><option>Apelación</option></select><br>" +
      '<label class="label"><b>Apartamento</b></label><br>' +
      '<input type="text" id="IdApt" name="IdApt" class="input" readonly ' +
      'autocomplete="off"><br>' +
      '<label class="label"><b>Residente</b></label><br>' +
      '<input type="text" id="residente" name="residenteID" class="input" readonly ' +
      'autocomplete="off"><br>' +
      '<label class="label"><b>Fecha y hora</b></label><br>' +
      '<input type="datetime-local" id="fechaCreacion" name="fechaCreacion" readonly class="input"><br>' +
      '<label class="label"><b>Descripción</b></label><br>' +
      '<input type="text" id="descripcion" name="descripcion" class="input" placeholder="Descripción" ' +
      'autocomplete="off"><br>' +
      '<label class="label"><b>Foto de Evidencia</b></label><br>' +
      '<input type="file" id="fotoEvidencia" name="fotoEvidencia" class="input" accept="image/*"><br><br>' +
      '<input type="button" id="guardar" name="guardar" class="btn" onClick="saveSanction(event)" ' +
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
  document.getElementById("estado").value = id;
  document.getElementById("IdApt").value = apt;
  document.getElementById("residente").value = id;
  document.getElementById("fechaCreacion").value = id;
  document.getElementById("descripcion").value = id;
  document.getElementById("fotoEvidencia").value = id;
};
