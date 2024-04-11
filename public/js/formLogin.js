// FORM LOGIN
let formLogin = () => {
  Swal.fire({
    html:
      '<br><br><center><form id="formLogin" name="formLogin" class="formSwal" ' +
      //'onsubmit="enviarContactenos(event)">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b id="Ingresar" class="titulo">Ingresar</b></h2><br>' +
      '<label class="label"><b>Email</b></label><br>' +
      '<input type="email" id="email" name="email" class="input" placeholder="Email" ' +
      'autocomplete="off"><br>' +
      '<label class="label"><b>Contraseña</b></label><br>' +
      '<input type="password" id="password" name="password" class="input" placeholder="contraseña" ' +
      'autocomplete="off"><br><br>' +
      '<input type="submit" id="iniciar" name="iniciar" class="btn" onClick="loginSession(event)" ' +
      'value="Iniciar"><br><br> ' +
      '<input type="button" id="recuperar" name="recuperar" class="btn" onClick="(event)" ' +
      'value="Recuperar"><br>' +
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

// FUNCTION SEND DATA TO THE SERVER
const loginSession = async (event) => {
  event.preventDefault();

  const username = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  if (username == "" || password == "") {
    document.getElementById("info").innerHTML =
      "Todos los campos son obligatorio";
    setTimeout("document.getElementById('info').innerHTML = ''", 4000);
    return;
  }
  document.getElementById("info").innerHTML = "Iniciando sesion...";
  try {
    const response = await window.axios.post("/api/login", {
      username,
      password,
    });
    const userId = response.data.idUser;   // SAVE userId AND idApt IN localStorage
    const idApt = response.data.idApt;
    localStorage.setItem("userId", userId);
    localStorage.setItem("idApt", idApt);
    if (response.status === 200) {
      const profile = response.data.profile; // REDIRECTS TO THE PAGE ACCORDING TO YOUR PROFILE
      console.log("perfil de user: ", profile);
      if (profile === "Administrador") {
        window.location.href = "/admin";
      } else if (profile === "Residente") {
        window.location.href = "/residen";
      } else {
        window.location.href = "/";
      }
    }
  } catch (error) {
    if (error.response) {
      const mensaje = error.response.data.error;
      Swal.fire({
        icon: "error",
        text: mensaje,
      });
    } else {
      console.error("Error en la solicitud:", error.message);
    }
  }
};


// CAPTURES THE TIME AND DATE OF THE MOMENT
function vfecha() {
  let fecha = new Date();
  let mes = fecha.getMonth() + 1;
  let dia = fecha.getDate();
  let anio = fecha.getFullYear();
  let horas = fecha.getHours();
  let minutos = fecha.getMinutes();
  let segundos = fecha.getSeconds();

  if (dia < 10) {
    dia = "0" + dia;
  }
  if (mes < 10) {
    mes = "0" + mes;
  }
  if (horas < 10) {
    horas = "0" + horas;
  }
  if (minutos < 10) {
    minutos = "0" + minutos;
  }
  if (segundos < 10) {
    segundos = "0" + segundos;
  }
  let fec =
    anio + "-" + mes + "-" + dia + "T" + horas + ":" + minutos + ":" + segundos;
  return fec;
}


/*
Este código contiene función asíncrona (loginSession) para enviar datos de inicio de sesion
al servidor utilizando Axios. También incluye manejo de errores y actualización
del mensaje de registro en la interfaz de usuario en consecuencia.
*/
