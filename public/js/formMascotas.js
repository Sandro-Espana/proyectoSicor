let formMascotas = () => {
    Swal.fire({
      html:
        '<br><br><center><form id="regMascota" name="regMascota" class="formSwal" onsubmit="sendText(event)">' +
        '<h2 class=""><b class="titulo">Formulario de Mascotas</b></h2><br>' +
        '<label class="label"><b>Nombre de la Mascota</b></label><br>' +
        '<input type="text" id="nombreMascota" name="nombreMascota" class="input" placeholder="Nombre de la Mascota" autocomplete="off"><br>' +
        '<label class="label"><b>Tipo de Mascota</b></label><br>' +
        '<input type="text" id="tipoMascota" name="tipoMascota" class="input" placeholder="Tipo de Mascota" autocomplete="off"><br>' +
        '<label class="label"><b>Unidad Residencial ID</b></label><br>' +
        '<input type="text" id="unidadResidencialID" name="unidadResidencialID" class="input" placeholder="Unidad Residencial ID" autocomplete="off"><br><br>' +
        '<input type="button" id="guardar" name="guardar" class="btn" onclick="guardarMascota()" value="Guardar">&nbsp;&nbsp;&nbsp;&nbsp;' +
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
