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
      '<h2 class=""><b class="titulo">Registrar m ascota</b></h2><br>' +
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

// SAVE PET
const keepPet = async () => {
  const nombreMascota = document.getElementById("petName").value;
  const tipoMascota = document.getElementById("petSpecies").value;
  const foto = document.getElementById("image").value;
  const raza = document.getElementById("petBreed").value;
  if (
    nombreMascota === "" ||
    tipoMascota === "" ||
    foto === ""
  ) {
    document.getElementById("info").innerHTML =
      "Todos los campos son obligatorios";
    setTimeout(() => {
      document.getElementById("info").innerHTML = "";
    }, 3000);
    return;
  }
  const idApt = localStorage.getItem("idApt");
  try {
    const response = await axios.post("/api/newPet", {
      idApt: idApt,
      nombreMascota: nombreMascota,
      tipoMascota: tipoMascota,
      foto: foto,
    });
    if (response.status === 201) {
      console.log("Registro de mascota exitoso");
      const mensaje = response.data.mensaje;
      Swal.fire({
        icon: "success",
        text: mensaje,
      });
    }
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


// FUNCTION LIST VEHICLE
const listPet = async (event) => {
  event.preventDefault();

  const IdApt = localStorage.getItem("idApt");
  console.log("idApt", IdApt);
  document.getElementById("info").innerHTML = "Listando mascotas...";
  try {
    const response = await axios.get(`/api/listPets/${IdApt}`);
    console.log(response);
    renderPet(response);
    if (response.status === 201) {
      console.log("Listado de mascotas exitoso");
      const mensaje = response.data.mensaje;
      Swal.fire({
        icon: "success",
        text: mensaje,
      });
    }
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

//Renderiza JSON
function renderPet(response) {
  cerrarSwal();
  const data = response.data;
  console.log("data", data);
  if (data && data.length > 0) {
    // Construir la tabla HTML para mostrar los datos
    let tableHtml =
      "<table id='tablaPet'>" +
      "<thead><tr>" +
      "<th>Apartamento</th>" +
      "<th>Nombre</th>" +
      "<th>Tipo</th>" +
      "<th>Foto</th>" +
      "<th>Eliminar</th>" +
      "</tr></thead><tbody>";
    data.forEach((item) => {
      tableHtml += `<tr>
      <td>${item.id_apt}</td>
      <td>${item.nombre}</td>
      <td>${item.tipo}</td>
      <td>${item.foto}</td>
      <td><button
      type='button'
      class=''
      onclick='formDeletPet(${item.id_mascota}, "${item.nombre}")'
      >Eliminar
      </button>
      </td>
      </tr>`;
    });
    tableHtml += "</tbody></table>";

    // Renderizar la tabla en el contenedor deseado
    document.getElementById("container-table").innerHTML = tableHtml;
    document.getElementById("searchInput").style.display = "block";
  } else {
    //  Mostrar un mensaje si no hay datos
    document.getElementById("container-table").innerHTML =
      "No hay datos disponibles.";
  }
}

//FUNCION BARRA-BUSCAR
function doSearch() {
  if (document.getElementById("tablaPet")) {
    const tableReg = document.getElementById("tablaPet");
    const searchText = document
      .getElementById("searchInput")
      .value.toLowerCase();
    let total = 0;

    // Recorremos todas las filas con contenido de la tabla
    for (let i = 1; i < tableReg.rows.length; i++) {
      let found = false;
      const cellsOfRow = tableReg.rows[i].getElementsByTagName("td");
      // Recorremos todas las celdas
      for (let j = 0; j < cellsOfRow.length && !found; j++) {
        const compareWith = cellsOfRow[j].innerHTML.toLowerCase();
        // Buscamos el texto en el contenido de la celda
        if (searchText.length == 0 || compareWith.indexOf(searchText) > -1) {
          found = true;
          total++;
        }
      }
      if (found) {
        tableReg.rows[i].style.display = "";
      } else {
        // si no ha encontrado ninguna coincidencia, esconde la fila de la tabla
        tableReg.rows[i].style.display = "none";
      }
    }
    // mostramos las coincidencias
  } else {
    document.getElementById("container-table").innerHTML =
      "No hay vehiculos para buscar";
  }
}


//FORM DELETE CONFIRM
const formDeletPet = (dele, nombre) => {
  let delet = dele
  console.log("delet ",dele)
  Swal.fire({
    html:
      '<br><br><center><form id="formPqrsAdmin" name="formPQRS" class="formSwal">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b id="titregcli" class="titulo">¿Eliminar Mascota?</b></h2><br>' +
      '<input type="button" id="deletPet" name="codi" class="btn btninfo" readonly><br><br>' +
      '<button type="button" id="btnDelePet" name="btnDelePet" onClick="deletIdPet(event, '+delet+')"'+
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
  document.getElementById("deletPet").value = nombre;
  console.log("formDeletPet",dele);
};

//FUNCTION DELETE
const deletIdPet = async (event, petId) => {
  event.preventDefault();
console.log("dele: ", petId);
  //const codigo = document.getElementById("deleVehi").value;
  console.log("petId: ", petId);
  document.getElementById("info").innerHTML = "Eliminando...";
  try {
    const response = await axios.delete(`/api/deletePet/${petId}`);
    if (response.status === 201) {
      console.log("Mascota eliminada");
      const mensaje = response.data.message;
      Swal.fire({
        icon: "success",
        text: mensaje,
      });
    }
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