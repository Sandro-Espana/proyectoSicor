// FORM LISTAR USER
const formListRegister = () => {
  Swal.fire({
    html:
      '<br><br><center><form id="formUser" name="formUser=" class="formSwal">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b id="titregcli" class="titulo">Gestionar propietarios</b></h2><br>' +
      '<button type="button" id="btnRegisterProprie" name="btnRegisterProprie"' +
      'onClick="formRegisterProprietor(event)"' +
      'class="btn ">Regitrar</button>&nbsp;&nbsp;&nbsp;&nbsp;' +
      '<button type="button" id="BtnlistProprie" name="BtnlistProprie" onClick="(event)"' +
      'class="btn ">Listar</button>&nbsp;&nbsp;&nbsp;&nbsp;<br><br>' +
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
// EN PROPIETARIOS PONER  UN NUMERO PORCENTUAL
const formRegisterProprietor = () => {
  Swal.fire({
    html:
      '<br><br><center><form id="regResidente" name="regResidente" class="formSwal" ' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b id="titregResidente" class="titulo">Registro de Propietario</b></h2><br>' +
      '<label class="label"><b>Cédula</b></label><br>' +
      '<input type="text" id="id_owner" name="id_owner" class="input" placeholder="Cédula del propietario" ' +
      'autocomplete="off"><br>' +
      '<label class="label"><b>Nombres</b></label><br>' +
      '<input type="text" id="name" name="name" class="input" placeholder="Nombres del propietario" ' +
      'autocomplete="off"><br>' +
      '<label class="label"><b>Apellidos</b></label><br>' +
      '<input type="text" id="surname" name="surname" class="input" ' +
      'placeholder="Apellidos del propietario"' +
      'autocomplete="off"><br>' +
      '<label class="label"><b>Email</b></label><br>' +
      '<input type="email" id="email" name="email" class="input" placeholder="Email"' +
      'autocomplete="off"><br>' +
      '<label class="label"><b>Celular</b></label><br>' +
      '<input type="text" id="mobile" name="mobile" class="input" placeholder="Número de Contacto"' +
      'autocomplete="off"><br>' +
      '<label class="label"><b>Unidad residencial</b></label><br>' +
      '<input type="text" id="idApt" name="idApt" class="input"' +
      'placeholder="torre apartamento" autocomplete="off"><br><br>' +
      '<label class="label"><b>Coeficiente de copropiedad</b></label><br>' +
      '<input type="text" id="coefficient" name="coefficient" class="input"' +
      'placeholder="Coeficiente de copropiedad" autocomplete="off"><br><br>' +
      "</div>" +
      '<input type="submit" id="guardar" name="guardar" class="btn" onclick="sendProprietor(event)"' +
      'value="Guardar">&nbsp;&nbsp;&nbsp;&nbsp;' +
      '<h3 id="info" class="titazul">.</h3>' +
      "</form></center><br><br>",
    width: "100%",
    background: "rgba(0,0,0,0.0)",
    backdrop: true,
    allowOutsideClick: false,
    showConfirmButton: false,
  });
};

// FUNCTION TO SEND THE PROPRIETOR FORM TO THE SERVER
const sendProprietor = async (event) => {
  event.preventDefault();

  const id_owner = document.getElementById("id_owner").value;
  const name = document.getElementById("name").value;
  const surname = document.getElementById("surname").value;
  const email = document.getElementById("email").value;
  const mobile = document.getElementById("mobile").value;
  const id_apt = document.getElementById("idApt").value;
  const coefficient = document.getElementById("coefficient").value;

  if (
    id_owner == "" ||
    name == "" ||
    surname == "" ||
    email == "" ||
    mobile == "" ||
    coefficient == "" ||
    id_apt == ""
  ) {
    document.getElementById("info").innerHTML =
      "Todos los campos son obligatorio";
    setTimeout("document.getElementById('info').innerHTML  = ''", 4000);
    return;
  }
  //document.getElementById("actualizar").disabled = true;
  document.getElementById("info").innerHTML = "Enviando...";
  try {
    const response = await axios.post("/api/newProprietor", {
        id_owner,
        name,
        surname,
        email,
        mobile,
        coefficient,
        id_apt,
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
