//Formulario tarea
let formTarea = () => {
    Swal.fire({
      html:
        '<br><br><center><form id="regTarea" name="regTarea" class="formSwal" onsubmit="enviarTarea(event)">' +
        '<h2 class=""><b id="titregTarea" class="titulo">Formulario de Tarea</b></h2><br>' +
        '<label class="label"><b>Título</b></label><br>' +
        '<input type="text" id="titulo" name="titulo" class="input" placeholder="Título" autocomplete="off"><br>' +
        '<label class="label"><b>Descripción</b></label><br>' +
        '<textarea id="descripcion" name="descripcion" class="input" rows="4" placeholder="Descripción"></textarea><br>' +
        '<label class="label"><b>Estado</b></label><br>' +
        '<select id="estado" name="estado" class="input"><option></option><option>Pendiente</option><option>En Proceso</option><option>Realizada</option></select><br>' +
        '<label class="label"><b>Fecha de Creación</b></label><br>' +
        '<input type="datetime-local" id="fechaCreacion" name="fechaCreacion" class="input"><br>' +
        '<label class="label"><b>Fecha Límite</b></label><br>' +
        '<input type="datetime-local" id="fechaLimite" name="fechaLimite" class="input"><br>' +
        '<label class="label"><b>Responsable</b></label><br>' +
        '<input type="text" id="responsable" name="responsable" class="input" placeholder="Responsable" autocomplete="off"><br><br>' +
        '<input type="submit" id="guardar" name="guardar" class="btn" value="Guardar">&nbsp;&nbsp;&nbsp;&nbsp;' +
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

  async function enviarTarea(event) {
    event.preventDefault();

    const formData = new FormData(document.getElementById("regTarea"));

    try {
      const response = await axios.post("/guardar-tarea", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        console.log("Tarea guardada exitosamente");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  }