// ADENAS DE LA ZONA COMUN NECESITA SILAS O MESAS

let formReserveCommonArea = () => {
  Swal.fire({
    html:
      '<br><br><center><form id="reserveCommonArea" name="reserveCommonArea" class="formSwal" ' +
      '<br><br><center><form id="formUser" name="formUser=" class="formSwal">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b class="titulo">Reservar zona comun</b></h2><br>' +
      '<label class="label"><b>Zona común</b></label><br>' +
      '<select id="commonArea" name="commonArea" class="input inputMax" title="commonArea"><option>' +
      '</option><option>BBQ</option><option>GYM</option><option>Cancha</option>'+
      '<option>Salon social</option></select><br>' +
      '<label class="label"><b>Motivo</b></label><br>' +
      '<input type="text" id="motivo" name="motivo" class="input" placeholder="Motivo" ' +
      'autocomplete="off"><br>' +
      '<label class="label"><b>Mesas</b></label><br>' +
      '<input type="text" id="usuarioID" name="usuarioID" class="input" ' +
      'placeholder="¿Cuantas sillas necesita?" autocomplete="off"><br><br>' +
      '<label class="label"><b>Sillas</b></label><br>' +
      '<input type="text" id="usuarioID" name="usuarioID" class="input" ' +
      'placeholder="¿Cuantas mesas necesita?" autocomplete="off"><br><br>' +
      '<input type="button" id="guardar" name="guardar" class="btn" onclick="sendUpdateReservation()" ' +
      'value="Guardar">&nbsp;&nbsp;&nbsp;&nbsp;' +
      '<h3 id="info" class="titazul">.</h3>' +
      "</form></center><br><br>",
    width: "100%",
    background: "rgba(0,0,0,0.0)",
    backdrop: true,
    allowOutsideClick: false,
    showConfirmButton: false,
  });
};

// FUNCTION TO SEND THE RESERVATION DATA TO THE SERVER
const sendUpdateReservation = async (event) => {
  event.preventDefault();

  const state = document.getElementById("state").value;
  const id_pqrs = document.getElementById("idPqrs").value;
  const reply = document.getElementById("response").value;

  if (state == "" || reply == "") {
    document.getElementById("info").innerHTML =
      "Los campos estado y respuesta son obligatorio";
    setTimeout("document.getElementById('info').innerHTML = ''", 4000);
    return;
  }
  document.getElementById("updatePqrs").disabled = true;
  document.getElementById("info").innerHTML = "Enviando.....";
  try {
    const response = await axios.put(`/api/updatePqrs/${id_pqrs}`, {
      state,
      reply,
    });
    if (response.status === 201) {
      Swal.fire({
        icon: "success",
        text: message,
      });
    }
  } catch (error) {
    if (error.response) {
      const message = error.response.data.error;
      Swal.fire({
        icon: "error",
        text: message,
      });
    } else {
      console.error("Error en la solicitud:", error.message);
    }
  }
};
