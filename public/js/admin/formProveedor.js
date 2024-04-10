// FORM LIST OR REGIST
const formProvider = () => {
  Swal.fire({
    html:
      '<br><br><center><form id="formPqrsAdmin" name="formPQRS" class="formSwal">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b id="titregcli" class="titulo">Gestionar proveedores</b></h2><br>' +
      '<button type="button" id="btnformProvi" name="btnformProvi" onClick="formProveedor(event)"' +
      'class="btn ">Registrar</button>&nbsp;&nbsp;&nbsp;&nbsp;' +
      '<button type="button" id="listarBtn" name="listarBtn" onClick="listSuppliers(event)"' +
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

// FORM SUPPLIER
let formProveedor = () => {
  Swal.fire({
    html:
      '<br><br><center><form id="regprov" name="regprov" class="formSwal"' +
      //'onsubmit="enviarProveedor(event)">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b id="titregprov" class="titulo">Formulario de Proveedor</b></h2><br>' +
      '<label class="label"><b>Tipo de Servicio</b></label><br>' +
      '<select id="tipoServicio" name="tipoServicio" class="input" title="Tipo de Servicio">' +
      "<option></option><option>Mantenimiento</option><option>Limpieza</option>" +
      "<option>Seguridad</option><option>Otros</option></select><br>" +
      '<label class="label"><b>Nombre del Proveedor</b></label><br>' +
      '<input type="text" id="nombreProveedor" name="nombreProveedor" class="input"' +
      'placeholder="Nombre del Proveedor" autocomplete="off"><br>' +
      '<label class="label"><b>Nombre de Contacto</b></label><br>' +
      '<input type="text" id="contactoNombre" name="contactoNombre" class="input" ' +
      'placeholder="Nombre de Contacto" autocomplete="off"><br>' +
      '<label class="label"><b>Teléfono de Contacto</b></label><br>' +
      '<input type="text" id="contactoTelefono" name="contactoTelefono" class="input"' +
      'placeholder="Teléfono de Contacto" autocomplete="off"><br>' +
      '<label class="label"><b>Correo Electrónico</b></label><br>' +
      '<input type="email" id="correoElectronico" name="correoElectronico" class="input" ' +
      'placeholder="Correo Electrónico" autocomplete="off"><br><br>' +
      '<label class="label"><b>Descripción del Servicio</b></label><br>' +
      '<textarea id="descripcionServicio" name="descripcionServicio" class="input inputext"' +
      'rows="4" placeholder="Descripción del Servicio"></textarea><br><br>' +
      '<input type="button" id="guardar" name="guardar" class="btn btnMedio" ' +
      'onClick="sendSupplier(event)" value="Guardar">&nbsp;&nbsp;&nbsp;&nbsp;' +
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


// Función para enviar los datos del formulario del proveedor
const sendSupplier = async (event) => {
  event.preventDefault();
  
  // Obtener los valores del formulario
  const tipo_servicio = document.getElementById("tipoServicio").value;
  const razon_social = document.getElementById("nombreProveedor").value;
  const descripcion = document.getElementById("descripcionServicio").value;
  const nombre_contacto = document.getElementById("contactoNombre").value;
  const celular = document.getElementById("contactoTelefono").value;
  const email = document.getElementById("correoElectronico").value;
  if (
    tipo_servicio == "" ||
    razon_social == "" ||
    descripcion == "" ||
    nombre_contacto == "" ||
    celular == "" ||
    email == ""
  ) {
    document.getElementById("info").innerHTML =
      "Todos los campos son obligatorio";
    setTimeout("document.getElementById('info').innerHTML  = ''", 3000);
    return;
  }
  try {
    const response = await axios.post("/api/newSupplier", {
      tipo_servicio,
      razon_social,
      descripcion,
      nombre_contacto,
      celular,
      email
    });
    console.log(response);
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


// FUNCTION LIST SUPPLIERS
const listSuppliers = async (event) => {
  event.preventDefault();
  document.getElementById("info").innerHTML = "Listando proveedores...";
  try {
    const response = await axios.get("/api/listSupplier");
    renderProvid(response);
    if (response.status === 201) {
      console.log("Listado de proveedores exitoso");
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
};


//RENDER JSON
function renderProvid(response) {
  cerrarSwal();
  const data = response.data;
  if (data && data.length > 0) {
    // Construir la tabla HTML para mostrar los datos
    let tableHtml =
      "<table id='tablaPQRS'>"+
      "<thead><tr>" +
      "<th>Razon social</th>" +
      "<th>Tipo servicio</th>" +
      "<th>Descripcion</th>" +
      "<th>Nombre contacto</th>" +
      "<th>Email</th>" +
      "<th>Celular</th>" +
      "<th>Gestion</th>" +
      "</tr></thead>"+
      "<tbody>";
    data.forEach((item) => {
      const descripcion = item.descripcion.replace(/\r?\n/g, '');
      tableHtml += `<tr>
      <td>${item.razon_social}</td>
      <td>${item.tipo_servicio}</td>
      <td>${item.descripcion}</td>
      <td>${item.nombre_contacto}</td>
      <td>${item.email}</td>
      <td>${item.celular}</td>
      <td><button
      type='button'
      class=''
      onclick='updatSupli(${item.id_proveedor}, "${item.tipo_servicio}", "${item.razon_social}",
      "${item.nombre_contacto}", "${item.celular}", "${item.email}",  "${descripcion}")'>
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
// form update or delete
const updatSupli = (id, ts, rz, nc, cell, email, des) => {
  const idp = id;
  const tsp = ts;
  const rzp = rz;
  const cellp = cell;
  const emailp = email;
  const ncp = nc;
  const desp = des;
  Swal.fire({
    html:
      '<br><br><center><form id="formPqrsAdmin" name="formPQRS" class="formSwal">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b id="titregcli" class="titulo">Gestionar proveedor</b></h2><br>' +
      '<button type="button" id="btnformProvi" name="btnformProvi" onClick="formUpdatSup'+
      '(' + idp + ', \'' + tsp + '\', \'' + rzp + '\', \'' + ncp + '\', \'' + cellp + '\', '+
      '\'' + emailp + '\', \'' + desp + '\')" ' +
      'class="btn ">Actualizar</button>&nbsp;&nbsp;&nbsp;&nbsp;' +
      '<button type="button" id="listarBtn" name="listarBtn" onClick="listSuppliers(event)"' +
      'class="btn btnMedio">Eliminar</button>&nbsp;&nbsp;&nbsp;&nbsp;' +
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

// FORM update SUPPLIER
let formUpdatSup = (id, ts, rz, nc, cell, email, des) => {
  const idp = id;
  const tsp = ts;
  const rzp = rz;
  const cellp = cell;
  const emailp = email;
  const ncp = nc;
  const desp = des;
  Swal.fire({
    html:
      '<br><br><center><form id="regprov" name="regprov" class="formSwal"' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b id="titregprov" class="titulo">Actualizar datos</b></h2><br>' +
      '<label class="label"><b>Tipo de Servicio</b></label><br>' +
      '<select id="ts" name="tipoServicio" class="input" title="Tipo de Servicio">' +
      "<option></option><option>Mantenimiento</option><option>Limpieza</option>" +
      "<option>Seguridad</option><option>Otros</option></select><br>" +
      '<label class="label"><b>Razon social</b></label><br>' +
      '<input type="text" id="rz" name="nombreProveedor" class="input"' +
      'placeholder="Nombre del Proveedor" autocomplete="off"><br>' +
      '<label class="label"><b>Nombre de Contacto</b></label><br>' +
      '<input type="text" id="cn" name="contactoNombre" class="input" ' +
      'placeholder="Nombre de Contacto" autocomplete="off"><br>' +
      '<label class="label"><b>celular</b></label><br>' +
      '<input type="text" id="cell" name="contactoTelefono" class="input"' +
      'placeholder="Teléfono de Contacto" autocomplete="off"><br>' +
      '<label class="label"><b>Email</b></label><br>' +
      '<input type="email" id="Email" name="Email" class="input" ' +
      'placeholder="Correo Electrónico" autocomplete="off"><br><br>' +
      '<label class="label"><b>Descripción del Servicio</b></label><br>' +
      '<textarea id="ds" name="descripcionServicio" class="input inputext"' +
      'rows="4" placeholder="Descripción del Servicio"></textarea><br><br>' +
      '<input type="button" id="guardar" name="guardar" class="btn btnMedio" ' +
      'onClick="updateSupplier('+ idp +')" value="Guardar">&nbsp;&nbsp;&nbsp;&nbsp;' +
      '<h3 id="info" class="titazul">.</h3>' +
      "</div>" +
      "</form></center><br><br>",
    width: "100%",
    background: "rgba(0,0,0,0.0)",
    backdrop: true,
    allowOutsideClick: false,
    showConfirmButton: false,
  });
  document.getElementById("ts").value = tsp;
  document.getElementById("rz").value = rzp;
  document.getElementById("cn").value = ncp ;
  document.getElementById("cell").value = cellp;
  document.getElementById("Email").value = emailp;
  document.getElementById("ds").value = desp;
};

// FUNCTION UPDATE SUPPLIER
const updateSupplier = async (id) => {
  //event.preventDefault();

  const id_proveedor = id
  const tipo_servicio = document.getElementById("ts").value;
  const razon_social = document.getElementById("rz").value;
  const nombre_contacto = document.getElementById("cn").value;
  const descripcion = document.getElementById("ds").value;
  const celular = document.getElementById("cell").value;
  const email = document.getElementById("Email").value;
  const ds = document.getElementById("ds").value;

  try {
    const response = await axios.put(`/api/updateSupplier/${id}`, {
      id_proveedor,
      tipo_servicio,
      razon_social,
      descripcion,
      nombre_contacto,
      celular,
      email
    });
    console.log(response);
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

    