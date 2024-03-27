//Formulario Zonas comunes
let formZonasComunes = () => {
    Swal.fire({
      html:
        '<br><br><center><form id="regZonaComun" name="regZonaComun" class="formSwal" onsubmit="sendText(event)">' +
        '<h2 class=""><b class="titulo">Formulario de Zonas Comunes</b></h2><br>' +
        '<label class="label"><b>Nombre</b></label><br>' +
        '<input type="text" id="nombre" name="nombre" class="input" placeholder="Nombre" autocomplete="off"><br>' +
        '<label class="label"><b>Descripción</b></label><br>' +
        '<textarea id="descripcion" name="descripcion" class="input" placeholder="Descripción"></textarea><br><br>' +
        '<input type="button" id="guardar" name="guardar" class="btn" onclick="guardarZonaComun()" value="Guardar">&nbsp;&nbsp;&nbsp;&nbsp;' +
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

  function cerrarSwal() {
    swal.close();
  }
