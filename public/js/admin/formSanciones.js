//Formulario Sanciones
let formSanciones = () => {
    Swal.fire({
      html:
        '<br><br><center><form id="regSancion" name="regSancion" class="formSwal" onsubmit="sendText(event)">' +
        '<h2 class=""><b class="titulo">Formulario de Sanciones</b></h2><br>' +
        '<label class="label"><b>Residente ID</b></label><br>' +
        '<input type="text" id="residenteID" name="residenteID" class="input" placeholder="Residente ID" autocomplete="off"><br>' +
        '<label class="label"><b>Fecha y Hora de Sanción</b></label><br>' +
        '<input type="datetime-local" id="fechaHoraSancion" name="fechaHoraSancion" class="input" placeholder="Fecha y Hora de Sanción" autocomplete="off"><br>' +
        '<label class="label"><b>Descripción</b></label><br>' +
        '<input type="text" id="descripcion" name="descripcion" class="input" placeholder="Descripción" autocomplete="off"><br>' +
        '<label class="label"><b>Estado</b></label><br>' +
        '<input type="text" id="estado" name="estado" class="input" placeholder="Estado" autocomplete="off"><br>' +
        '<label class="label"><b>Respuesta del Residente</b></label><br>' +
        '<input type="text" id="respuestaResidente" name="respuestaResidente" class="input" placeholder="Respuesta del Residente" autocomplete="off"><br>' +
        '<label class="label"><b>Foto de Evidencia</b></label><br>' +
        '<input type="file" id="fotoEvidencia" name="fotoEvidencia" class="input" accept="image/*"><br><br>' +
        '<input type="button" id="guardar" name="guardar" class="btn" onclick="guardarSancion()" value="Guardar">&nbsp;&nbsp;&nbsp;&nbsp;' +
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