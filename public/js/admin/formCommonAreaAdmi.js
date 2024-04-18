// FORM LIST OR REGIST COMMON AREA
const formListOrRegist = () => {
  Swal.fire({
    html:
      '<br><br><center><form id="formPqrsAdmin" name="formPQRS" class="formSwal">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b id="titregcli" class="titulo">Gestionar zonas comunes</b></h2><br>' +
      '<button type="button" id="btnRegister" name="btnRegister" onClick="formCommonArea(event)"' +
      'class="btn ">Registrar</button>&nbsp;&nbsp;&nbsp;&nbsp;' +
      '<button type="button" id="btnList" name="btnList" onClick="listCommonArea(event)"' +
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

// FORM TO REGISTER COMMON ZONE
let formCommonArea = () => {
  Swal.fire({
    html:
      '<br><br><center><form id="regZonaComun" name="regZonaComun" class="formSwal"' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b class="titulo">Registro de Zonas Comunes</b></h2><br>' +
      '<label class="label"><b>Nombre</b></label><br>' +
      '<input type="text" id="name" name="name" class="input" placeholder="Nombre"' +
      'autocomplete="off"><br>' +
      '<label class="label"><b>Descripción</b></label><br>' +
      '<textarea id="description" name="description" class="input inputext" placeholder="Descripción">' +
      "</textarea><br><br>" +
      '<label class="label"><b>Foto</b></label><br>' +
      '<input type="file" id="image" name="image" class="input" accept="image/*"><br><br>' +
      '<input type="button" id="guardar" name="guardar" class="btn" onclick="registerCommonAre()"' +
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

// FUNCTION FOR SENDING COMMON AREA FORM DATA
const registerCommonAre = async () => {
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const image = document.getElementById("image").value;
  if (name == "" || description == "" || image == "") {
    document.getElementById("info").innerHTML =
      "Todos los campos son obligatorio";
    setTimeout("document.getElementById('info').innerHTML  = ''", 3000);
    return;
  }
  try {
    const response = await axios.post("/api/newCommonArea", {
      name,
      description,
      image,
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

// FUNCTION LIST ALL COMMON AREAS OF THE DB
const listCommonArea = async (event) => {
  event.preventDefault();
  document.getElementById("info").innerHTML = "Listando zonas comunes...";
  try {
    const response = await axios.get("/api/listCommonArea");
    if (response.status === 201) {
      renderCommonArea(response);
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
      console.error("Error en la solicitud:", error);
    }
  }
};

// RENDER JSON
function renderCommonArea(response) {
  cerrarSwal();
  const data = response.data;
  if (data && data.length > 0) {
    // BUIL THE HTML TABLE TO DISPLAY THE DATA
    let tableHtml =
      "<table id='tablaPQRS'>" +
      "<thead><tr>" +
      "<th>ID</th>" +
      "<th>Nombre</th>" +
      "<th>Descripción</th>" +
      "<th>Imagen</th>" +
      "<th>Gestion</th>" +
      "</tr></thead><tbody>";
    data.forEach((item) => {
      const description = item.description.replace(/\r?\n/g, "");
      tableHtml += `<tr>
      <td>${item.id_common_area}</td>
      <td>${item.name}</td>
      <td>${item.description}</td>
      <td>${item.image}</td>
      <td><button
      type='button'
      class=''
      onclick='updateDelete(
        ${item.id_common_area}, "${item.name}", "${description}" )'
      >Gestion
      </button>
      </td>
      </tr>`;
    });
    tableHtml += "</tbody></table>";
    //  RENDER THE TABLE IN THE CONTAINER
    document.getElementById("container-table").innerHTML = tableHtml;
    document.getElementById("searchInput").style.display = "block";
  } else {
    // DISPLAY A MESSAGE IF THERE IS NO DATA
    document.getElementById("container-table").innerHTML =
      "No hay datos disponibles.";
  }
}

// UPDATE OR DELETE COMMON AREA FORM
const updateDelete = (id, name, description) => {
  Swal.fire({
    html:
      '<br><br><center><form id="modiUser" name="modiUser" class="formSwal" onsubmit="sendText(event)">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b id="titregcli" class="titulo">Gestionar zonas comunes</b></h2><br>' +
      '<input type="button" id="btnUpdate" name="btnUpdate" class="btn btninfo" ' +
      'onClick="formUpdateCommonArea(' +id+",'" + name +' \', \'' + description + '\')" '+
      'value="Actualizar"><br><br>' +
      '<input type="button" id="Eliminar" name="Eliminar" class="btn btninfo"' +
      ' onClick="formDeleteCommonArea(' +id+",'" + name +' \')" value="Eliminar"><br><br>' +
      '<h3 id="info" class="titazul">.</h3>' +
      "</div> </form></center><br><br>",
    width: "100%",
    background: "rgba(0,0,0,0.0)",
    backdrop: true,
    allowOutsideClick: false,
    showConfirmButton: false,
  });
};

// FORM TO UPDATE COMMON ARE BY ID
const formUpdateCommonArea = (id, name, description) => {
  Swal.fire({
    html:
      '<br><br><center><form id="modiData" name="" class="formSwal" onsubmit="sendText(event)">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b id="titregcli" class="titulo">Actualizar zona comun</b></h2><br>' +
      '<label class="label"><b>ID</b></label><br>' +
      '<input type="text" id="id" name="id" class="input" readOnly><br>' +
      '<label class="label"><b>Nombre</b></label><br>' +
      '<input type="text" id="name" name="name" class="input" ><br><br><br>' +
      '<label class="label"><b>Descripcion</b></label><br>' +
      '<textarea id="description" name="description" class="input inputext" ' +
      'rows="4" placeholder="Descripción"></textarea><br>' +
      '<input type="file" id="image" name="image" class="input" accept="image/*"><br><br>' +
      '<input type="button" id="update" name="update" class="btn" ' +
      'onclick="updateCommonArea(event)" value="Guardar"><br><br>' +
      '<h3 id="info" class="titazul">.</h3>' +
      "</div>" +
      "</form></center><br><br>",
    width: "100%",
    background: "rgba(0,0,0,0.0)",
    backdrop: true,
    allowOutsideClick: false,
    showConfirmButton: false,
  });
  document.getElementById("id").value = id;
  document.getElementById("name").value = name;
  document.getElementById("description").value = description;
};

// FUNCTION TO SEND COMMON AREA UPDATE BY ID TO ERVER
const updateCommonArea = async (event) => {
  event.preventDefault();

  const id_common_area = document.getElementById("id").value;
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
 const image = document.getElementById("image").value;
  document.getElementById("info").innerHTML = "Enviando.....";
  try {
    console.log(id_common_area)
    const response = await axios.put(`/api/updateCommonArea/${id_common_area}`, {
      id_common_area,
      name,
      description,
      image
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

//FORM TO CONFIRM THE REMOVAL OF THE COMMON ZONE
const formDeleteCommonArea = (id, name) => {
  console.log("formDeleteCommonArea ",id, name)
  Swal.fire({
    html:
      '<br><br><center><form id="formDeleUser" name="formDeleUser" class="formSwal">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b id="titregcli" class="titulo">¿Eliminar zona comun?</b></h2><br>' +
      '<input type="button" id="BtndeleUser" name="codi" class="btn btninfo" readonly><br><br>' +
      '<input type="button" id="codi" name="codi" class="btn btninfo" onclick="deletCommonArea(' +
      id +
      ')"' +
      'value="Eliminarr"><br><br>' +
      '<h3 id="info" class="titazul"></h3>' +
      "</div>" +
      "</form></center><br><br>",
    width: "100%",
    background: "rgba(0,0,0,0.0)",
    backdrop: true,
    allowOutsideClick: false,
    showConfirmButton: false,
  });
  document.getElementById("BtndeleUser").value = name;
};

// FUNCTION TO DELETE THE COMMON AREA IN THE DB
const deletCommonArea = async (id_common_area) => {
  document.getElementById("info").innerHTML = "Eliminando.....";
  try {
    const response = await axios.delete(`/api/deleteCommonArea/${id_common_area}`);
    if (response.status === 201) {
      console.log("Mascota eliminada");
      const message = response.data.message;
      Swal.fire({
        icon: "success",
        text: message,
      });
    }
  } catch (error) {
    if (error.response) {
      const message = error.response.data.error.message;
      console.log("mensaje: ", mensaje);
      Swal.fire({
        icon: "error",
        text: message,
      });
    } else {
      console.error("Error en la solicitud:", error);
    }
  }
};