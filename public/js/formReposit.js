 //Formulario Repositorio Documental
 let formRepositorio = () => {
    Swal.fire({
      html:
        '<br><br><center><form id="regDocumento" name="regDocumento" class="formSwal" onsubmit="sendText(event)">' +
        '<h2 class=""><b class="titulo">Formulario de Repositorio</b></h2><br>' +
        '<label class="label"><b>Nombre</b></label><br>' +
        '<input type="text" id="nombre" name="nombre" class="input" placeholder="Nombre" autocomplete="off"><br>' +
        '<label class="label"><b>Ruta</b></label><br>' +
        '<input type="text" id="ruta" name="ruta" class="input" placeholder="Ruta" autocomplete="off"><br>' +
        '<label class="label"><b>Fecha de Subida</b></label><br>' +
        '<input type="datetime-local" id="fechaSubida" name="fechaSubida" class="input" placeholder="Fecha de Subida" autocomplete="off"><br>' +
        '<label class="label"><b>Propietario ID</b></label><br>' +
        '<input type="text" id="propietarioID" name="propietarioID" class="input" placeholder="Propietario ID" autocomplete="off"><br>' +
        '<label class="label"><b>Proveedor ID</b></label><br>' +
        '<input type="text" id="proveedorID" name="proveedorID" class="input" placeholder="Proveedor ID" autocomplete="off"><br><br>' +
        '<input type="button" id="guardar" name="guardar" class="btn" onclick="guardarDocumento()" value="Guardar">&nbsp;&nbsp;&nbsp;&nbsp;' +
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