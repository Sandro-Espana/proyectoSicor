// FORM LIST OR REGIST SURVEY
const formOptionSurvey = () => {
  Swal.fire({
    html:
      '<br><br><center><form id="formPqrsAdmin" name="formPQRS" class="formSwal">' +
      '<div class="formulario-container">' +
      '<div class="cerrarX-container">' +
      '<p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>' +
      "</div>" +
      '<h2 class=""><b id="titregcli" class="titulo">Gestionar encuestas</b></h2><br>' +
      '<button type="button" id="btnRegister" name="btnRegister" onClick="formSuvery(event)"' +
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

//Formulario encuestas preguntas
let formSuvery = () => {
  Swal.fire({
    html: `<br><br><center><form id="formQuestions" class="formSwal">
    <div class="formulario-container">
      <div class = "cerrarX-container">
        
        <p id="cerrarX" class="cerrarX" onclick="cerrarSwal()"> X </p>
      </div>
          <h2>Encuesta</h2>
          <label class="label"><b>Fecha</b></label><br>
          <input type="datetime-local" id="fecha" name="fecha" class="input"  readonly required><br><br>
          <div id="question-container">
            <label class="label"><b>Pregunta</b></label><br>
            <input type="text" id="pregunta0" name="pregunta1" class="input" required><br><br>
          </div><br>
          <div class = "question-container">
          <input type="button" id="agregarPregunta" class="cerrarX" onclick="question()" value="+">
        </div>
          <input type="button" id="guardar" name="guardar" class="btn" onclick="registerQuestion()" value="Guardar">&nbsp;&nbsp;&nbsp;&nbsp;
          <h3 id="info" class="titazul">.</h3>
          </form></center><br><br>`,
    width: "100%",
    background: "rgba(0,0,0,0.0)",
    backdrop: true,
    allowOutsideClick: false,
    showConfirmButton: false,
  });

  document.getElementById("fecha").value = vfecha();
};

// MAS PREGUNTAS

const question = () => {
  const form = document.getElementById("formQuestions")
  const inputs = form.querySelectorAll("input[type=text]");
  const numInputs = inputs.length;

   const questionHtml =
   //validar que el input anterior este con pregunta y bloquear para editar la
    `<input type="text" id="pregunta${numInputs}" class="input" required><br><br>`
      const divQuestion = document.getElementById("question-container");
      
      divQuestion.insertAdjacentHTML("beforeend", questionHtml);
      const form1 = document.getElementById("formQuestions")
      console.log(form1)
}

const contarInputs = () => {
  const form = document.getElementById("formQuestions");
  const inputs = form.querySelectorAll("input[type=text], input[type=checkbox], input[type=radio], input[type=number], input[type=email], input[type=tel], input[type=date], input[type=time], input[type=datetime-local], input[type=file], input[type=range], input[type=password]");
  const numInputs = inputs.length;
  console.log("Número de inputs:", numInputs);
};

// FUNCTION FOR SENDING COMMON AREA FORM DATA
const registerQuestion = async () => {
 // 
  const date = document.getElementById("fecha").value;
  //const questions = document.getElementById("question-container").innerHTML;
  const valueQuestion = [];
  const form = document.getElementById("formQuestions")
  const inputs = form.querySelectorAll("input[type=text]");
  const numInputs = inputs.length;
  for (let i = 0; i < numInputs; i++) {
    console.log("pregunta" + i)
   let pregunta = document.getElementById("pregunta" + i).value;
   console.log(pregunta) 
   valueQuestion.push(pregunta)
   
  }
  console.log("Número de inputs:", valueQuestion)

  try {
    const response = await axios.post("/api/newCommonArea", {
     
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