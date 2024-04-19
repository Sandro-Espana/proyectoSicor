//CREAR LA RUTA PARA QUE LA IMG SE CARGUEN EN UNA CARPETA APARTE


// FORM LIST OR REGISTER
const formListOrRegistPqrs = () => {
  Swal.fire({
    html:
      '<br><br><center><form id="formPqrsAdmin" name="formPQRS" class="formSwal">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b id="titregcli" class="titulo">Gestion vehiculo</b></h2><br>' +
      '<button type="button" id="btnRegistPqrs" name="BtnRegistrVehicle" onClick="formRegisterPqrs()" ' +
      'class="btn btnRegis">Registrar</button>&nbsp;&nbsp;&nbsp;&nbsp;' +
      '<button type="button" id="btnlistarPqrs" name="btnlistarPqrs" onClick="listPqrsResident(event)" ' +
      'class="btn btnRegis">Listar</button>&nbsp;&nbsp;&nbsp;&nbsp;' +
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

const formRegisterPqrs = () => {
  Swal.fire({
    html:
      '<br><br><center><form id="formPQRS" name="formPQRS" class="formSwal" '+
      'onsubmit="enviarRegistroPQRS(event)">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b id="titregcli" class="titulo">Registro PQRS</b></h2><br>' +
      '<label class="label"><b>Tipo</b></label><br>' +
      '<select id="type" name="type" class="input inputMax" title="Tipo">' +
      "<option></option><option>Peticion</option><option>Queja</option>" +
      "<option>Reclamo</option><option>Sugerencia</option></select><br>" +
      '<label class="label"><b>Fecha de Creación</b></label><br>' +
      '<input type="datetime-local" id="dateCreation" name="dateCreation" readonly class="input"><br>' +
      '<label class="label"><b>Asunto</b></label><br>' +
      '<input type="text" id="subject" name="subject" class="input" placeholder="Asunto"'+
      'autocomplete="off"><br>' +
      '<label class="label"><b>Descripción</b></label><br>' +
      '<textarea id="description" name="description" class="input inputext" rows="4" '+
      'placeholder="Descripción"></textarea><br>' +
      '<label class="label"><b>Imagen</b></label><br>' +
      '<input type="file" id="image" name="image" class="input" accept="image/*"><br><br>' +
      '<button type="button" id="btnSave" name="btnSave" onClick="listPqrsResident(event)" '+
      'class="btn btnMedio">Guardar</button>&nbsp;&nbsp;&nbsp;&nbsp;' +
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
};


// FUNCTION TO SEND THE PQRS FORM TO THE SERVER
const sendPqrs = async (event) => {
  event.preventDefault();

  const type = document.getElementById("type").value;
  const subject = document.getElementById("subject").value;
  const description = document.getElementById("description").value;
  const image = document.getElementById("image").value;
  const date_creation = document.getElementById("dateCreation").value;
  const id_user = localStorage.getItem("userId");

  if (
    type == "" ||
    subject == "" ||
    description == "" ||
    image == "" ||
    date_creation == "" ||

    id_user == ""
  ) {
    document.getElementById("info").innerHTML =
      "Todos los campos son obligatorio";
    setTimeout("document.getElementById('info').innerHTML  = ''", 4000);
    return;
  }
  //document.getElementById("actualizar").disabled = true;
  document.getElementById("info").innerHTML = "Enviando.....";
  try {
    const response = await axios.post("/api/newPqrs", {
      type,
      subject,
      description,
      image,
      date_creation,

      id_user
    });
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

// FUNCTION LIST VEHICLE
const listPqrsResident = async (event) => {
  event.preventDefault();
  const id_resident = localStorage.getItem("userId");
  document.getElementById("info").innerHTML = "Listando PQRS...";
  try {
    const response = await axios.get(`/api/listPqrsResident/${id_resident}`);
    renderPqrsResident(response);
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

// RENDER JSON
function renderPqrsResident(response) {
  cerrarSwal();
  const data = response.data;
  if (data && data.length > 0) {
    let tableHtml =
      "<table id='tablaPQRS'>" +
      "<thead><tr>" +
      "<th>PQRS</th>" +
      "<th>Tipo</th>" +
      "<th>Asunto</th>" +
      "<th>Descripcion</th>" +
      "<th>Respuesta</th>" +
      
      "</tr></thead><tbody>";
    data.forEach((item) => {
      tableHtml += `<tr>
      <td>${item.id_pqrs}</td>
      <td>${item.type}</td>
      <td>${item.subject}</td>
      <td>${item.description}</td>
      <td>${item.reply}</td>
     
      
     
      
      </td>
      </tr>`;
    });
    tableHtml += "</tbody></table>";

    // RENDER SEARCH BAR IN DESIRED CONTAINER
    document.getElementById("container-table").innerHTML = tableHtml;
    document.getElementById("searchInput").style.display = "block";
  } else {
    document.getElementById("container-table").innerHTML =
      "No hay datos disponibles.";
  }
}