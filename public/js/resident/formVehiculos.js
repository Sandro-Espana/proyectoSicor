//FORM OPTION LIST REGISTER
const formRegistVehicle = () => {
  Swal.fire({
    html:
      '<br><br><center><form id="formPqrsAdmin" name="formPQRS" class="formSwal">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b id="titregcli" class="titulo">Gestion vehiculos</b></h2><br>' +
      '<button type="button" id="BtnVehicle" name="BtnResidente" onClick="formVehiculos()" ' +
      'class="btn btnRegis">Registar</button>&nbsp;&nbsp;&nbsp;&nbsp;' +
      '<button type="button" id="BtnListVehicle" name="BtnPropietario" onClick="listVehicle(event)" ' +
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
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b class="titulo">Formulario de Vehículos</b></h2><br>' +
      '<label class="label"><b>Unidad Residencial ID</b></label><br>' +
      '<input type="text" id="unidadResidencialID" name="unidadResidencialID" class="input"' +
      'placeholder="Unidad Residencial ID" autocomplete="off"><br><br>' +
      '<label class="label"><b>Propietario ID</b></label><br>' +
      '<input type="text" id="propietarioID" name="propietarioID" class="input"' +
      'placeholder="Propietario ID" autocomplete="off"><br>' +
      '<label class="label"><b>Tipo de Vehículo</b></label><br>' +
      '<input type="text" id="tipoVehiculo" name="tipoVehiculo" class="input"' +
      'placeholder="Tipo de Vehículo" autocomplete="off"><br>' +
      '<label class="label"><b>Marca</b></label><br>' +
      '<input type="text" id="marca" name="marca" class="input" placeholder="Marca" ' +
      'autocomplete="off"><br>' +
      '<label class="label"><b>Modelo</b></label><br>' +
      '<input type="text" id="modelo" name="modelo" class="input" placeholder="Modelo" ' +
      'autocomplete="off"><br>' +
      '<label class="label"><b>Placa</b></label><br>' +
      '<input type="text" id="placa" name="placa" class="input" placeholder="Placa" ' +
      'autocomplete="off"><br>' +
      '<label class="label"><b>Foto de Evidencia</b></label><br>' +
      '<input type="file" id="fotoEvidencia" name="fotoEvidencia" class="input" accept="image/*"><br><br>' +
      '<input type="button" id="guardar" name="guardar" class="btn" onclick="storeVehicle()" ' +
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
};

// FUNCTION REGISTER VEHICLE
const storeVehicle = async () => {
  const propietarioID = document.getElementById("propietarioID").value;
  const tipoVehiculo = document.getElementById("tipoVehiculo").value;
  const marca = document.getElementById("marca").value;
  const modelo = document.getElementById("modelo").value;
  const placa = document.getElementById("placa").value;
  const unidadResidencialID = document.getElementById(
    "unidadResidencialID"
  ).value;

  if (
    propietarioID == "" ||
    tipoVehiculo == "" ||
    marca == "" ||
    modelo == "" ||
    placa == "" ||
    unidadResidencialID == ""
  ) {
    document.getElementById("info").innerHTML =
      "Todos los campos son obligatorio";
    setTimeout("document.getElementById('info').innerHTML = ''", 3000);
    return;
  }
  try {
    const response = await axios.post("/api/newVehicle", {
      propietarioID,
      tipoVehiculo,
      marca,
      modelo,
      placa,
      unidadResidencialID,
    });
    if (response.status === 201) {
      console.log("Vehiculo registro con exito");
      const mensaje = response.data;
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
const listVehicle = async (event) => {
  event.preventDefault();
  
  document.getElementById("info").innerHTML = "Listando Vehiculos...";
  try {
    const response = await axios.get("/api/listVehicle");
    listData(response);
    if (response.status === 201) {
      console.log("Listado de PQRS exitoso");
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
};


// storeVehicle Función para enviar los datos del formulario de vehículos al backend
