//FORMULARIO LISTAR USER
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

//LIST USERS
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

//Renderiza JSON
function rendertUser(response) {
  cerrarSwal();
  const data = response.data;
  console.log("users: ", data.data);
  if (data && data.length > 0) {
    // Construir la tabla HTML para mostrar los datos
    let tableHtml =
      "<table id='tablaPQRS'><thead><tr>" +
      "<th>ID</th>" +
      "<th>Apt</th>" +
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

    // Renderizar la tabla en el contenedor deseado
    document.getElementById("container-table").innerHTML = tableHtml;
    document.getElementById("searchInput").style.display = "block";
  } else {
    // Mostrar un mensaje si no hay datos
    document.getElementById("container-table").innerHTML =
      "No hay datos disponibles.";
  }
}

//FORM MANAGE USER
let modiUser = (cod) => {
    Swal.fire({
      html:
        '<br><br><center><form id="modiUser" name="modiUser" class="formSwal" onsubmit="sendText(event)">' +
        '<div class="formulario-container">' +
        '<div class="cerrarX-container">' +
        '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
        "</div>" +
        '<h2 class=""><b id="titregcli" class="titulo">Gestionar usuarios</b></h2><br>' +
        //'<label class="label"><b>Estado</b></label><br>' +
        // '<select id="estado" name="estado" class="input inputMax" title="estado"><option></option><option>Pendiente</option><option>En Proceso</option><option>Resuelto</option></select><br>' +
        // '<label class="label"><b>Codigo</b></label><br>' +
        // '<input type="text" id="codigo" name="codigo" class="input" readOnly><br>' +
        // '<label class="label"><b>Asunto</b></label><br>' +
        // '<input type="text" id="asunto" name="asunto" class="input" readOnly><br><br><br>' +
        // '<label class="label"><b>Descripcion</b></label><br>' +
        // '<textarea id="descripcion" name="descripcion" class="input inputext" readonly rows="4" placeholder="Descripción"></textarea><br>' +
        // '<label class="label"><b>Respuesta</b></label><br>' +
        // '<textarea id="respuesta" name="respuesta" class="input inputext"  rows="4" placeholder="Respuesta"></textarea><br>' +
        '<input type="button" id="sancionar" name="sancionar" class="btn btninfo" onClick="formConfirDelet()" value="Sancionar"><br><br>' +
        '<input type="button" id="Eliminar" name="Eliminar" class="btn btninfo" onClick="formConfirDelet()" value="Eliminar"><br><br>' +
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

//FORM DELETE CONFIRM
const formDeleUser = () => {
  // let cod = document.getElementById("codigo").value;
  Swal.fire({
    html:
      '<br><br><center><form id="formDeleUser" name="formDeleUser" class="formSwal">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b id="titregcli" class="titulo">¿Eliminar usuario?</b></h2><br>' +
      '<input type="button" id="codi" name="codi" class="btn btninfo" onclick="deletUser()" value="Eliminar usuario"><br><br>' +
      //'<input type="button" id="codi" name="codi" class="btn btninfo" onclick="formConfirDelet()" value="Eliminar"><br><br>' +
      '<button type="button" id="eliminarBtn" name="eliminarBtn" onClick="deletUser(event)" class="btn btnMedio">hola ' +
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
  //console.log(cod);
};

// FUNCTION DELETE USER
const deletUser = async (event) => {
  event.preventDefault();

  const codigo = document.getElementById("codi").value;
  //console.log("LINEA 208 codigo: ", codigo);
  //document.getElementById("info").innerHTML = "Eliminando.....";
  try {
    const response = await axios.delete(`/api/deleteUser/${codigo}`);
    document.getElementById("info").innerHTML = "Eliminando";
    setTimeout("cerrarSwal()", 2000);
    if (response.status === 200) {
      console.log("Eliminación de PQRS exitosa");
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
};


