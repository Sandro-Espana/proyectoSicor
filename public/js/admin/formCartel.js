// TENER UN CAMPO PARA SELECCIONAR POR TORRES EL ENVIO DE LA NOVEDAD

//Formulario Cartelera
let formCartelera = () => {
    Swal.fire({
      html:
        '<br><br><center><form id="regAviso" name="regAviso" class="formSwal" onsubmit="enviarAviso(event)">' +
        '<h2 class=""><b id="titregAviso" class="titulo">Formulario de Aviso</b></h2><br>' +
        '<label class="label"><b>Título</b></label><br>' +
        '<input type="text" id="titulo" name="titulo" class="input" placeholder="Título" autocomplete="off"><br>' +
        '<label class="label"><b>Contenido</b></label><br>' +
        '<textarea id="contenido" name="contenido" class="input" rows="4" placeholder="Contenido"></textarea><br>' +
        '<label class="label"><b>Fecha de Publicación</b></label><br>' +
        '<input type="datetime-local" id="fechaPublicacion" name="fechaPublicacion" class="input"><br>' +
        '<label class="label"><b>Residente Destino ID</b></label><br>' +
        '<input type="number" id="residenteDestinoID" name="residenteDestinoID" class="input" placeholder="Residente Destino ID" autocomplete="off"><br>' +
        '<label class="label"><b>Residente ID</b></label><br>' +
        '<input type="number" id="residenteID" name="residenteID" class="input" placeholder="Residente ID" autocomplete="off"><br>' +
        '<label class="label"><b>Propietario ID</b></label><br>' +
        '<input type="number" id="propietarioID" name="propietarioID" class="input" placeholder="Propietario ID" autocomplete="off"><br><br>' +
        '<input type="submit" id="guardar" name="guardar" class="btn" value="Guardar">&nbsp;&nbsp;&nbsp;&nbsp;' +
        '<input type="button" id="cerrar" name="cerrar" class="btn" onclick="cerrarSwal()" value="Cerrar"><br><br>' +
        '<h3 id="info" class="titazul">.</h3>' +
        "</form></center><br><br>",
      width: "100%",
      background: "rgba(0,0,0,0.0)",
      backdrop: true,
      allowOutsideClick: false,
      showConfirmButton: false,
    });
  };
//hola comkjsdkjkjdfkjdfkjfdkl
  function cerrarSwal() {
    swal.close();
  }

  async function enviarAviso(event) {
    event.preventDefault();

    const formData = new FormData(document.getElementById("regAviso"));

    try {
      const response = await axios.post("/guardar-aviso", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        console.log("Aviso guardado exitosamente");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  }