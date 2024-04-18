// Función para cerrar el SweetAlert
function cerrarSwal() {
  Swal.close();
}

// FUNCTION THE INPUT DATA IS PASSED TO NUMBERS ONLY
function cleanNumbers(input) {
  input = input.toString();
  const regex = /\D/g;
  const cleanNumber = input.replace(regex, "");
  return cleanNumber;
}

// FUNCTION THAT VALIDATES THE EMAIL FORMAT
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// CAPITALIZE ALL LETTERS ON THE NAMEPLATE
function convertMayuscules(input) {
  let plate = input.toString();
  return plate.toUpperCase();
}

// CAPTURES THE TIME AND DATE OF THE MOMENT
// function vfecha() {
//   let fecha = new Date();
//   let mes = fecha.getMonth() + 1;
//   let dia = fecha.getDate();
//   let anio = fecha.getFullYear();
//   let horas = fecha.getHours();
//   let minutos = fecha.getMinutes();
//   let segundos = fecha.getSeconds();

//   if (dia < 10) {
//     dia = "0" + dia;
//   }
//   if (mes < 10) {
//     mes = "0" + mes;
//   }
//   if (horas < 10) {
//     horas = "0" + horas;
//   }
//   if (minutos < 10) {
//     minutos = "0" + minutos;
//   }
//   if (segundos < 10) {
//     segundos = "0" + segundos;
//   }
//   let fec =
//     anio + "-" + mes + "-" + dia + "T" + horas + ":" + minutos + ":" + segundos;
//   return fec;
// }


//CAPTURA LA HORA Y FECHA DEL MOMENTO
function vfecha() {
  let fecha = new Date(); // Fecha actual
  let mes = fecha.getMonth() + 1; // Obteniendo mes
  let dia = fecha.getDate(); // Obteniendo dia
  let anio = fecha.getFullYear(); // Obteniendo año
  let horas = fecha.getHours(); // Obteniendo horas
  let minutos = fecha.getMinutes(); // Obteniendo minutos
  let segundos = fecha.getSeconds(); // Obteniendo segundos

  if (dia < 10) {
    dia = "0" + dia; // Agrega cero si el menor de 10
  }
  if (mes < 10) {
    mes = "0" + mes; // Agrega cero si el menor de 10
  }
  if (horas < 10) {
    horas = "0" + horas; // Agrega cero si el menor de 10
  }
  if (minutos < 10) {
    minutos = "0" + minutos; // Agrega cero si el menor de 10
  }
  if (segundos < 10) {
    segundos = "0" + segundos; // Agrega cero si el menor de 10
  }

  // Formatea la cadena de fecha
  let fec =
    anio + "-" + mes + "-" + dia + "T" + horas + ":" + minutos + ":" + segundos;
  return fec;
}


//FUNCION BARRA-BUSCAR
function doSearch() {
  if (document.getElementById("tablaVehicle")) {
    const tableReg = document.getElementById("tablaVehicle");
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

//FUNCION BARRA-BUSCAR
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
