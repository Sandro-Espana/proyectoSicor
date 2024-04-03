let formReservasZonasComunes = () => {
    Swal.fire({
      html:
        '<br><br><center><form id="regReserva" name="regReserva" class="formSwal" onsubmit="sendText(event)">' +
        '<h2 class=""><b class="titulo">Formulario de Reservas de Zonas Comunes</b></h2><br>' +
        '<label class="label"><b>Zona Común ID</b></label><br>' +
        '<input type="text" id="zonaComunID" name="zonaComunID" class="input" placeholder="Zona Común ID" autocomplete="off"><br>' +
        '<label class="label"><b>Fecha de Inicio</b></label><br>' +
        '<input type="datetime-local" id="fechaInicio" name="fechaInicio" class="input" placeholder="Fecha de Inicio" autocomplete="off"><br>' +
        '<label class="label"><b>Fecha de Fin</b></label><br>' +
        '<input type="datetime-local" id="fechaFin" name="fechaFin" class="input" placeholder="Fecha de Fin" autocomplete="off"><br>' +
        '<label class="label"><b>Motivo</b></label><br>' +
        '<input type="text" id="motivo" name="motivo" class="input" placeholder="Motivo" autocomplete="off"><br>' +
        '<label class="label"><b>Estado</b></label><br>' +
        '<select id="estado" name="estado" class="input" title="Estado"><option></option><option>Pendiente</option><option>Aprobada</option><option>Cancelada</option></select><br>' +
        '<label class="label"><b>Foto Estado Recepción</b></label><br>' +
        '<input type="text" id="fotoEstadoRecepcion" name="fotoEstadoRecepcion" class="input" placeholder="Foto Estado Recepción" autocomplete="off"><br>' +
        '<label class="label"><b>Foto Estado Entrega</b></label><br>' +
        '<input type="text" id="fotoEstadoEntrega" name="fotoEstadoEntrega" class="input" placeholder="Foto Estado Entrega" autocomplete="off"><br>' +
        '<label class="label"><b>Usuario ID</b></label><br>' +
        '<input type="text" id="usuarioID" name="usuarioID" class="input" placeholder="Usuario ID" autocomplete="off"><br><br>' +
        '<input type="button" id="guardar" name="guardar" class="btn" onclick="guardarReserva()" value="Guardar">&nbsp;&nbsp;&nbsp;&nbsp;' +
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