let formCuentaDemo = () => {
  Swal.fire({
    html:
      '<br><br><center><form id="regCuentaDemo" name="regCuentaDemo" class="formSwal" onsubmit="enviarCuentaDemo(event)">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      '</div>' +
      '<h2 class=""><b id="titregCuentaDemo" class="titulo">Formulario de Cuenta Demo</b></h2><br>' +
      '<label class="label"><b>Email</b></label><br>' +
      '<input type="text" id="Email" name="Email" class="input" placeholder="Usuario" autocomplete="off"><br>' +
      '<label class="label"><b>Contraseña</b></label><br>' +
      '<input type="password" id="contraseña" name="contraseña" class="input" placeholder="Contraseña" autocomplete="off"><br>' +
      '<label class="label"><b>Celular</b></label><br>' +
      '<input type="text" id="celular" name="celular" class="input" placeholder="Celular" autocomplete="off"><br>' +
      '<label class="label"><b>País</b></label><br>' +
      '<input type="text" id="pais" name="pais" class="input" placeholder="País" autocomplete="off"><br><br>' +
      '<input type="submit" id="guardar" name="guardar" class="btn" value="Guardar">&nbsp;&nbsp;&nbsp;&nbsp;' +
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
function cerrarSwal() {
  swal.close();
}

async function enviarCuentaDemo(event) {
  event.preventDefault();

  const formData = new FormData(document.getElementById("regCuentaDemo"));

  try {
    const response = await axios.post("/guardar-cuenta-demo", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 201) {
      console.log("Cuenta demo guardada exitosamente");
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
}
