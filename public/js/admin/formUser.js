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
      '<button type="button" id="listarBtn" name="listarBtn" onClick="listUser(event)" class="btn btnMedio">Listar</button>&nbsp;&nbsp;&nbsp;&nbsp;' +
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
    const response = await axios.get("/api/listarPQRS");
    listData(response);
    if (response.status === 200) {
      console.log("Listado de PQRS exitoso");
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
};

//Renderiza JSON
function listData(response) {
  cerrarSwal();
  const data = response.data;
  if (data && data.length > 0) {
    // Construir la tabla HTML para mostrar los datos
    let tableHtml =
      "<table id='tablaPQRS'><thead><tr><th>ID</th><th>Estado</th><th>Tipo</th><th>Asunto</th><th>Descripción</th><th>Fecha</th><th>Gestionar</th></tr></thead><tbody>";
    data.forEach((item) => {
      const fecha = new Date(item.FechaCreacion);
      const fechaFormateada = `${fecha.getDate()}/${fecha.getMonth() + 1}`;
      tableHtml += `<tr><td>${item.PQRSID}</td><td>${item.Estado}</td><td>${item.Tipo}</td><td>${item.Asunto}</td><td>${item.Descripcion}</td><td>${fechaFormateada}</td><td><button type='button' class='' onclick='modiData(${item.PQRSID})'>modificar</button></td></tr>`;
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
