//FORM LISTAR USER
const formUser = () => {
  Swal.fire({
    html:
      '<br><br><center><form id="formUser" name="formUser=" class="formSwal">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b id="titregcli" class="titulo">Gestionar usuarios</b></h2><br>' +
      '<button type="button" id="Btnlistar" name="Btnlistar" onClick="listUser(event)" class="btn btnMedio">Listar</button>&nbsp;&nbsp;&nbsp;&nbsp;' +
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
function cerrarSwal() {
  Swal.close();
}

// FUNCTION LIST USERS
const listUser = async (event) => {
  event.preventDefault();
  document.getElementById("info").innerHTML = "Listando PQRS.....";
  try {
    const response = await axios.get("/api/listUsers");
    rendertUser(response);
    console.log("response: ", response);
    if (response.status === 200) {
      console.log("Listado de usuarios exitoso");
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
};

//RENDER JSON
function rendertUser(response) {
  cerrarSwal();
  const data = response.data;
  if (data && data.length > 0) {
    // Construir la tabla HTML para mostrar los datos
    let tableHtml =
      "<table id='tablaPQRS'><thead><tr>" +
      "<th>ID</th>" +
      "<th>ID Apt</th>" +
      "<th>Nombres</th>" +
      "<th>Apellidos</th>" +
      "<th>Email</th>" +
      "<th>Celular</th>" +
      "<th>Propietario</th>" +
      "<th>Gestionar</th>" +
      "</tr></thead><tbody>";
    data.forEach((item) => {
      tableHtml += `<tr>
      <td>${item.residente_id}</td>
      <td>${item.unidad_residencial}</td>
      <td>${item.nombre}</td>
      <td>${item.apellido}</td>
      <td>${item.username}</td>
      <td>${item.celular}</td>
      <td>${item.prpietario_id}</td>
      <td><button
      type='button'
      class=''
      onclick='modiUser(${item.residente_id})'>
      Gestionar
      </button></td>
      </tr>`;
    });
    tableHtml += "</tbody></table>";

    // RENDER TABLE
    document.getElementById("container-table").innerHTML = tableHtml;
    document.getElementById("searchInput").style.display = "block";
  } else {
    // Mostrar un mensaje si no hay datos
    document.getElementById("container-table").innerHTML =
      "No hay datos disponibles.";
  }
}

//FORM MANAGE USER
let modiUser = (id) => {
  console.log("modiUser ", id);
  Swal.fire({
    html:
      '<br><br><center><form id="modiUser" name="modiUser" class="formSwal" onsubmit="sendText(event)">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b id="titregcli" class="titulo">Gestionar usuarios</b></h2><br>' +
      '<input type="button" id="sancionar" name="sancionar" class="btn btninfo" ' +
      'onClick="formSanciones(' +
      id +
      ')" value="Sancionar"><br><br>' +
      '<input type="button" id="Eliminar" name="Eliminar" class="btn btninfo"' +
      ' onClick="formDeleUser(' +
      id +
      ')" value="Eliminar"><br><br>' +
      //'<input type="button" id="actualizar" name="actualizar" class="btn" onclick="UpdatePqrs(event)" value="Guardar"><br><br>' +
      '<h3 id="info" class="titazul">.</h3>' +
      "</div>" +
      "</form></center><br><br>",
    width: "100%",
    background: "rgba(0,0,0,0.0)",
    backdrop: true,
    allowOutsideClick: false, // solo puede cerrar con el boton
    showConfirmButton: false,
  });
};

// FORM SANCTION
let formSanciones = (id) => {
  console.log("formSancione ", id);
  Swal.fire({
    html:
      '<br><br><center><form id="regSancion" name="regSancion" class="formSwal" onsubmit="sendText(event)">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b class="titulo">Formulario de Sanciones</b></h2><br>' +
      '<label class="label"><b>Estado</b></label><br>' +
      '<select id="estado" name="tipo" class="input inputMax" title="Tipo">' +
      "<option></option><option>Activa</option>" +
      "<option>Revocada</option><option>Apelación</option></select><br>" +
      '<label class="label"><b>Residente ID</b></label><br>' +
      '<input type="text" id="residenteID" name="residenteID" class="input" readonly ' +
      'autocomplete="off"><br>' +
      '<label class="label"><b>Fecha y hora</b></label><br>' +
      '<input type="datetime-local" id="fechaCreacion" name="fechaCreacion" readonly class="input"><br>' +
      '<label class="label"><b>Descripción</b></label><br>' +
      '<input type="text" id="descripcion" name="descripcion" class="input" placeholder="Descripción" ' +
      'autocomplete="off"><br>' +
      '<label class="label"><b>Foto de Evidencia</b></label><br>' +
      '<input type="file" id="fotoEvidencia" name="fotoEvidencia" class="input" accept="image/*"><br><br>' +
      '<input type="button" id="guardar" name="guardar" class="btn" onClick="saveSanction(event)" ' +
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
  document.getElementById("fechaCreacion").value = vfecha();

  document.getElementById("residenteID").value = id;
};

function cerrarSwal() {
  swal.close();
}

// FUNCTION SEND SANCTION
const saveSanction = async (event) => {
  event.preventDefault();

  const residente_id = document.getElementById("residenteID").value;
  const fecha_hora = document.getElementById("fechaCreacion").value;
  const descripcion = document.getElementById("descripcion").value;
  const estado = document.getElementById("estado").value;
  const foto_evidencia = document.getElementById("fotoEvidencia").value;
  // const unidad_residencial = document.getElementById("estado").value;
  if (
    residente_id == "" ||
    fecha_hora == "" ||
    descripcion == "" ||
    estado == "" ||
    foto_evidencia == ""
  ) {
    document.getElementById("info").innerHTML =
      "Todos los campos son obligatorio";
    setTimeout("document.getElementById('info').innerHTML  = ''", 4000);
    return;
  }
  //document.getElementById("actualizar").disabled = true;
  document.getElementById("info").innerHTML = "Enviando.....";
  try {
    const response = await axios.post("/api/newSanction", {
      residente_id,
      fecha_hora,
      descripcion,
      estado,
      foto_evidencia,
    });
    if (response.status === 201) {
      console.log("Sanción creada correctamente");
      Swal.fire({
        icon: "success",
        text: "Sanción creada correctamente",
        onClose: () => {
          // Cerrar el formulario después de mostrar el mensaje de éxito
          cerrarSwal();
        },
      });
    }
  } catch (error) {
    console.error("Error al guardar la sanción:", error);
    // Mostrar mensaje de error
    Swal.fire({
      icon: "error",
      text: "Error al guardar la sanción",
    });
  }
};

// Función para cerrar el formulario de SweetAlert
function cerrarSwal() {
  Swal.close();
}

//FORM DELETE CONFIRM
const formDeleUser = (id) => {
  console.log("formDeleUser ", id);
 
  // let cod = document.getElementById("codigo").value;
  Swal.fire({
    html:
      '<br><br><center><form id="formDeleUser" name="formDeleUser" class="formSwal">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      '</div>' +
      '<h2 class=""><b id="titregcli" class="titulo">¿Eliminar usuario?</b></h2><br>' +
      '<input type="button" id="BtndeleUser" name="codi" class="btn btninfo" readonly><br><br>' +
      //'<button type="button" id="BtndeleUser" name="eliminarBtn" onClick="deletUser(event)" ' +
      //'class="btn btnMedio"></button>' +
      '<input type="button" id="codi" name="codi" class="btn btninfo" onclick="deletUser('+id+')"' +
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
  //document.getElementById("codi").value = cod;
  document.getElementById("BtndeleUser").value = id;
  //console.log(cod);
};

// FUNCTION DELETE USER
const deletUser = async (codi) => {
  //event.preventDefault();
  let codigo = codi
   //codigo = document.getElementById("BtndeleUser").value;
  console.log(" codigo deletUser : ", codigo);
  document.getElementById("info").innerHTML = "Eliminando.....";
  try {
    const response = await axios.delete(`/api/deleteUser/${codigo}`);
    document.getElementById("info").innerHTML = "Eliminando";
    console.log("response: ",response);
    setTimeout("cerrarSwal()", 2000);
    if (response.status === 200) {
      console.log("Eliminación de PQRS exitosa");
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
};
