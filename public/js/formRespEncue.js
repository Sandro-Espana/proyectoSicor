let formRespuestasEncuestas = () => {
    Swal.fire({
      html:
        '<br><br><center><form id="regRespuesta" name="regRespuesta" class="formSwal" onsubmit="sendText(event)">' +
        '<h2 class=""><b class="titulo">Formulario de Respuestas a Encuestas</b></h2><br>' +
        '<label class="label"><b>Pregunta ID</b></label><br>' +
        '<input type="text" id="preguntaID" name="preguntaID" class="input" placeholder="Pregunta ID" autocomplete="off"><br>' +
        '<label class="label"><b>Texto de Respuesta</b></label><br>' +
        '<input type="text" id="textoRespuesta" name="textoRespuesta" class="input" placeholder="Texto de Respuesta" autocomplete="off"><br>' +
        '<label class="label"><b>Usuario ID</b></label><br>' +
        '<input type="text" id="usuarioID" name="usuarioID" class="input" placeholder="Usuario ID" autocomplete="off"><br><br>' +
        '<input type="button" id="guardar" name="guardar" class="btn" onclick="guardarRespuestaEncuesta()" value="Guardar">&nbsp;&nbsp;&nbsp;&nbsp;' +
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