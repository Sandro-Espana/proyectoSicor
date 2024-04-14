// FORM LIST OR REGISTER
const formListOrRegist = () => {
  Swal.fire({
    html:
      '<br><br><center><form id="formPqrsAdmin" name="formPQRS" class="formSwal">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b id="titregcli" class="titulo">Gestion vehiculo</b></h2><br>' +
      '<button type="button" id="BtnRegistVehicle" name="BtnRegistrVehicle" onClick="formVehiculos()" ' +
      'class="btn btnRegis">Registrar</button>&nbsp;&nbsp;&nbsp;&nbsp;' +
      '<button type="button" id="btnlistarVehicle" name="btnlistarVehicle" onClick="listVehicle(event)" ' +
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

// FORM REGISTER VEHICLE
let formVehiculos = () => {
  Swal.fire({
    html:
      '<br><br><center><form id="regVehiculo" name="regVehiculo" class="formSwal"' +
      'onsubmit="sendText(event)">' +
      '<br><br><center><form id="formPqrsAdmin" name="formPQRS" class="formSwal">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b class="titulo">Formulario de registro</b></h2><br>' +
      '<label class="label"><b>Tipo de Vehículo</b></label><br>' +
      '<select id="typeVehicle" name="typeVehicle" class="input inputMax" title="typeVehicle">'+
      '<option></option><option>Camioneta</option><option>Automivil</option>'+
      '<option>Motocicleta</option><option>Motocarro</option></select><br>' +
      '<label class="label"><b>Parqueadero</b></label><br>' +
      '<input type="text" id="parking" name="parking" class="input" ' +
      'placeholder="Numero de parqueadero" autocomplete="off"><br>' +
      '<label class="label"><b>Marca</b></label><br>' +
      '<input type="text" id="brand" name="brand" class="input" placeholder="Marca"' +
      'autocomplete="off"><br>' +
      '<label class="label"><b>Modelo</b></label><br>' +
      '<input type="text" id="model" name="model" class="input" placeholder="Modelo"' +
      'autocomplete="off"><br>' +
      '<label class="label"><b>Placa</b></label><br>' +
      '<input type="text" id="plate" name="plate" class="input" placeholder="Placa" ' +
      'autocomplete="off"><br><br>' +
      '<input type="button" id="save" name="save" class="btn" onclick="storeVehicle()"' +
      'value="Guardar">' +
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

// FUNCTION TO SENN VEHICLE FORM DATA TO BACKEND
const storeVehicle = async () => {

  const id_resident = localStorage.getItem("userId");
  const type_vehicle = document.getElementById("typeVehicle").value;
  const brand = document.getElementById("brand").value;
  const model = document.getElementById("model").value;
  const plateInput = document.getElementById("plate").value;
  const plate = convertMayuscules(plateInput)
  const id_apartament = localStorage.getItem("idApt");
  const parkingValid = document.getElementById("parking").value;
  const parking = cleanNumbers(parkingValid)

  if (type_vehicle == "" || brand == "" || model == "" || plate == "") {
    document.getElementById("info").innerHTML =
      "Todos los campos son obligatorio";
    setTimeout("document.getElementById('info').innerHTML = ''", 3000);
    return;
  }

  if (parking == "") {
    console.log("parking ", parking)
    document.getElementById("info").innerHTML =
      "Ingrese solo numeros al campo de parqueadero";
    setTimeout("document.getElementById('info').innerHTML = ''", 4000);
    return;
  }

  try {
    const response = await axios.post("/api/newVehicle", {
      id_resident,
      type_vehicle,
      brand,
      model,
      plate,
      id_apartament,
      parking
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
const listVehicle = async (event) => {
  event.preventDefault();
  const id_apartament = localStorage.getItem("idApt");
  document.getElementById("info").innerHTML = "Listando Vehiculos...";
  try {
    const response = await axios.get(`/api/listVehicle/${id_apartament}`);
    renderVehicle(response);
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
function renderVehicle(response) {
  cerrarSwal();
  const data = response.data;
  if (data && data.length > 0) {
    let tableHtml =
      "<table id='tablaPQRS'>" +
      "<thead><tr>" +
      "<th>Residente</th>" +
      "<th>Tipo vehiculo</th>" +
      "<th>Marca</th>" +
      "<th>Marca</th>" +
      "<th>Modelo</th>" +
      "<th>Placa</th>" +
      "<th>Apartamento</th>" +
      "</tr></thead><tbody>";
    data.forEach((item) => {
      tableHtml += `<tr>
      <td>${item.id_resident}</td>
      <td>${item.type_vehicle}</td>
      <td>${item.brand}</td>
      <td>${item.model}</td>
      <td>${item.plate}</td>
      <td>${item.id_apartament}</td>
      <td><button
      type='button'
      class=''
      onclick='formDeletVehi(${item.id_vehicle})'
      >Eliminar
      </button>
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

//FORM DELETE CONFIRM
const formDeletVehi = (dele) => {
  //let dele = dele
  console.log("dele",dele)
  Swal.fire({
    html:
      '<br><br><center><form id="formPqrsAdmin" name="formPQRS" class="formSwal">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b id="titregcli" class="titulo">¿Eliminar vehiculo?</b></h2><br>' +
      '<input type="button" id="deleVehi" name="codi" class="btn btninfo" readonly><br><br>' +
      '<button type="button" id="eliminarBtn" name="eliminarBtn" onClick="deletVehicle(event, '+dele+')"'+
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
  document.getElementById("deleVehi").value = dele;
  console.log("f",dele);
};

//FUNCTION DELETE
const deletVehicle = async (event, id_vehicle) => {
  event.preventDefault();

  //const codigo = document.getElementById("deleVehi").value;
  //console.log("LINEA 264 deletVehicle: ", codigo);
  document.getElementById("info").innerHTML = "Eliminando...";
  try {
    const response = await axios.delete(`/api/deleteVehicle/${id_vehicle}`);
    if (response.status === 201) {
      console.log("Vehiculo eliminado");
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

/*
THIS FILE CONTAINS THE FORM TO REGISTER A NEW VEHICLE AND SEND THE DATA TO THE SERVER. ALSO THE FUNCTION
TO LIST ALL THE VEHICLES BY APARTMENT ID AND RENDERIZA THEM IN A HTML TABLE WITH SEARCH BAR AND HAS THE
OPTION TO DELETE
*/