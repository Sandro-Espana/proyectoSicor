// Función para mostrar el formulario de PQRS usando SweetAlert2
//vALIDAR FECHA DE CREACION
//CREAR LA RUTA PARA QUE LA IMG SE CARGUEN EN UNA CARPETA APARTE

const formPQRS = () => {
  Swal.fire({
    html:
      '<br><br><center><form id="formPQRS" name="formPQRS" class="formSwal" onsubmit="enviarRegistroPQRS(event)">' +
      '<h2 class=""><b id="titregcli" class="titulo">FORMULARIO PQRS</b></h2><br>' +
      '<label class="label"><b>Tipo</b></label><br>' +
      '<select id="tipo" name="tipo" class="input inputMax" title="Tipo"><option></option><option>Peticion</option><option>Queja</option><option>Reclamo</option><option>Sugerencia</option></select><br>' +
      '<label class="label"><b>Asunto</b></label><br>' +
      '<input type="text" id="asunto" name="asunto" class="input" placeholder="Asunto" autocomplete="off"><br>' +
      '<label class="label"><b>Descripción</b></label><br>' +
      '<textarea id="descripcion" name="descripcion" class="input inputext" rows="4" placeholder="Descripción"></textarea><br>' +
      '<label class="label"><b>Imagen</b></label><br>' +
      '<input type="text" id="imagen" name="imagen" class="input"><br>' +
      //ESTA CAMPO DEBE SER UNA CONSULTA DE LISTAR '<label class="label"><b>Respuesta</b></label><br>' +
      //ESTA CAMPO DEBE SER UNA CONSULTA DE LISTAR '<textarea id="respuesta" name="respuesta" class="input inputext" rows="4" placeholder="Respuesta"></textarea><br>' +
      '<label class="label"><b>Fecha de Creación</b></label><br>' +
      '<input type="datetime-local" id="fechaCreacion" name="fechaCreacion" readonly class="input"><br>' +
      //ESTA CAMPO DEBE SER UNA CONSULTA DE LISTAR '<label class="label"><b>Estado</b></label><br>' +
      //ESTA CAMPO DEBE SER UNA CONSULTA DE LISTAR '<select id="estado" name="estado" class="input" title="Estado"><option></option><option>Pendiente</option><option>En Proceso</option><option>Resuelto</option></select><br>' +
      '<label class="label"><b>ID de Usuario</b></label><br>' +
      '<input type="text" id="usuarioId" name="usuarioId" class="input" placeholder="FUNTION-ID-LOGIN" autocomplete="off"><br><br>' +
      '<input type="submit" id="guardar" name="guardar" class="btn btnMedio" value="Guardar">&nbsp;&nbsp;&nbsp;&nbsp;' +
      '<input type="button" id="cerrar" name="cerrar" class="btn btnMedio" onclick="cerrarSwal()" value="Cerrar"><br><br>' +
      '<input type="button" id="cerrar" name="cerrar" class="btn btnMedio" onclick="clearForm()" value="clear"><br><br>' +
      '<h3 id="info" class="titazul">.</h3>' +
      "</form></center><br><br>",
    width: "100%",
    background: "rgba(0,0,0,0.0)",
    backdrop: true,
    allowOutsideClick: false,
    showConfirmButton: false,
  });
  // Agregar un event listener al formulario para capturar el evento de envío
  //document.getElementById("formPQRS").addEventListener("submit", enviarRegistroPQRS);
  document.getElementById("fechaCreacion").value = vfecha();
};

// Función para cerrar el SweetAlert
function cerrarSwal() {
  Swal.close();
}

//CAPTURA LA HORA Y FECHA DEL MOMENTO
function vfecha() {
  let fecha = new Date(); // Fecha actual
  let mes = fecha.getMonth() + 1; // Obteniendo mes
  let dia = fecha.getDate(); // Obteniendo dia
  let anio = fecha.getFullYear(); // Obteniendo año
  let horas = fecha.getHours(); // Obteniendo horas
  let minutos = fecha.getMinutes(); // Obteniendo minutos
  let segundos = fecha.getSeconds(); // Obteniendo segundos

  if (dia < 10) {
    dia = "0" + dia; // Agrega cero si el menor de 10
  }
  if (mes < 10) {
    mes = "0" + mes; // Agrega cero si el menor de 10
  }
  if (horas < 10) {
    horas = "0" + horas; // Agrega cero si el menor de 10
  }
  if (minutos < 10) {
    minutos = "0" + minutos; // Agrega cero si el menor de 10
  }
  if (segundos < 10) {
    segundos = "0" + segundos; // Agrega cero si el menor de 10
  }

  // Formatea la cadena de fecha
  let fec =
    anio + "-" + mes + "-" + dia + "T" + horas + ":" + minutos + ":" + segundos;
  return fec;
}

//FUNCION LIMPIAR FORMULARIO
function clearForm() {
  document.getElementById("formPQRS").reset();
  document.getElementById("fechaCreacion").value = vfecha();
}

// Función para enviar el formulario de PQRS al servidor
const enviarRegistroPQRS = async (event) => {
  event.preventDefault(); // Prevenir el envío del formulario de manera predeterminada

  document.getElementById("info").innerHTML = "Enviando.....";
  const tipo = document.getElementById("tipo").value;
  const asunto = document.getElementById("asunto").value;
  const descripcion = document.getElementById("descripcion").value;
  const imagen = document.getElementById("imagen").value;
  const fechaCreacion = document.getElementById("fechaCreacion").value;
  const usuarioId = document.getElementById("usuarioId").value;

  try {
    // Enviar los datos del formulario al servidor usando Axios
    const response = await axios.post("/api/formPQRS", {
      tipo,
      asunto,
      descripcion,
      imagen,
      fechaCreacion,
      usuarioId
    });

    // Verificar si la respuesta del servidor es exitosa
    if (response.status === 201) {
      console.log("Registro de PQRS exitoso"); // Imprimir un mensaje en la consola
      // Aquí podrías realizar otras acciones, como redireccionar a otra página
    }
  } catch (error) {
    console.error("Soy catch, Error en la solicitud:", error); // Capturar y mostrar errores en la consola

  }
};