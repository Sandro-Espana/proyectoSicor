// EN PROPIETARIOS PONER COEFICIENTE DE COPROPIEDAD  UN NUMERO PORCENTUAL

// FORM LISTAR USER
const formUser = () => {
  Swal.fire({
    html:
      '<br><br><center><form id="formUser" name="formUser=" class="formSwal">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b id="titregcli" class="titulo">Gestionar usuarios</b></h2><br>' +
      '<button type="button" id="BtnlistReside" name="Btnlistar" onClick="listUser(event)"' +
      'class="btn ">Residentes</button>&nbsp;&nbsp;&nbsp;&nbsp;' +
      '<button type="button" id="BtnlistPropie" name="Btnlistar" onClick="listUser(event)"' +
      'class="btn ">Propietarios</button>&nbsp;&nbsp;&nbsp;&nbsp;<br><br>' +
      
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
      "<th>Residente</th>" +
      "<th>APT</th>" +
      "<th>Nombres</th>" +
      "<th>Apellidos</th>" +
      "<th>Email</th>" +
      "<th>Celular</th>" +
      "<th>Propietario</th>" +
      "<th>Gestionar</th>" +
      "</tr></thead><tbody>";
    data.forEach((item) => {
      tableHtml += `<tr>
      <td>${item.id_residente}</td>
      <td>${item.id_apartamento}</td>
      <td>${item.nombre}</td>
      <td>${item.apellido}</td>
      <td>${item.username}</td>
      <td>${item.celular}</td>
      <td><button
      type='button'
      class=''
      onclick='modiUser(${item.id_propietario})'>
      Gestionar
      </button></td>
      <td><button
      type='button'
      class=''
      onclick='sanUser(${item.id_residente},  "${item.id_apartamento}")'>
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
let sanUser = (id, apt) => {
  console.log("sanUser ", id, apt);
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
      ", '" +
      apt +
      '\')" value="Sancionar"><br><br>' +
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
let formSanciones = (id, apt) => {
  console.log("formSancione ", id, apt);
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
      '<label class="label"><b>Apartamento</b></label><br>' +
      '<input type="text" id="IdApt" name="IdApt" class="input" readonly ' +
      'autocomplete="off"><br>' +
      '<label class="label"><b>Residente</b></label><br>' +
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
  document.getElementById("IdApt").value = apt;
};

function cerrarSwal() {
  swal.close();
}

// FUNCTION SEND SANCTION
const saveSanction = async (event) => {
  event.preventDefault();

  const id_residente = document.getElementById("residenteID").value;
  const fecha_hora = document.getElementById("fechaCreacion").value;
  const descripcion = document.getElementById("descripcion").value;
  const estado = document.getElementById("estado").value;
  const foto_evidencia = document.getElementById("fotoEvidencia").value;
  if (
    id_residente == "" ||
    fecha_hora == "" ||
    descripcion == "" ||
    estado == "" ||
    foto_evidencia == ""
  ) {
    document.getElementById("info").innerHTML =
      "Todos los campos son obligatorio";
    setTimeout("document.getElementById('info').innerHTML  = ''", 3000);
    return;
  }
  //document.getElementById("actualizar").disabled = true;
  document.getElementById("info").innerHTML = "Enviando.....";
  try {
    const response = await axios.post("/api/newSanction", {
      id_residente,
      fecha_hora,
      descripcion,
      estado,
      foto_evidencia,
    });
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
      "</div>" +
      '<h2 class=""><b id="titregcli" class="titulo">¿Eliminar usuario?</b></h2><br>' +
      '<input type="button" id="BtndeleUser" name="codi" class="btn btninfo" readonly><br><br>' +
      //'<button type="button" id="BtndeleUser" name="eliminarBtn" onClick="deletUser(event)" ' +
      //'class="btn btnMedio"></button>' +
      '<input type="button" id="codi" name="codi" class="btn btninfo" onclick="deletUser(' +
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
  //document.getElementById("codi").value = cod;
  document.getElementById("BtndeleUser").value = id;
  //console.log(cod);
};

// FUNCTION DELETE USER
const deletUser = async (codi) => {
  //event.preventDefault();
  let codigo = codi;
  //codigo = document.getElementById("BtndeleUser").value;
  console.log(" codigo deletUser : ", codigo);
  document.getElementById("info").innerHTML = "Eliminando.....";
  try {
    const response = await axios.delete(`/api/deleteUser/${codigo}`);
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
      const mensaje = error.response.data.error.message;
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
