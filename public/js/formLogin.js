<<<<<<< HEAD
// FUNCTION FORM LOGIN
=======
// LOGIN FORM
>>>>>>> desarrollo
let formLogin = () => {
  Swal.fire({
    html:
      '<br><br><center><form id="formLogin" name="formLogin" class="formSwal" ' +
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
  console.log(username, password);
  if (username == "" || password == "") {
    document.getElementById("info").innerHTML =
      "Todos los campos son obligatorio";
    setTimeout("document.getElementById('info').innerHTML = ''", 3000);
    return;
  }
  document.getElementById("info").innerHTML = "Iniciando sesion...";
  try {
    const response = await window.axios.post("/api/login", {
      username,
      password,
    });
<<<<<<< HEAD
    const { profile, userId } = response.data; // Capturar el ID del usuario desde la respuesta
    console.log("id de usuario: ",profile, userId);
    if (response.status === 200) {
      const profile = response.data.profile; // Redirige a la página correspondiente según su perfil
      console.log("perfil de user: ", profile);
      if (profile === "Administrador") {
        window.location.href = "/admin";
      } else if (profile === "Residente") {
        window.location.href = "/residen";
      } else {
        window.location.href = "/";
      }
=======

     // SAVE userId AND idApt IN localStorage
    const idUser = response.data.idUser;
    const idApt = response.data.idApt;
    localStorage.setItem("userId", idUser);
    localStorage.setItem("idApt", idApt);

    // REDIRECTS TO THE PAGE ACCORDING TO YOUR PROFILE
    const profile = response.data.profile;
    if (profile === "administrador") {
      window.location.href = "/admin";
    } else if (profile === "residente") {
      window.location.href = "/residen";
    } else {
      window.location.href = "/";
>>>>>>> desarrollo
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


// FUNCTION CAPTURES THE TIME AND DATE OF THE MOMENT
function vfecha() {
  let fecha = new Date(); // Fecha actual
  let mes = fecha.getMonth() + 1; // Obteniendo mes
  let dia = fecha.getDate(); // Obteniendo dia
  let anio = fecha.getFullYear(); // Obteniendo año
  let horas = fecha.getHours(); // Obteniendo horas
  let minutos = fecha.getMinutes(); // Obteniendo minutos
  let segundos = fecha.getSeconds(); // Obteniendo segundos

  if (dia < 10) {
    dia = "0" + dia; // Agrega cero si el menor de 10
  }
  if (mes < 10) {
    mes = "0" + mes; // Agrega cero si el menor de 10
  }
  if (horas < 10) {
    horas = "0" + horas; // Agrega cero si el menor de 10
  }
  if (minutos < 10) {
    minutos = "0" + minutos; // Agrega cero si el menor de 10
  }
  if (segundos < 10) {
    segundos = "0" + segundos; // Agrega cero si el menor de 10
  }

  // FORMAT THE DATA STRING
  let fec =
    anio + "-" + mes + "-" + dia + "T" + horas + ":" + minutos + ":" + segundos;
  return fec;
}

// CLOSE FORM
function cerrarSwal() {
  Swal.close();
}



/*
<<<<<<< HEAD
This code contains asynchronous funtion loginSession to send login data to the server using Axion.
To the server using Axion. It also includes function to close the form and capture the data and
time of the error handling moment and update the log message in the of the log message in the
user interface accordingly.
=======
This code contains asynchronous function (loginSession) to send login data to the server using Axios.
It also includes error handling and updating of the log message in the user interface accordingly.
>>>>>>> desarrollo
*/
