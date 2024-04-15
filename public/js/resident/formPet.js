// FORM LIST OR REGISTER
const formListOrPet = () => {
  Swal.fire({
    html:
      '<br><br><center><form id="formPqrsAdmin" name="formPQRS" class="formSwal">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b id="titregcli" class="titulo">Gestion mascotas</b></h2><br>' +
      '<button type="button" id="BtnRegistPet" name="BtnRegistPet" onClick="formPet()" ' +
      'class="btn btnRegis">Registrar</button>&nbsp;&nbsp;&nbsp;&nbsp;' +
      '<button type="button" id="btnlistarVehicle" name="btnlistarVehicle" onClick="listPet(event)" ' +
      'class="btn btnRegis">Listar</button>&nbsp;&nbsp;&nbsp;&nbsp;' +
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

// FORM REGIST PET
let formPet = () => {
  Swal.fire({
    html:
      '<br><br><center><form id="regMascota" name="regMascota" class="formSwal" '+
      'onsubmit="sendText(event)">' +
      '<br><br><center><form id="formPqrsAdmin" name="formPQRS" class="formSwal">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b class="titulo">Registrar mascota</b></h2><br>' +
      '<label class="label"><b>Especie de la mascota</b></label><br>' +
      '<select id="petSpecies" name="petSpecies" class="input inputMax" title="petSpecies">'+
      '<option></option><option>Ave</option><option>Felino</option>'+
      '<option>Canino</option></select><br>' +
      '<label class="label"><b>Nombre de la Mascota</b></label><br>' +
      '<input type="text" id="petName" name="petName" class="input" '+
      'placeholder="Nombre de la Mascota" autocomplete="off"><br>' +
      '<label class="label"><b>Raza de la mascota</b></label><br>' +
      '<input type="text" id="petBreed" name="petBreed" class="input" '+
      'placeholder="Raza: Labrador, Doberman" autocomplete="off"><br>' +
      '<label class="label"><b>Foto de Evidencia</b></label><br>' +
      '<input type="file" id="image" name="image" class="input" '+
      'accept="image/*"><br><br>' +
      '<input type="button" id="guardar" name="guardar" class="btn" onclick="keepPet()"'+
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

// FUNCTION THAT CAPTURES DATA FROM THE FORM AND SENDS IT TO THE SERVER
const keepPet = async () => {

  const id_apt = localStorage.getItem("idApt");
  const petName = document.getElementById("petName").value;
  const petBreed = document.getElementById("petBreed").value;
  const image = document.getElementById("image").value;
  const petSpecies = document.getElementById("petSpecies").value;

  if (
    id_apt === "" ||
    image === "" ||
    petName === "" ||
    petBreed === "" ||
    petSpecies === ""
  ) {
    document.getElementById("info").innerHTML =
      "Todos los campos son obligatorios";
    setTimeout(() => {
      document.getElementById("info").innerHTML = "";
    }, 3000);
    return;
  }
  try {
    const response = await axios.post("/api/newPet", {
      id_apt,
      petName,
      petBreed,
      petSpecies,
      image
    });
    if (response.status === 201) {
      const message = response.data.message;
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
      console.error("Error en la solicitud:", error.message);
    }
  }
};


// FUNCTION LIST VEHICLE
const listPet = async (event) => {
  event.preventDefault();

  const id_apt = localStorage.getItem("idApt");
  document.getElementById("info").innerHTML = "Listando mascotas...";
  try {
    const response = await axios.get(`/api/listPets/${id_apt}`);
    renderPet(response);
  } catch (error) {
    if (error.response) {
      const mensaje = error.response.data.error;
      console.log("mensaje: ", mensaje);
      Swal.fire({
        icon: "error",
        text: mensaje,
      });
    } else {
      console.error("Error en la solicitud:", error.message);
    }
  }
};

// RENDER JSON
function renderPet(response) {
  cerrarSwal();
  const data = response.data;
  if (data && data.length > 0) {
    let tableHtml =
      "<table id='tablaPQRS'>" +
      "<thead><tr>" +
      "<th>Apartamento</th>" +
      "<th>Nombre</th>" +
      "<th>Especie</th>" +
      "<th>Raza</th>" +
      "<th>Foto</th>" +
      "<th>Eliminar</th>" +
      "</tr></thead><tbody>";
    data.forEach((item) => {
      tableHtml += `<tr>
      <td>${item.id_apt}</td>
      <td>${item.petName}</td>
      <td>${item.petSpecies}</td>
      <td>${item.petBreed}</td>
      <td>${item.image}</td>
      <td><button
      type='button'
      class=''
      onclick='formDeletPet(${item.id_pet}, "${item.petName}")'
      >Eliminar
      </button>
      </td>
      </tr>`;
    });
    tableHtml += "</tbody></table>";

    document.getElementById("container-table").innerHTML = tableHtml;
    document.getElementById("searchInput").style.display = "block";
  } else {
    document.getElementById("container-table").innerHTML =
      "No hay datos disponibles.";
  }
}

// FORM DELETE CONFIRM
const formDeletPet = (id_pet, petName) => {
  Swal.fire({
    html:
      '<br><br><center><form id="formPqrsAdmin" name="formPQRS" class="formSwal">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b id="titregcli" class="titulo">¿Eliminar Mascota?</b></h2><br>' +
      '<input type="button" id="deletPet" name="codi" class="btn btninfo" readonly><br><br>' +
      '<button type="button" id="btnDelePet" name="btnDelePet"'+
      'onClick="deletIdPet(event, '+id_pet+', \''+petName+'\')"'+
      'class="btn btnMedio">Eliminar ' +
      '<h3 id="info" class="titazul"></h3>' +
      "</div>" +
      "</form></center><br><br>",
    width: "100%",
    background: "rgba(0,0,0,0.0)",
    backdrop: true,
    allowOutsideClick: false,
    showConfirmButton: false,
  });
  document.getElementById("deletPet").value = petName;
};

//FUNCTION DELETE
const deletIdPet = async (event, id_pet, petName) => {
  event.preventDefault();
  
  document.getElementById("info").innerHTML = "Eliminando...";
  try {
    const response = await axios.delete(`/api/deletePet/${id_pet}`,{
      data: { petName: petName }
    });
    if (response.status === 201) {
      const message = response.data.message;
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
        text: mensaje,
      });
    } else {
      console.error("Error en la solicitud:", error.message);
    }
  }
};