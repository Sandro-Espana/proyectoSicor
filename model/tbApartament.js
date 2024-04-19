const connection = require("../DB/dbMysql"); // Importa el módulo MySQL


// FUNCTION TO CONSULT PARKING EXISTS AT tb_apartament
const validateParking = (parking) => {
  return new Promise((resolve, reject) => {
    const sql =  "SELECT * FROM tb_apartament WHERE parking = ?";
    connection.query(sql,[parking], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};


// SEARCH APARTAMENT IN tb_apartament BY id_apt
const searchAptById = (idApt) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM tb_apartament  WHERE id_apt = ?";
    connection.query(sql, [idApt], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};

// DELETE THE DATA FROM THE tb_apartament
const eliminarDatosTablaApartamentos = () => {
  const sql = "DELETE FROM tb_apartament";

  connection.query(sql, (err, result) => {
    if (err) {
      console.error("Error al eliminar datos de tb_apartamentos:", err);
      return;
    }
    console.log("Datos de tb_apartamentos eliminados correctamente");
  });
};

//eliminarDatosTablaApartamentos()

// FUNCTION TO GENERATE DATA tb_apartament
function generarDatosApartamentos() {
  const torres = 6;
  const pisosPorTorre = 16;
  const apartamentosPorPiso = 8;
  const totalApartamentosPorTorre = pisosPorTorre * apartamentosPorPiso;
  const totalApartamentos = torres * totalApartamentosPorTorre;
  const apartamentos = [];

  // Iterar sobre cada torre
  for (let torre = 1; torre <= torres; torre++) {
    // Iterar sobre cada piso
    for (let piso = 1; piso <= pisosPorTorre; piso++) {
      // Iterar sobre cada apartamento en el piso
      for (
        let numeroApartamento = 1;
        numeroApartamento <= apartamentosPorPiso;
        numeroApartamento++
      ) {
        // Generar el ID del apartamento
        const idApt = `${torre}${piso}${numeroApartamento}`;

        // Generar el número de parqueadero consecutivo
        const parking =
          (torre - 1) * totalApartamentosPorTorre +
          (piso - 1) * apartamentosPorPiso +
          numeroApartamento;

        // Agregar los datos del apartamento al arreglo
        apartamentos.push({
          id_apt: idApt,
          tower: torre,
          apartament: numeroApartamento,
          parking: parking,
        });
      }
    }
  }

  return apartamentos;
}

// FUNCTION TO INSERT DATA INTO tb_apartament
const createUnitResiden = (data) => {
    const apartamentos = generarDatosApartamentos();
    console.log(apartamentos)
    connection.query(
      "INSERT INTO tb_apartament (id_apt, tower, apartament, parking) VALUES ?",
      [
        apartamentos.map((apartamento) => [
          apartamento.id_apt,
          apartamento.tower,
          apartamento.apartament,
          apartamento.parking,
        ]),
      ],
    );
};

//createUnitResiden()

module.exports = {
  validateParking,
  searchAptById,
};
