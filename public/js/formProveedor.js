//Formulario proveedor
let formProveedor = () => {
    Swal.fire({
      html:
        '<br><br><center><form id="regprov" name="regprov" class="formSwal" onsubmit="enviarProveedor(event)">' +
        '<h2 class=""><b id="titregprov" class="titulo">Formulario de Proveedor</b></h2><br>' +
        '<label class="label"><b>Nombre del Proveedor</b></label><br>' +
        '<input type="text" id="nombreProveedor" name="nombreProveedor" class="input" placeholder="Nombre del Proveedor" autocomplete="off"><br>' +
        '<label class="label"><b>Tipo de Servicio</b></label><br>' +
        '<select id="tipoServicio" name="tipoServicio" class="input" title="Tipo de Servicio"><option></option><option>Mantenimiento</option><option>Limpieza</option><option>Seguridad</option><option>Otros</option></select><br>' +
        '<label class="label"><b>Descripción del Servicio</b></label><br>' +
        '<textarea id="descripcionServicio" name="descripcionServicio" class="input" rows="4" placeholder="Descripción del Servicio"></textarea><br>' +
        '<label class="label"><b>Nombre de Contacto</b></label><br>' +
        '<input type="text" id="contactoNombre" name="contactoNombre" class="input" placeholder="Nombre de Contacto" autocomplete="off"><br>' +
        '<label class="label"><b>Teléfono de Contacto</b></label><br>' +
        '<input type="text" id="contactoTelefono" name="contactoTelefono" class="input" placeholder="Teléfono de Contacto" autocomplete="off"><br>' +
        '<label class="label"><b>Correo Electrónico</b></label><br>' +
        '<input type="email" id="correoElectronico" name="correoElectronico" class="input" placeholder="Correo Electrónico" autocomplete="off"><br><br>' +
        '<input type="submit" id="guardar" name="guardar" class="btn btnMedio" value="Guardar">&nbsp;&nbsp;&nbsp;&nbsp;' +
        '<input type="button" id="cerrar" name="cerrar" class="btn btnMedio" onclick="cerrarSwal()" value="Cerrar"><br><br>' +
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

  async function enviarProveedor(event) {
    event.preventDefault();

    const formData = new FormData(document.getElementById("regprov"));

    try {
      const response = await axios.post("/guardar-proveedor", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        console.log("Registro de proveedor exitoso");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  }
