let formContactenos = () => {
    Swal.fire({
      html:
        '<br><br><center><form id="regContactenos" name="regContactenos" class="formSwal" onsubmit="enviarContactenos(event)">' +
        '<div class="formulario-container">' +
        '<div class="cerrarX-container">' +
        '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
        '</div>' +
        '<h2 class=""><b id="titregContactenos" class="titulo">Contáctenos</b></h2><br>' +
        '<label class="label"><b>Nombre</b></label><br>' +
        '<input type="text" id="nombre" name="nombre" class="input" placeholder="Nombre" autocomplete="off"><br>' +
        '<label class="label"><b>Celular</b></label><br>' +
        '<input type="text" id="celular" name="celular" class="input" placeholder="Celular" autocomplete="off"><br>' +
        '<label class="label"><b>Correo Electrónico</b></label><br>' +
        '<input type="email" id="correo" name="correo" class="input" placeholder="Correo Electrónico" autocomplete="off"><br>' +
        '<label class="label"><b>Mensaje</b></label><br>' +
        '<textarea id="mensaje" name="mensaje" class="input" rows="4" placeholder="Mensaje"></textarea><br><br>' +
        '<input type="submit" id="enviar" name="enviar" class="btn" value="Enviar">&nbsp;&nbsp;&nbsp;&nbsp;' +
        '<h3 id="info" class="titazul">.</h3>' +
        '</div>' +
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
  async function enviarContactenos(event) {
    event.preventDefault();
  
    const formData = new FormData(document.getElementById("regContactenos"));
  
    try {
      const response = await axios.post("/enviar-mensaje", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      if (response.status === 201) {
        console.log("Mensaje enviado exitosamente");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  }
  