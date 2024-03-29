const formPqrsAdmin = () => {
  Swal.fire({
    html:
      '<br><br><center><form id="formPqrsAdmin" name="formPQRS" class="formSwal">' +
      '<h2 class=""><b id="titregcli" class="titulo">GESTIONAR PQRS</b></h2><br>' +
      //'<input type="datetime-local" id="fechaCreacion" name="fechaCreacion" readonly class="input"><br>' +
      '<button type="button" id="listarBtn" name="listarBtn" onClick="listarPQRS(event)" class="btn btnMedio">Listar</button>&nbsp;&nbsp;&nbsp;&nbsp;' +
      '<input type="button" id="cerrar" name="cerrar" class="btn btnMedio" onclick="cerrarSwal()" value="Cerrar"><br><br>' +
      '<h3 id="info" class="titazul">.</h3>' +
      "</form></center><br><br>",
    width: "100%",
    background: "rgba(0,0,0,0.0)",
    backdrop: true,
    allowOutsideClick: false,
    showConfirmButton: false,
  });
  document.getElementById("fechaCreacion").value = obtenerFechaActual();
  // Agregar un event listener al botón "listarBtn" para llamar a la función listarPQRS cuando se haga clic en él
  
};

function cerrarSwal() {
  Swal.close();
}

function limpiarFormulario() {
  document.getElementById("formPQRS").reset();
}

function obtenerFechaActual() {
  const fecha = new Date();
  const anio = fecha.getFullYear();
  let mes = fecha.getMonth() + 1;
  mes = mes < 10 ? "0" + mes : mes;
  let dia = fecha.getDate();
  dia = dia < 10 ? "0" + dia : dia;
  let hora = fecha.getHours();
  hora = hora < 10 ? "0" + hora : hora;
  let minutos = fecha.getMinutes();
  minutos = minutos < 10 ? "0" + minutos : minutos;
  return `${anio}-${mes}-${dia}T${hora}:${minutos}`;
}

function listar() {
  Swal.fire({
    title: "Listar PQRS",
    text: "Aquí se listarían todos los PQRS disponibles",
    icon: "info",
    confirmButtonText: "Entendido",
  });
}

