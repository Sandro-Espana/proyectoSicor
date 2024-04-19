// FORM REGISTER RESIDENT
let formRegistResident = () => {
  Swal.fire({
    html:
      '<br><br><center><form id="regResidente" name="regResidente" class="formSwal" ' +
      'onsubmit="enviarResidente(event)">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b id="titregResidente" class="titulo">Registro de Residente</b></h2><br>' +
      '<label class="label"><b>Cédula</b></label><br>' +
      '<input type="text" id="cedula" name="cedula" class="input" placeholder="Cédula del residente" ' +
      'autocomplete="off"><br>' +
      '<label class="label"><b>Nombres</b></label><br>' +
      '<input type="text" id="name" name="name" class="input" placeholder="Nombres del residente" ' +
      'autocomplete="off"><br>' +
      '<label class="label"><b>Apellidos</b></label><br>' +
      '<input type="text" id="lastname" name="lastname" class="input" placeholder="Apellidos del residente"' +
      'autocomplete="off"><br>' +
      '<label class="label"><b>Email</b></label><br>' +
      '<input type="email" id="email" name="email" class="input" placeholder="Email"' +
      'autocomplete="off"><br>' +
      '<label class="label"><b>Celular</b></label><br>' +
      '<input type="text" id="mobile" name="mobile" class="input" placeholder="Número de Contacto"' +
      'autocomplete="off"><br>' +
      '<label class="label"><b>Contraseña</b></label><br>' +
      '<input type="password" id="password" name="password" class="input" placeholder="Contraseña"><br>' +
<<<<<<< HEAD
      '<label class="label"><b>ID Residencia</b></label><br>' +
      '<input type="text" id="IDResidencia" name="ID Residencia" class="input" placeholder="ID Residencia" autocomplete="off"><br>' +
      " <br>" +
      '<input type="submit" id="guardar" name="guardar" class="btn" onclick="RegistResiden(event)" value="Guardar">&nbsp;&nbsp;&nbsp;&nbsp;' +
=======
      '<label class="label"><b>Unidad residencial</b></label><br>' +
      '<input type="text" id="idApt" name="idApt" class="input"' +
      'placeholder="torre_apartamento" autocomplete="off"><br><br>' +
      "</div>" +
      '<input type="submit" id="guardar" name="guardar" class="btn" onclick="RegistResiden(event)"' +
      'value="Guardar">&nbsp;&nbsp;&nbsp;&nbsp;' +
>>>>>>> desarrollo
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

  const id_user = document.getElementById("cedula").value;
  const id_resident = cleanNumbers(id_user);
  const id_apt = document.getElementById("idApt").value;
  const id_apartament = cleanNumbers(id_apt);
  const name = document.getElementById("name").value;
  const lastname = document.getElementById("lastname").value;
  const username = document.getElementById("email").value;
  const mobil = document.getElementById("mobile").value;
  const mobile = cleanNumbers(mobil);
  const password = document.getElementById("password").value;

  if (id_resident == "" || mobile == "" || id_apartament == "") {
    document.getElementById("info").innerHTML =
      "La cedula, celular y unidad residencial son solo numeros";
    setTimeout("document.getElementById('info').innerHTML = ''", 4000);
    return;
  }

  if (!validateEmail(username)) {
    document.getElementById("info").innerHTML =
      "Formato de correo electronico invalido";
    setTimeout("document.getElementById('info').innerHTML = ''", 4000);
    return;
  }

  if (name == "" || lastname == "" || username == "" || password == "") {
    document.getElementById("info").innerHTML =
      "Todos los campos son obligatorio";
    setTimeout("document.getElementById('info').innerHTML = ''", 3000);
    return;
  }

  document.getElementById("info").innerHTML = "Enviando...";
  try {
    const response = await axios.post("/api/newResident", {
      id_resident,
      id_apartament,
      name,
      lastname,
      username,
      mobile,
<<<<<<< HEAD
      passwordr,
      unidad_residencial,
    });
    if (response.status === 201) {
      console.log("Registro de PQRS exitoso");
      const mensaje = response.data;
      Swal.fire({
        icon: "success",
        text: mensaje,
=======
      password,
    });
    if (response.status === 201) {
      const message = response.data.message;
      Swal.fire({
        icon: "success",
        text: message,
>>>>>>> desarrollo
      });
    }
  } catch (error) {
    if (error.response) {
<<<<<<< HEAD
      const mensaje = error.response.data.error;
      console.log("mensaje: ", mensaje);
=======
      const message = error.response.data.error;
      console.log("mensaje: ", message);
>>>>>>> desarrollo
      Swal.fire({
        icon: "error",
        text: message,
      });
    } else {
      console.error("Error en la solicitud:", error);
    }
  }
};

/*
This file containes the resident registration form and the function to send the data to the server.
*/
