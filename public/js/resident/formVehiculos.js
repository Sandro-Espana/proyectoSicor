const userId = localStorage.getItem("userId");
const idApt = localStorage.getItem("idApt");
console.log(userId, idApt);

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
      '<input type="text" id="tipoVehiculo" name="tipoVehiculo" class="input" ' +
      'placeholder="Tipo de Vehículo" autocomplete="off"><br>' +
      '<label class="label"><b>Marca</b></label><br>' +
      '<input type="text" id="marca" name="marca" class="input" placeholder="Marca"' +
      'autocomplete="off"><br>' +
      '<label class="label"><b>Modelo</b></label><br>' +
      '<input type="text" id="modelo" name="modelo" class="input" placeholder="Modelo"' +
      'autocomplete="off"><br>' +
      '<label class="label"><b>Placa</b></label><br>' +
      '<input type="text" id="placa" name="placa" class="input" placeholder="Placa" ' +
      'autocomplete="off"><br><br>' +
      '<input type="button" id="guardar" name="guardar" class="btn" onclick="storeVehicle()"' +
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

// Función para enviar los datos del formulario de vehículos al backend
const storeVehicle = async () => {
  const tipo_vehiculo = document.getElementById("tipoVehiculo").value;
  const marca = document.getElementById("marca").value;
  const modelo = document.getElementById("modelo").value;
  const placa = document.getElementById("placa").value;

  if (
    tipo_vehiculo == "" ||
    marca == "" ||
    modelo == "" ||
    placa == ""
  ) {
    document.getElementById("info").innerHTML =
      "Todos los campos son obligatorio";
    setTimeout("document.getElementById('info').innerHTML = ''", 3000);
    return;
  }

  // Enviar los datos al backend
  try {
    const response = await axios.post("/api/newVehicle", {
      userId,
      tipo_vehiculo,
      marca,
      modelo,
      placa,
      idApt,
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

// FUNCTION LIST VEHICLE
const listVehicle = async (event, userId) => {
  event.preventDefault();

  document.getElementById("info").innerHTML = "Listando Vehiculos...";
  try {
    const response = await axios.get(`/api/listVehicle/${userId}`); // Agrega el ID del usuario como parte de la URL
    listData(response);
    if (response.status === 201) {
      console.log("Listado de vehículos exitoso");
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
};
