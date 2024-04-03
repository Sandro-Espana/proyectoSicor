const formRegist = () => {
  Swal.fire({
    html:
      '<br><br><center><form id="formPqrsAdmin" name="formPQRS" class="formSwal">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b id="titregcli" class="titulo">REGISTRAR</b></h2><br>' +
      '<button type="button" id="BtnResidente" name="BtnResidente" onClick="formResidente()" class="btn btnMedio">Residente</button>&nbsp;&nbsp;&nbsp;&nbsp;' +
      '<button type="button" id="BtnPropietario" name="BtnPropietario" onClick="listarPQRS(event)" class="btn btnMedio">Propietario</button>&nbsp;&nbsp;&nbsp;&nbsp;' +
      '<h3 id="info" class="titazul"></h3>' +
      "</div>" +
      "</form></center><br><br>",
    width: "100%",
    background: "rgba(0,0,0,0.0)",
    backdrop: true,
    allowOutsideClick: false,
    showConfirmButton: false,
  });
};
function cerrarSwal() {
  Swal.close();
}

let formResidente = () => {
  Swal.fire({
    html:
      '<br><br><center><form id="regResidente" name="regResidente" class="formSwal" onsubmit="enviarResidente(event)">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b id="titregResidente" class="titulo">Formulario de Residente</b></h2><br>' +
      '<label class="label"><b>Nombre Completo</b></label><br>' +
      '<input type="text" id="nombreCompleto" name="nombreCompleto" class="input" placeholder="Nombres" autocomplete="off"><br>' +
      '<label class="label"><b>Apellido</b></label><br>' +
      '<input type="text" id="apellido" name="apellido" class="input" placeholder="Apellidos" autocomplete="off"><br>' +
      '<label class="label"><b>email</b></label><br>' +
      '<input type="text" id="username" name="username" class="input" placeholder="email" autocomplete="off"><br>' +
      '<label class="label"><b>Celular</b></label><br>' +
      '<input type="text" id="numeroContacto" name="numeroContacto" class="input" placeholder="Número de Contacto" autocomplete="off"><br>' +
      '<label class="label"><b>Cédula</b></label><br>' +
      '<input type="text" id="cedula" name="cedula" class="input" placeholder="Cédula" autocomplete="off"><br>' +
      '<label class="label"><b>ID de Propietario</b></label><br>' +
      '<input type="text" id="propietarioID" name="propietarioID" class="input" placeholder="ID de Propietario" autocomplete="off"><br>' +
      '<label class="label"><b>Contraseña</b></label><br>' +
      '<input type="password" id="password" name="password" class="input" placeholder="Contraseña"><br>' +
      '<label class="label"><b>Perfil</b></label><br>' +
      '<input type="text" id="perfil" name="perfil" class="input" placeholder="Perfil" autocomplete="off"><br><br>' +
      '<input type="submit" id="guardar" name="guardar" class="btn" value="Guardar">&nbsp;&nbsp;&nbsp;&nbsp;' +
      //'<input type="button" id="cerrar" name="cerrar" class="btn" onclick="cerrarSwal()" value="Cerrar"><br><br>' +
      '<h3 id="info" class="titazul">.</h3>' +
      "</div>" +
      "</form></center><br><br>",
    width: "100%",
    background: "rgba(0,0,0,0.0)",
    backdrop: true,
    allowOutsideClick: false,
    showConfirmButton: false,
  });
};

function cerrarSwal() {
  Swal.close();
}