// Definir la función para listar PQRS
const listarPQRS = async (event) => {
  event.preventDefault();
    console.log("funcion listar")
  document.getElementById("info").innerHTML = "Listando PQRS.....";
  try {
    const response = await axios.get("/api/listarPQRS");
    listData(response)
    
    if (response.status === 200) {
      console.log("Listado de PQRS exitoso");
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
};


function listData(response) {
  cerrarSwal(); // Cerrar el modal o mensaje de carga
  console.log(response.data); // Mostrar los datos en la consola para verificar
  const data = response.data;
  console.log("data: ",data); // Mostrar los datos
  // Verificar si hay datos en la respuesta
  if (data && data.length > 0) {
    // Construir la tabla HTML para mostrar los datos
    let tableHtml = "<table id='tablaPQRS'><thead><tr><th>ID</th><th>Tipo</th><th>Asunto</th><th>Descripción</th><th>Modi</th></tr></thead><tbody>";
    data.forEach(item => {
      tableHtml += `<tr><td>${item.PQRSID}</td><td>${item.Tipo}</td><td>${item.Asunto}</td><td>${item.Descripcion}</td><td><button type='button' class='' onclick='modiData(${item.PQRSID})'>modificar</button></td></tr>`;
    });
    tableHtml += "</tbody></table>";

    // Renderizar la tabla en el contenedor deseado
    document.getElementById("container-table").innerHTML = tableHtml;
  } else {
    // Mostrar un mensaje si no hay datos
    document.getElementById("container-table").innerHTML = "No hay datos disponibles.";
  }
}



let modiData = (cod) => {   //permite subir mas info de usuarios
  console.log(cod)
  Swal.fire({
    //title: '<h3><b id="titulo">Gastos</b></h3>',
    //text: '<h3 id="nota">sdsdfsd</h3>'',
    html: '<br><br><center><form id="" name="" class="formSwal" onsubmit="sendText(event)">'+
          '<h2 class=""><b id="titregcli" class="titulo">GESTIONAR PQRS</b></h2><br>'+
          '<label class="label"><b>Estado</b></label><br>'+
          '<select id="estado" name="estado" class="input inputMax" title="estado"><option></option><option>Atentido</option><option>Proceso</option><option>Finalizado</option></select><br>' +
          '<label class="label"><b>Codigo</b></label><br>'+
          '<input type="text" id="codigo" name="codigo" class="input" readOnly><br>'+
          '<label class="label"><b>Asunto</b></label><br>'+
          '<input type="text" id="nombre" name="nombre" class="input" readOnly><br><br><br>'+
          '<label class="label"><b>Descripcion</b></label><br>'+
          '<textarea id="descripcion" name="descripcion" class="input inputext" readonly rows="4" placeholder="Descripción"></textarea><br>' +
          '<label class="label"><b>Respuesta</b></label><br>'+
          '<textarea id="Respuesta" name="descripcion" class="input inputext"  rows="4" placeholder="Respuesta"></textarea><br>' +
          '<input type="button" id="" name="" class="btn btninfo" onclick=" " value="Eliminar"><br><br>'+
          '<input type="button" id="cerrar" name="cerrar" class="btn" onclick="cerrarSwal()" value="Guardar"><br><br>'+
          '<input type="button" id="cerrar" name="cerrar" class="btn" onclick="cerrarSwal()" value="Cerrar"><br><br>'+
          '<h3 id="info" class="titazul">.</h3>'+
          '</form></center><br><br>',
  
          width: "100%",
          background: "rgba(0,0,0,0.0)",
          backdrop: true,   // 
          allowOutsideClick: false,    // solo puede cerrar con el boton
          showConfirmButton: false,      
  })
  //let titulotabla = document.getElementById("titulotable").innerHTML;
  
  document.getElementById("codigo").value = cod;
  
  let table = document.getElementById("tablaPQRS");
  for (let i = 0, row; row = table.rows[i]; i++) {
    if(table.rows[i].cells[0].innerHTML == cod){
      document.getElementById("nombre").value = table.rows[i].cells[1].innerHTML
      document.getElementById("descripcion").value = table.rows[i].cells[3].innerHTML
      return
    }
  }
  }
  
function doSearch(){
  if(document.getElementById('tablaPQRS')){
            const tableReg = document.getElementById('tablaPQRS');
            const searchText = document.getElementById('searchInput').value.toLowerCase();
            let total = 0;
 
            // Recorremos todas las filas con contenido de la tabla
            for (let i = 1; i < tableReg.rows.length; i++) {
              
                let found = false;
                const cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
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
                    tableReg.rows[i].style.display = '';
                } else {
                    // si no ha encontrado ninguna coincidencia, esconde la
                    // fila de la tabla
                    tableReg.rows[i].style.display = 'none';
                }
            }
 
            // mostramos las coincidencias
  }else{
    document.getElementById('container-table').innerHTML = "No hay PQRS para buscar";
  }          
          
        }
// function listData(response) {
//   cerrarSwal();
//   console.log(response.data[0])
//   response.data.forEach(fila =>{
//     console.log(fila)
//   })
//   document.getElementById("container-table").innerHTML = response.data[0]
// }

let retlistaClieestado = (ret) => {
  
    document.getElementById("titulotable").innerHTML = "Listado Clientes " + ret[0][2] + "s";
    document.getElementById("muestraTabla").innerHTML = "";
  
    
    //document.getElementById("divTablaCitas").style.display = "block";
    let cabeceraTable = ["Codigo", "Nombre", "Estado"];

    let muestraTabla = document.getElementById("muestraTabla");

let table = document.createElement("table");
table.setAttribute("id", "tablaDatos");

let thead = document.createElement("thead");

let tr = document.createElement("tr");

cabeceraTable.forEach(nomcab =>{
  let th = document.createElement("th");
  th.innerHTML = nomcab
  tr.appendChild(th);
});

thead.appendChild(tr);
table.appendChild(thead);

  ret.forEach(fila =>{
    
    let tr = document.createElement("tr");
    tr.setAttribute('onclick', "auxiliarusuarios("+ fila[0] +")");
      fila.forEach(e =>{
        let td = document.createElement("td");
        td.innerHTML = e
        tr.appendChild(td);
        //arraycitas.push(e)
      })
    table.appendChild(tr);
  });
    muestraTabla.appendChild(table);
    //document.getElementById("buscatable").focus() 
}


function buscar() {
  Swal.fire({
    title: "Buscar PQRS",
    text: "Aquí se implementaría la funcionalidad de búsqueda de PQRS",
    icon: "info",
    confirmButtonText: "Entendido",
  });
}

function editar() {
  Swal.fire({
    title: "Editar PQRS",
    text: "Aquí se implementaría la funcionalidad de edición de PQRS",
    icon: "info",
    confirmButtonText: "Entendido",
  });
}

function eliminar() {
  Swal.fire({
    title: "Eliminar PQRS",
    text: "Aquí se implementaría la funcionalidad de eliminación de PQRS",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Eliminado", "El PQRS ha sido eliminado", "success");
      // Aquí podrías añadir la lógica para realizar la eliminación en el backend
    }
  });
}
