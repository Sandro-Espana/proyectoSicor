// FORM LIST OR REGIST
const formSupplierList = () => {
  Swal.fire({
    html:
      '<br><br><center><form id="formPqrsAdmin" name="formPQRS" class="formSwal">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b id="titregcli" class="titulo">Gestionar proveedores</b></h2><br>' +
      '<button type="button" id="btnformProvi" name="btnformProvi" onClick="formSupplier(event)"' +
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

// REGISTER SUPPLIER FORM
let formSupplier = () => {
  Swal.fire({
    html:
      '<br><br><center><form id="regprov" name="regprov" class="formSwal"' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b id="titregprov" class="titulo">Registro de Proveedor</b></h2><br>' +
      '<label class="label"><b>Tipo de Servicio</b></label><br>' +
      '<select id="serviceType" name="serviceType" class="input" title="Tipo de Servicio">' +
      "<option></option><option>Mantenimiento</option><option>Limpieza</option>" +
      "<option>Seguridad</option><option>Otros</option></select><br>" +
      '<label class="label"><b>Tipo de contrato</b></label><br>' +
      '<select id="contractType" name="contractType" class="input" title="Tipo de Servicio">' +
      "<option></option><option>término indefinido</option><option> término fijo</option>" +
      "<option> obra labor</option><option>temporada</option><option>aprendizaje</option></select><br>" +
      '<label class="label"><b>Estado del contrato</b></label><br>' +
      '<select id="statusContract" name="statusContract" class="input" title="Tipo de Servicio">' +
      "<option></option><option>Nuevo</option><option>Renovado</option>" +
      "<option>Prorrogado</option>Modificado<option>Vencido</option></select><br>" +
      '<label class="label"><b>Numero de contrato</b></label><br>' +
      '<input type="text" id="contractNumber" name="contractNumber" class="input"' +
      'placeholder="Numero de contrato" autocomplete="off"><br>' +
      '<label class="label"><b>Fecha inicio</b></label><br>' +
      '<input type="text" id="startDate" name="startDate" class="input"' +
      'placeholder="Fecha inicio" autocomplete="off"><br>' +
      '<label class="label"><b>Fecha fin</b></label><br>' +
      '<input type="text" id="endDate" name="endDate" class="input"' +
      'placeholder="Fecha fin" autocomplete="off"><br>' +
      '<label class="label"><b>Costo anual</b></label><br>' +
      '<input type="text" id="annualValue" name="annualValue" class="input"' +
      'placeholder="Costo anual" autocomplete="off"><br>' +
      '<label class="label"><b>Costo mensual</b></label><br>' +
      '<input type="text" id="monthlyValue" name="monthlyValue" class="input"' +
      'placeholder="Costo mensual" autocomplete="off"><br>' +
      '<label class="label"><b>Razon social</b></label><br>' +
      '<input type="text" id="socialReason" name="socialReason" class="input"' +
      'placeholder="Razon social" autocomplete="off"><br>' +
      '<label class="label"><b>Nombre de Contacto</b></label><br>' +
      '<input type="text" id="contacName" name="contacName" class="input" ' +
      'placeholder="Nombre de Contacto" autocomplete="off"><br>' +
      '<label class="label"><b>Teléfono de Contacto</b></label><br>' +
      '<input type="text" id="mobile" name="mobile" class="input"' +
      'placeholder="Teléfono de Contacto" autocomplete="off"><br>' +
      '<label class="label"><b>Correo Electrónico</b></label><br>' +
      '<input type="email" id="email" name="email" class="input" ' +
      'placeholder="Correo Electrónico" autocomplete="off"><br><br>' +
      '<label class="label"><b>Descripción del Servicio</b></label><br>' +
      '<textarea id="description" name="description" class="input inputext"' +
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

// FUNCTION FOR SENDING SUPPLIER FORM DATA
const sendSupplier = async (event) => {
  event.preventDefault();

  const type_contract = document.getElementById("contractType").value;
  const monthly_value = document.getElementById("monthlyValue").value;
  const annual_value = document.getElementById("annualValue").value;
  const start_date = document.getElementById("startDate").value;
  const end_date = document.getElementById("endDate").value;
  const contract_number = document.getElementById("contractNumber").value;
  const contract_status = document.getElementById("statusContract").value;
  const social_reason = document.getElementById("socialReason").value;
  const service_type = document.getElementById("serviceType").value;
  const contac_name = document.getElementById("contacName").value;
  const mobile = document.getElementById("mobile").value;
  const description = document.getElementById("description").value;
  const email = document.getElementById("email").value;
  if (
    type_contract == "" ||
    monthly_value == "" ||
    annual_value == "" ||
    start_date == "" ||
    end_date == "" ||
    contract_number == "" ||
    service_type == "" ||
    contract_status == "" ||
    social_reason == "" ||
    contac_name == "" ||
    mobile == "" ||
    description == "" ||
    email == ""
  ) {
    document.getElementById("info").innerHTML =
      "Todos los campos son obligatorio";
    setTimeout("document.getElementById('info').innerHTML  = ''", 3000);
    return;
  }

  if (!validateEmail(email)) {
    document.getElementById("info").innerHTML =
      "Formato de correo electronico invalido";
    setTimeout("document.getElementById('info').innerHTML = ''", 4000);
    return;
  }
  try {
    const response = await axios.post("/api/newSupplier", {
      type_contract,
      monthly_value,
      annual_value,
      start_date,
      end_date,
      contract_number,
      service_type,
      contract_status,
      social_reason,
      contac_name,
      mobile,
      description,
      email,
    });
    if (response.status === 201) {
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
    console.log(response);
    if (response.status === 201) {
      renderSuppliers(response);
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
};

// ALERTA DE FECHA DE FINALIZACION DE CONTRATO

// RENDER JSON
function renderSuppliers(response) {
  cerrarSwal();
  const data = response.data;
  if (data && data.length > 0) {
    // BUIL THE HTML TABLE TO DISPLAY THE DATA
    let tableHtml =
      "<table id='tablaPQRS'>" +
      "<thead><tr>" +
      "<th>Razon social</th>" +
      "<th>Tipo servicio</th>" +
      "<th>Descripcion</th>" +
      "<th>Nombre contacto</th>" +
      "<th>Email</th>" +
      "<th>Celular</th>" +
      "<th>Gestion</th>" +
      "</tr></thead>" +
      "<tbody>";
    data.forEach((item) => {
      const descripcion = item.description.replace(/\r?\n/g, "");
      tableHtml += `<tr>
      <td>${item.social_reason}</td>
      <td>${item.service_type}</td>
      <td>${item.description}</td>
      <td>${item.contact_name}</td>
      <td>${item.email}</td>
      <td>${item.mobile}</td>
      <td><button
      type='button'
      class=''
      onclick='formUpdateSupplier(${item.id_supplier},
      "${item.service_type}",  "${item.type_contract}", "${item.contract_status}",
      "${item.contract_number}", "${item.start_date}", "${item.end_date}",
      "${item.annual_value}", "${item.monthly_value}","${item.social_reason}",
      "${item.contact_name}", "${item.mobile}", "${item.email}",  "${descripcion}")'>
      Gestionar
      </button></td>
      </tr>`;
    });
    //
    //
    tableHtml += "</tbody></table>";
    // RENDER TABLE
    document.getElementById("container-table").innerHTML = tableHtml;
    document.getElementById("searchInput").style.display = "block";
  } else {
    document.getElementById("container-table").innerHTML =
      "No hay datos disponibles.";
  }
}

const formUpdateSupplier = (
  id_supplier,
  service_type,
  type_contract,
  contract_status,
  contract_number,
  start_date,
  end_date,
  annual_value,
  monthly_value,
  social_reason,
  contact_name,
  mobile,
  email,
  descripcion
) => {
  console.log(type_contract, contract_status),
    Swal.fire({
      html:
        '<br><br><center><form id="regprov" name="regprov" class="formSwal"' +
        '<div class="formulario-container">' +
        '<div class="cerrarX-container">' +
        '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
        "</div>" +
        '<h2 class=""><b id="titregprov" class="titulo">Actualizar de Proveedor</b></h2><br>' +
        '<label class="label"><b>Tipo de Servicio</b></label><br>' +
        '<select id="serviceType" name="serviceType" class="input" title="Tipo de Servicio">' +
        "<option></option><option>Mantenimiento</option><option>Limpieza</option>" +
        "<option>Seguridad</option><option>Otros</option></select><br>" +
        '<label class="label"><b>Tipo de contrato</b></label><br>' +
        '<select id="contractType" name="contractType" class="input" title="Tipo de Servicio">' +
        "<option></option><option>término indefinido</option><option> término fijo</option>" +
        "<option> obra labor</option><option>temporada</option><option>aprendizaje</option></select><br>" +
        '<label class="label"><b>Estado del contrato</b></label><br>' +
        '<select id="statusContract" name="statusContract" class="input" title="Tipo de Servicio">' +
        "<option></option><option>Nuevo</option><option>Renovado</option>" +
        "<option>Prorrogado</option>Modificado<option>Vencido</option></select><br>" +
        '<label class="label"><b>Numero de contrato</b></label><br>' +
        '<input type="text" id="contractNumber" name="contractNumber" class="input"' +
        'placeholder="Numero de contrato" autocomplete="off"><br>' +
        '<label class="label"><b>Fecha inicio</b></label><br>' +
        '<input type="text" id="startDate" name="startDate" class="input"' +
        'placeholder="Fecha inicio" autocomplete="off"><br>' +
        '<label class="label"><b>Fecha fin</b></label><br>' +
        '<input type="text" id="endDate" name="endDate" class="input"' +
        'placeholder="Fecha fin" autocomplete="off"><br>' +
        '<label class="label"><b>Costo anual</b></label><br>' +
        '<input type="text" id="annualValue" name="annualValue" class="input"' +
        'placeholder="Costo anual" autocomplete="off"><br>' +
        '<label class="label"><b>Costo mensual</b></label><br>' +
        '<input type="text" id="monthlyValue" name="monthlyValue" class="input"' +
        'placeholder="Costo mensual" autocomplete="off"><br>' +
        '<label class="label"><b>Razon social</b></label><br>' +
        '<input type="text" id="socialReason" name="socialReason" class="input"' +
        'placeholder="Razon social" autocomplete="off"><br>' +
        '<label class="label"><b>Nombre de Contacto</b></label><br>' +
        '<input type="text" id="contacName" name="contacName" class="input" ' +
        'placeholder="Nombre de Contacto" autocomplete="off"><br>' +
        '<label class="label"><b>Teléfono de Contacto</b></label><br>' +
        '<input type="text" id="mobile" name="mobile" class="input"' +
        'placeholder="Teléfono de Contacto" autocomplete="off"><br>' +
        '<label class="label"><b>Correo Electrónico</b></label><br>' +
        '<input type="email" id="email" name="email" class="input" ' +
        'placeholder="Correo Electrónico" autocomplete="off"><br><br>' +
        '<label class="label"><b>Descripción del Servicio</b></label><br>' +
        '<textarea id="description" name="description" class="input inputext"' +
        'rows="4" placeholder="Descripción del Servicio"></textarea><br><br>' +
        '<input type="button" id="guardar" name="guardar" class="btn btnMedio" ' +
        'onClick="updateSupplier('+id_supplier+')" value="Guardar">&nbsp;&nbsp;&nbsp;&nbsp;' +
        '<h3 id="info" class="titazul">.</h3>' +
        "</div>" +
        "</form></center><br><br>",
      width: "100%",
      background: "rgba(0,0,0,0.0)",
      backdrop: true,
      allowOutsideClick: false,
      showConfirmButton: false,
    });

  document.getElementById("serviceType").value = service_type;
  document.getElementById("contractType").value = type_contract;
  document.getElementById("statusContract").value = contract_status;
  document.getElementById("contractNumber").value = contract_number;
  document.getElementById("startDate").value = start_date;
  document.getElementById("endDate").value = end_date;
  document.getElementById("annualValue").value = annual_value;
  document.getElementById("monthlyValue").value = monthly_value;
  document.getElementById("socialReason").value = social_reason;
  document.getElementById("contacName").value = contact_name;
  document.getElementById("mobile").value = mobile;
  document.getElementById("email").value = email;
  document.getElementById("description").value = descripcion;
};

// FUNCTION UPDATE SUPPLIER
const updateSupplier = async (id_supplier) => {
  
  const type_contract = document.getElementById("contractType").value;
  const monthly_value = document.getElementById("monthlyValue").value;
  const annual_value = document.getElementById("annualValue").value;
  const start_date = document.getElementById("startDate").value;
  const end_date = document.getElementById("endDate").value;
  const contract_number = document.getElementById("contractNumber").value;
  const contract_status = document.getElementById("statusContract").value;
  const social_reason = document.getElementById("socialReason").value;
  const service_type = document.getElementById("serviceType").value;
  const contac_name = document.getElementById("contacName").value;
  const mobile = document.getElementById("mobile").value;
  const description = document.getElementById("description").value;
  const email = document.getElementById("email").value;
  if (
    type_contract == "" ||
    monthly_value == "" ||
    annual_value == "" ||
    start_date == "" ||
    end_date == "" ||
    contract_number == "" ||
    service_type == "" ||
    contract_status == "" ||
    social_reason == "" ||
    contac_name == "" ||
    mobile == "" ||
    description == "" ||
    email == ""
  ) {
    document.getElementById("info").innerHTML =
      "Todos los campos son obligatorio";
    setTimeout("document.getElementById('info').innerHTML  = ''", 3000);
    return;
  }

  try {
    const response = await axios.put(`/api/updateSupplier/${id_supplier}`, {
      type_contract,
      monthly_value,
      annual_value,
      start_date,
      end_date,
      contract_number,
      service_type,
      contract_status,
      social_reason,
      contac_name,
      mobile,
      description,
      email,
    });
    if (response.status === 201) {
      console.log("Proveedor actualizado");
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

/*
This scrip contains the functions for creating, listing, searching, updating supplier data.
*/
