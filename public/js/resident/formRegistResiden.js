//FORM OPTION RESIDENT PROPRIETARY
const formRegist = () => {
  Swal.fire({
    html:
      '<br><br><center><form id="formPqrsAdmin" name="formPQRS" class="formSwal">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b id="titregcli" class="titulo">REGISTRAR</b></h2><br>' +
      '<button type="button" id="BtnResidente" name="BtnResidente" onClick="formResidente()" ' +
      'class="btn btnRegis">Residente</button>&nbsp;&nbsp;&nbsp;&nbsp;' +
      '<button type="button" id="BtnPropietario" name="BtnPropietario" onClick="listarPQRS(event)" ' +
      'class="btn btnRegis">Propietario</button>&nbsp;&nbsp;&nbsp;&nbsp;' +
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

//FORM REGISTER RESIDENT
let formResidente = () => {
  Swal.fire({
    html:
      '<br><br><center><form id="regResidente" name="regResidente" class="formSwal" onsubmit="enviarResidente(event)">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b id="titregResidente" class="titulo">Formulario de Residente</b></h2><br>' +
      '<label class="label"><b>Cédula</b></label><br>' +
      '<input type="text" id="cedula" name="cedula" class="input" placeholder="Cédula" autocomplete="off"><br>' +
      '<label class="label"><b>Nombres</b></label><br>' +
      '<input type="text" id="nombres" name="nombres" class="input" placeholder="Nombres" autocomplete="off"><br>' +
      '<label class="label"><b>Apellidos</b></label><br>' +
      '<input type="text" id="apellido" name="apellido" class="input" placeholder="Apellidos" autocomplete="off"><br>' +
      '<label class="label"><b>Email</b></label><br>' +
      '<input type="text" id="email" name="email" class="input" placeholder="email" autocomplete="off"><br>' +
      '<label class="label"><b>Celular</b></label><br>' +
      '<input type="text" id="celular" name="celular" class="input" placeholder="Número de Contacto" autocomplete="off"><br>' +
      '<label class="label"><b>Contraseña</b></label><br>' +
      '<input type="password" id="password" name="password" class="input" placeholder="Contraseña"><br>' +
      '<label class="label"><b>ID Residencia</b></label><br>' +
      '<input type="text" id="IDResidencia" name="ID Residencia" class="input" placeholder="ID Residencia" autocomplete="off"><br>' +
      " <br>" +
      '<input type="submit" id="guardar" name="guardar" class="btn" onclick="RegistResiden(event)" value="Guardar">&nbsp;&nbsp;&nbsp;&nbsp;' +
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

// FUNCTION SEND RESIDENT REGISTRATION
const RegistResiden = async (event) => {
  event.preventDefault();

  const cedula = document.getElementById("cedula").value;
  const namer = document.getElementById("nombres").value;
  const lastname = document.getElementById("apellido").value;
  const usernamer = document.getElementById("email").value;
  const mobile = document.getElementById("celular").value;
  const passwordr = document.getElementById("password").value;
  const unidad_residencial = document.getElementById("IDResidencia").value;
  if (
    cedula == "" ||
    namer == "" ||
    lastname == "" ||
    usernamer == "" ||
    mobile == "" ||
    passwordr == "" ||
    unidad_residencial == ""
  ) {
    document.getElementById("info").innerHTML =
      "Todos los campos son obligatorio";
    setTimeout("document.getElementById('info').innerHTML = ''", 3000);
    return;
  }
  document.getElementById("info").innerHTML = "Enviando...";
  try {
    const response = await axios.post("/api/register", {
      cedula,
      namer,
      lastname,
      usernamer,
      mobile,
      passwordr,
      unidad_residencial,
    });
    if (response.status === 201) {
      console.log("Registro de PQRS exitoso");
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

/*
This file containes the resident registration form and the function to send the data to the server.
*/
