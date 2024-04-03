let formLogin = () => {
  Swal.fire({
    html:
      '<br><br><center><form id="formLogin" name="formLogin" class="formSwal" onsubmit="enviarContactenos(event)">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b id="Ingresar" class="titulo">Ingresar</b></h2><br>' +
      '<label class="label"><b>Email</b></label><br>' +
      '<input type="email" id="email" name="email" class="input" placeholder="Email" autocomplete="off"><br>' +
      '<label class="label"><b>Contraseña</b></label><br>' +
      '<input type="password" id="password" name="password" class="input" placeholder="contraseña" autocomplete="off"><br>' +
      '<input type="submit" id="iniciar" name="iniciar" class="btn" onClick="iniciarSesion(event)" value="Iniciar"><br><br>' +
      "</div>" +
      '<h3 id="info" class="titazul">.</h3>' +
      "</form></center><br><br>",
    width: "100%",
    background: "rgba(0,0,0,0.0)",
    backdrop: true,
    allowOutsideClick: false,
    showConfirmButton: false,
  });
};
function cerrarSwal() {
  swal.close();
}

//ENVIAR DATOS AL SERVER
const iniciarSesion = async (event) => {
  event.preventDefault();

  const username = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Obtiene la instancia de axios desde el entorno de ejecución del navegador
  //const axios = window.axios;
  try {
    const response = await window.axios.post("/api/login", {
      username,
      password,
    });
    if (response.status === 200) {
      // Redirige al usuario a la página correspondiente según su perfil
      const profile = response.data.profile;
      console.log("perfil de user: ", profile);
      if (profile === "admin") {
        window.location.href = "/admin";
      } else if (profile === "residente") {
        window.location.href = "/residen";
      } else {
        window.location.href = "/";
      }
    }
  } catch (error) {
    if (error.response) {
      const mensaje = error.response.data.error; // Obtiene el mensaje de error del cuerpo de la respuesta
      // Muestra una alerta en el navegador con el mensaje de error
      alert(mensaje);
    } else {
      console.error("Error en la solicitud:", error.message); // Muestra un mensaje de error en la consola si no hay una respuesta del servidor
      // Maneja otros tipos de errores si es necesario
    }
  }
};

/*
   Este código contiene funciones para manejar la apertura y cierre de un modal,
   así como una función asíncrona (enviarRegistro) para enviar datos de registro
   al servidor utilizando Axios. También incluye manejo de errores y actualización
   del mensaje de registro en la interfaz de usuario en consecuencia.
   */
