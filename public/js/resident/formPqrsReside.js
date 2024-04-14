//CREAR LA RUTA PARA QUE LA IMG SE CARGUEN EN UNA CARPETA APARTE

const formPQRS = () => {
  Swal.fire({
    html:
      '<br><br><center><form id="formPQRS" name="formPQRS" class="formSwal" onsubmit="enviarRegistroPQRS(event)">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      '</div>' +
      '<h2 class=""><b id="titregcli" class="titulo">FORMULARIO PQRS</b></h2><br>' +
      '<label class="label"><b>Tipo</b></label><br>' +
      '<select id="tipo" name="tipo" class="input inputMax" title="Tipo">'+
      '<option></option><option>Peticion</option><option>Queja</option>'+
      '<option>Reclamo</option><option>Sugerencia</option></select><br>' +
      '<label class="label"><b>Asunto</b></label><br>' +
      '<input type="text" id="asunto" name="asunto" class="input" placeholder="Asunto" autocomplete="off"><br>' +
      '<label class="label"><b>Descripción</b></label><br>' +
      '<textarea id="descripcion" name="descripcion" class="input inputext" rows="4" placeholder="Descripción"></textarea><br>' +
      '<label class="label"><b>Imagen</b></label><br>' +
      '<input type="text" id="imagen" name="imagen" class="input"><br>' +
      '<label class="label"><b>Fecha de Creación</b></label><br>' +
      '<input type="datetime-local" id="fechaCreacion" name="fechaCreacion" readonly class="input"><br>' +
      '<label class="label"><b>ID de Usuario</b></label><br>' +
      '<input type="text" id="usuarioId" name="usuarioId" class="input" placeholder="FUNTION-ID-LOGIN" autocomplete="off"><br><br>' +
      '<input type="submit" id="guardar" name="guardar" class="btn btnMedio" value="Guardar">&nbsp;&nbsp;&nbsp;&nbsp;' +
      '<h3 id="info" class="titazul">.</h3>' +
      "</div>" +
      "</form></center><br><br>",
    width: "100%",
    background: "rgba(0,0,0,0.0)",
    backdrop: true,
    allowOutsideClick: false,
    showConfirmButton: false,
  });
  document.getElementById("fechaCreacion").value = vfecha();
};

const formGuardado = () => {
  Swal.fire({
    html:
      '<br><br><center><form id="formGuardado" name="formPQRS" class="formSwal">' +
      '<h2 class=""><b id="titregcli" class="titulo">PQRS GUARDADA</b></h2><br>' +
      '<h3 id="info" class="titazul"></h3>' +
      "</form></center><br><br>",
    width: "100%",
    background: "rgba(0,0,0,0.0)",
    backdrop: true,
    allowOutsideClick: false,
    showConfirmButton: false,
  });
};





// Función para enviar el formulario de PQRS al servidor
const enviarRegistroPQRS = async (event) => {
  event.preventDefault(); // Prevenir el envío del formulario de manera predeterminada

  // document.getElementById("info").innerHTML = "Enviando.....";
  const tipo = document.getElementById("tipo").value;
  const asunto = document.getElementById("asunto").value;
  const descripcion = document.getElementById("descripcion").value;
  const imagen = document.getElementById("imagen").value;
  const fechaCreacion = document.getElementById("fechaCreacion").value;
  const usuarioId = document.getElementById("usuarioId").value;
  if (
    tipo == "" ||
    asunto == "" ||
    descripcion == "" ||
    imagen == "" ||
    fechaCreacion == "" ||
    usuarioId == ""
  ) {
    document.getElementById("info").innerHTML =
      "Todos los campos son obligatorio";
    setTimeout("document.getElementById('info').innerHTML  = ''", 4000);
    return;
  }
  //document.getElementById("actualizar").disabled = true;
  document.getElementById("info").innerHTML = "Enviando.....";
  try {
    // Enviar los datos del formulario al servidor usando Axios
    const response = await axios.post("/api/formPQRS", {
      tipo,
      asunto,
      descripcion,
      imagen,
      fechaCreacion,
      usuarioId,
    });
    document.getElementById("info").innerHTML = "Guardado correctamente";
    setTimeout("cerrarSwal()",2000);
    if (response.status === 201) {
      console.log("Registro de PQRS exitoso");
    }
  } catch (error) {
    console.error("Error catch, Error en la solicitud:", error);
  }
};
