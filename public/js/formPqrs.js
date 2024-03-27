// Función para mostrar el formulario de PQRS usando SweetAlert2

const formPQRS = () => {
  Swal.fire({
    html:
      '<br><br><center><form id="formPQRS" name="formPQRS" class="formSwal" onsubmit="enviarRegistroPQRS(event)">' +
      '<h2 class=""><b id="titregcli" class="titulo">Formulario de PQRS</b></h2><br>' +
      '<label class="label"><b>Tipo</b></label><br>' +
      '<select id="tipo" name="tipo" class="input inputMax" title="Tipo"><option></option><option>Peticion</option><option>Queja</option><option>Reclamo</option></select><br>' +
      '<label class="label"><b>Asunto</b></label><br>' +
      '<input type="text" id="asunto" name="asunto" class="input" placeholder="Asunto" autocomplete="off"><br>' +
      '<label class="label"><b>Descripción</b></label><br>' +
      '<textarea id="descripcion" name="descripcion" class="input " rows="4" placeholder="Descripción"></textarea><br>' +
      '<label class="label"><b>Imagen</b></label><br>' +
      '<input type="file" id="imagen" name="imagen" class="input"><br>' +
      '<label class="label"><b>Respuesta</b></label><br>' +
      '<textarea id="respuesta" name="respuesta" class="input" rows="4" placeholder="Respuesta"></textarea><br>' +
      '<label class="label"><b>Fecha de Creación</b></label><br>' +
      '<input type="date" id="fechaCreacion" name="fechaCreacion" class="input"><br>' +
      '<label class="label"><b>Estado</b></label><br>' +
      '<select id="estado" name="estado" class="input" title="Estado"><option></option><option>Pendiente</option><option>En Proceso</option><option>Resuelto</option></select><br>' +
      '<label class="label"><b>ID de Usuario</b></label><br>' +
      '<input type="text" id="usuarioId" name="usuarioId" class="input" placeholder="ID de Usuario" autocomplete="off"><br><br>' +
      '<input type="submit" id="guardar" name="guardar" class="btn btnMedio" value="Guardar">&nbsp;&nbsp;&nbsp;&nbsp;' +
      '<input type="button" id="cerrar" name="cerrar" class="btn btnMedio" onclick="cerrarSwal()" value="Cerrar"><br><br>' +
      '<h3 id="info" class="titazul">.</h3>' +
      '</form></center><br><br>',
    width: "100%",
    background: "rgba(0,0,0,0.0)",
    backdrop: true,
    allowOutsideClick: false,
    showConfirmButton: false,
  });
};

// Función para cerrar el SweetAlert
function cerrarSwal() {
  Swal.close();
}

// Función para enviar el formulario de PQRS al servidor
const enviarRegistroPQRS = async (event) => {
  event.preventDefault(); // Prevenir el envío del formulario de manera predeterminada
  
  // Obtener referencia al formulario PQRS por su ID
  const formularioPQRS = document.getElementById('formPQRS');
  
  // Crear un objeto FormData para el formulario
  const formData = new FormData(formularioPQRS);

  try {
    // Enviar los datos del formulario al servidor usando Axios
    const response = await axios.post('/registro', formData, {
      headers: {
        'Content-Type': 'multipart/form-data' // Establecer el tipo de contenido
      }
    });

    // Verificar si la respuesta del servidor es exitosa
    if (response.status === 201) {
      console.log('Registro de PQRS exitoso'); // Imprimir un mensaje en la consola
      // Aquí podrías realizar otras acciones, como redireccionar a otra página
    }
  } catch (error) {
    console.error('Error en la solicitud:', error); // Capturar y mostrar errores en la consola

// Agregar un event listener al formulario para capturar el evento de envío
document.getElementById('formPQRS').addEventListener('submit', enviarRegistroPQRS);
  }
}
