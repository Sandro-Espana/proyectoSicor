//Formulario encuestas preguntas
let formEncuestasPreguntas = () => {
  Swal.fire({
    html: `<br><br><center><form id="formularioEncuestasPreguntas" class="formSwal">
          <h2>Encuesta</h2>
          <label class="label"><b>Título de la Encuesta</b></label><br>
          <input type="text" id="titulo" name="titulo" class="input" required><br><br>

          <label class="label"><b>Fecha de Inicio</b></label><br>
          <input type="date" id="fechaInicio" name="fechaInicio" class="input" required><br><br>

          <label class="label"><b>Fecha de Fin</b></label><br>
          <input type="date" id="fechaFin" name="fechaFin" class="input" required><br><br>

          <label class="label"><b>Estado</b></label><br>
          <select id="estado" name="estado" class="input" required>
              <option value="Activa">Activa</option>
              <option value="Inactiva">Inactiva</option>
          </select><br><br>

          <hr>
          <h2>Preguntas</h2>

          <label class="label"><b>Texto de la Pregunta</b></label><br>
          <input type="text" id="textoPregunta" name="textoPregunta" class="input" required><br><br>

          <!-- Agrega más campos para las preguntas aquí si es necesario -->

          <input type="button" id="guardar" name="guardar" class="btn" onclick="enviarFormulario()" value="Guardar">&nbsp;&nbsp;&nbsp;&nbsp;
          <input type="button" id="cerrar" name="cerrar" class="btn" onclick="cerrarSwal()" value="Cerrar"><br><br>
          <h3 id="info" class="titazul">.</h3>
          </form></center><br><br>`,
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

function enviarFormulario() {
  // Obtener los datos del formulario
  const titulo = document.getElementById("titulo").value;
  const fechaInicio = document.getElementById("fechaInicio").value;
  const fechaFin = document.getElementById("fechaFin").value;
  const estado = document.getElementById("estado").value;
  const textoPregunta = document.getElementById("textoPregunta").value;

  Swal.fire({
    icon: "success",
    title: "¡Encuesta y Preguntas Enviadas!",
    text: "¡Gracias por tu participación!",
  });
}
