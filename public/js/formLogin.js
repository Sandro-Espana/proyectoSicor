let formLogin = () => {
  Swal.fire({
    html:
      '<br><br><center><form id="formLogin" name="formLogin" class="formSwal" ' +
      'onsubmit="enviarContactenos(event)">' +
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
      'value="Iniciar"><br>' +
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

// SEND DATA TO THE SERVER
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
  document.getElementById("info").innerHTML = "Iniciando sesion.....";
  try {
    const response = await window.axios.post("/api/login", {
      username,
      password,
    });
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
    }
  } catch (error) {
    if (error.response) {
      const mensaje = error.response.data.error; // Obtiene el mensaje de error del cuerpo de la respuesta
      // Muestra una alerta en el navegador con el mensaje de error
      Swal.fire({
        icon: "error",
        text: mensaje,
      });
    } else {
      console.error("Error en la solicitud:", error.message); // Muestra un mensaje de error en la consola si no hay una respuesta del servidor
    }
  }
};

/*
Este código contiene función asíncrona (loginSession) para enviar datos de registro
al servidor utilizando Axios. También incluye manejo de errores y actualización
del mensaje de registro en la interfaz de usuario en consecuencia.
*/
