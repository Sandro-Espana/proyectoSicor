let formVehiculos = () => {
    Swal.fire({
      html:
        '<br><br><center><form id="regVehiculo" name="regVehiculo" class="formSwal" onsubmit="sendText(event)">' +
        '<h2 class=""><b class="titulo">Formulario de Vehículos</b></h2><br>' +
        '<label class="label"><b>Propietario ID</b></label><br>' +
        '<input type="text" id="propietarioID" name="propietarioID" class="input" placeholder="Propietario ID" autocomplete="off"><br>' +
        '<label class="label"><b>Tipo de Vehículo</b></label><br>' +
        '<input type="text" id="tipoVehiculo" name="tipoVehiculo" class="input" placeholder="Tipo de Vehículo" autocomplete="off"><br>' +
        '<label class="label"><b>Marca</b></label><br>' +
        '<input type="text" id="marca" name="marca" class="input" placeholder="Marca" autocomplete="off"><br>' +
        '<label class="label"><b>Modelo</b></label><br>' +
        '<input type="text" id="modelo" name="modelo" class="input" placeholder="Modelo" autocomplete="off"><br>' +
        '<label class="label"><b>Placa</b></label><br>' +
        '<input type="text" id="placa" name="placa" class="input" placeholder="Placa" autocomplete="off"><br>' +
        '<label class="label"><b>Unidad Residencial ID</b></label><br>' +
        '<input type="text" id="unidadResidencialID" name="unidadResidencialID" class="input" placeholder="Unidad Residencial ID" autocomplete="off"><br><br>' +
        '<input type="button" id="guardar" name="guardar" class="btn" onclick="guardarVehiculo()" value="Guardar">&nbsp;&nbsp;&nbsp;&nbsp;' +
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