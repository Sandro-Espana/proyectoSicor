const formPqrsAdmin = () => {
  Swal.fire({
    html:
      '<br><br><center><form id="formPqrsAdmin" name="formPQRS" class="formSwal">' +
      '<h2 class=""><b id="titregcli" class="titulo">GESTIONAR PQRS</b></h2><br>' +
      //'<input type="datetime-local" id="fechaCreacion" name="fechaCreacion" readonly class="input"><br>' +
      '<button type="button" id="listarBtn" name="listarBtn" onClick="listarPQRS(event)" class="btn btnMedio">Listar</button>&nbsp;&nbsp;&nbsp;&nbsp;' +
      '<input type="button" id="cerrar" name="cerrar" class="btn btnMedio" onclick="cerrarSwal()" value="Cerrar"><br><br>' +
      '<h3 id="info" class="titazul"></h3>' +
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

function limpiarFormulario() {
  document.getElementById("formPQRS").reset();
}

//CAPTURA LA HORA Y FECHA DEL MOMENTO
function vfecha() {
  let fecha = new Date();
  let mes = fecha.getMonth() + 1;
  let dia = fecha.getDate();
  let anio = fecha.getFullYear();
  let horas = fecha.getHours();
  let minutos = fecha.getMinutes();
  let segundos = fecha.getSeconds();

  if (dia < 10) {
    dia = "0" + dia;
  }
  if (mes < 10) {
    mes = "0" + mes;
  }
  if (horas < 10) {
    horas = "0" + horas;
  }
  if (minutos < 10) {
    minutos = "0" + minutos;
  }
  if (segundos < 10) {
    segundos = "0" + segundos;
  }

  // Formatea la cadena de fecha
  let fec =
    anio + "-" + mes + "-" + dia + "T" + horas + ":" + minutos + ":" + segundos;
  return fec;
}

//función para listar PQRS
const listarPQRS = async (event) => {
  event.preventDefault();
  document.getElementById("info").innerHTML = "Listando PQRS....."; // Mostrar un mensaje al cliente
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
      "<table id='tablaPQRS'><thead><tr><th>ID</th><th>Tipo</th><th>Asunto</th><th>Descripción</th><th>Modi</th></tr></thead><tbody>";
    data.forEach((item) => {
      tableHtml += `<tr><td>${item.PQRSID}</td><td>${item.Tipo}</td><td>${item.Asunto}</td><td>${item.Descripcion}</td><td><button type='button' class='' onclick='modiData(${item.PQRSID})'>modificar</button></td></tr>`;
    });
    tableHtml += "</tbody></table>";

    // Renderizar la tabla en el contenedor deseado
    document.getElementById("container-table").innerHTML = tableHtml;
  } else {
    // Mostrar un mensaje si no hay datos
    document.getElementById("container-table").innerHTML =
      "No hay datos disponibles.";
  }
}

//FORMULARIO PARA ACTUALIZAR PQRS
let modiData = (cod) => {
  Swal.fire({
    html:
      '<br><br><center><form id="" name="" class="formSwal" onsubmit="sendText(event)">' +
      '<h2 class=""><b id="titregcli" class="titulo">GESTIONAR PQRS</b></h2><br>' +
      '<label class="label"><b>Estado</b></label><br>' +
      '<select id="estado" name="estado" class="input inputMax" title="estado"><option></option><option>Pendiente</option><option>En Proceso</option><option>Resuelto</option></select><br>' +
      '<label class="label"><b>Codigo</b></label><br>' +
      '<input type="text" id="codigo" name="codigo" class="input" readOnly><br>' +
      '<label class="label"><b>Asunto</b></label><br>' +
      '<input type="text" id="asunto" name="asunto" class="input" readOnly><br><br><br>' +
      '<label class="label"><b>Descripcion</b></label><br>' +
      '<textarea id="descripcion" name="descripcion" class="input inputext" readonly rows="4" placeholder="Descripción"></textarea><br>' +
      '<label class="label"><b>Respuesta</b></label><br>' +
      '<textarea id="respuesta" name="respuesta" class="input inputext"  rows="4" placeholder="Respuesta"></textarea><br>' +
      '<input type="button" id="Eliminar" name="Eliminar" class="btn btninfo" onclick="formConfirDelet()" value="Eliminar"><br><br>' +
      '<input type="button" id="actualizar" name="actualizar" class="btn" onclick="UpdatePqrs(event)" value="Responder"><br><br>' +
      '<input type="button" id="cerrar" name="cerrar" class="btn" onclick="cerrarSwal()" value="Cerrar"><br><br>' +
      '<h3 id="info" class="titazul">.</h3>' +
      "</form></center><br><br>",
    width: "100%",
    background: "rgba(0,0,0,0.0)",
    backdrop: true,
    allowOutsideClick: false, // solo puede cerrar con el boton
    showConfirmButton: false,
  });

  //let titulotabla = document.getElementById("titulotable").innerHTML;


  document.getElementById("codigo").value = cod;
  let table = document.getElementById("tablaPQRS");
  for (let i = 0, row; (row = table.rows[i]); i++) {
    if (table.rows[i].cells[0].innerHTML == cod) {
      document.getElementById("asunto").value =
        table.rows[i].cells[1].innerHTML;
      document.getElementById("descripcion").value =
        table.rows[i].cells[3].innerHTML;
      return;
    }
  }
};


const formConfirDelet = () => {
  Swal.fire({
    html:
      '<br><br><center><form id="formPqrsAdmin" name="formPQRS" class="formSwal">' +
      '<h2 class=""><b id="titregcli" class="titulo">¿Esta seguro de eliminar esta PQRS?</b></h2><br>' +
      //'button type="button" id="listarBtn" name="listarBtn" onClick="listarPQRS(event)" class="btn btnMedio">Listar</button>&nbsp;&nbsp;&nbsp;&nbsp;' +
      '<button type="button" id="eliminarBtn" name="eliminarBtn" onclick="eliminarPQRS(event)" class="btn btnMedio">Eliminar</button>&nbsp;&nbsp;&nbsp;&nbsp;' +
      '<input type="button" id="cerrar" name="cerrar" class="btn btnMedio" onclick="cerrarSwal()" value="Cerrar"><br><br>' +
      '<h3 id="info" class="titazul"></h3>' +
      "</form></center><br><br>",
    width: "100%",
    background: "rgba(0,0,0,0.0)",
    backdrop: true,
    allowOutsideClick: false,
    showConfirmButton: false,
  });
};


//FUNCION BUSCAR
function doSearch() {
  if (document.getElementById("tablaPQRS")) {
    const tableReg = document.getElementById("tablaPQRS");
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
      "No hay PQRS para buscar";
  }
}

//FUNCION PARA ACTUALIZAR PQRS
const UpdatePqrs = async (event) => {
  event.preventDefault();

  document.getElementById("info").innerHTML = "Enviando.....";
  const estado = document.getElementById("estado").value;
  const codigo = document.getElementById("codigo").value;
  const respuesta = document.getElementById("respuesta").value;
  // Obtener el ID del PQRS que se desea actualizar
  const pqrsId = codigo;

  try {
    // Enviar los datos del formulario al servidor usando Axios
    const response = await axios.put(`/api/updatePQRS/${pqrsId}`, {
      estado,
      respuesta,
    });
    console.log(response);

    if (response.status === 201) {
      console.log("Registro de PQRS exitoso");
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
};

//FUNCTION DELETE
const eliminarPQRS = async (event) => {
  event.preventDefault();

  const codigo = document.getElementById("codigo").value;
  const pqrsId = codigo;
  console.log("pqrsId: ",pqrsId)
  document.getElementById("info").innerHTML = "Eliminando.....";
  try {
    const response = await axios.delete(`/api/deletePQRS/${codigo}`);
    if (response.status === 200) {
      console.log("Eliminación de PQRS exitosa");
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
};

// function listData(response) {
//   cerrarSwal();
//   console.log(response.data[0])
//   response.data.forEach(fila =>{
//     console.log(fila)
//   })
//   document.getElementById("container-table").innerHTML = response.data[0]
// }

// let retlistaClieestado = (ret) => {

//     document.getElementById("titulotable").innerHTML = "Listado Clientes " + ret[0][2] + "s";
//     document.getElementById("muestraTabla").innerHTML = "";

//document.getElementById("divTablaCitas").style.display = "block";
//     let cabeceraTable = ["Codigo", "Nombre", "Estado"];

//     let muestraTabla = document.getElementById("muestraTabla");

// let table = document.createElement("table");
// table.setAttribute("id", "tablaDatos");

// let thead = document.createElement("thead");

// let tr = document.createElement("tr");

// cabeceraTable.forEach(nomcab =>{
//   let th = document.createElement("th");
//   th.innerHTML = nomcab
//   tr.appendChild(th);
// });

// thead.appendChild(tr);
// table.appendChild(thead);

//   ret.forEach(fila =>{

//     let tr = document.createElement("tr");
//     tr.setAttribute('onclick', "auxiliarusuarios("+ fila[0] +")");
//       fila.forEach(e =>{
//         let td = document.createElement("td");
//         td.innerHTML = e
//         tr.appendChild(td);
//arraycitas.push(e)
//       })
//     table.appendChild(tr);
//   });
//     muestraTabla.appendChild(table);
//document.getElementById("buscatable").focus()
//}
