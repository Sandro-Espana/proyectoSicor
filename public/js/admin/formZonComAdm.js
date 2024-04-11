// FORM LIST OR REGIST
const formZonComun = () => {
  Swal.fire({
    html:
      '<br><br><center><form id="formPqrsAdmin" name="formPQRS" class="formSwal">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b id="titregcli" class="titulo">Gestionar zonas comunes</b></h2><br>' +
      '<button type="button" id="btnformProvi" name="btnformProvi" onClick="formCommon(event)"' +
      'class="btn ">Registrar</button>&nbsp;&nbsp;&nbsp;&nbsp;' +
      '<button type="button" id="btnListar" name="listarBtn" onClick="listZone(event)"' +
      'class="btn btnMedio">Listar</button>&nbsp;&nbsp;&nbsp;&nbsp;' +
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

// Formulario Zonas comunes
let formCommon = () => {
  Swal.fire({
    html:
      '<br><br><center><form id="regZonaComun" name="regZonaComun" class="formSwal"'+
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b class="titulo">Registro de Zonas Comunes</b></h2><br>' +
      '<label class="label"><b>Nombre</b></label><br>' +
      '<input type="text" id="nombre" name="nombre" class="input" placeholder="Nombre"'+
      'autocomplete="off"><br>' +
      '<label class="label"><b>Descripción</b></label><br>' +
      '<textarea id="descripcion" name="descripcion" class="input inputext" placeholder="Descripción">'+
      '</textarea><br><br>' +
      '<label class="label"><b>Foto de Evidencia</b></label><br>' +
      '<input type="file" id="fotoEvidencia" name="fotoEvidencia" class="input" accept="image/*"><br><br>' +
      '<input type="button" id="guardar" name="guardar" class="btn" onclick="sendCommonAre()"'+
      'value="Guardar">&nbsp;&nbsp;&nbsp;&nbsp;' +
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

// FUNCTION FOR SENDING SUPPLIER FORM DATA
const sendCommonAre = async () => {
  //event.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const descripcion = document.getElementById("descripcion").value;
  const imagen = document.getElementById("fotoEvidencia").value;
  if (
    nombre == "" ||
    imagen == "" ||
    descripcion == ""
  ) {
    document.getElementById("info").innerHTML =
      "Todos los campos son obligatorio";
    setTimeout("document.getElementById('info').innerHTML  = ''", 3000);
    return;
  }
  try {
    const response = await axios.post("/api/newCommon", {
      nombre,
      imagen,
      descripcion
    });
    if (response.status === 201) {
      const message = response.data.message;
      console.log(message);
      Swal.fire({
        icon: "success",
        text: message,
      });
    }
  } catch (error) {
    if (error.response) {
      const message = error.response.data.error;
      console.log("mensaje: ", message);
      Swal.fire({
        icon: "error",
        text: message,
      });
    } else {
      console.error("Error en la solicitud:", error);
    }
  }
};


// FUNCTION LIST COMMON ZONE
const listZone = async (event) => {
  event.preventDefault();
  document.getElementById("info").innerHTML = "Listando zonas comunes...";
  try {
    const response = await axios.get("/api/listSupplier");
    renderProvid(response);
    if (response.status === 201) {
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
};

