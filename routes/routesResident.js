const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Usuario = require("../model/modelResident");
const util = require("util");
const findUserByUsernameAsync = util.promisify(Usuario.findUserByUsername);


// REGISTER USER IN DB
router.post("/registro", async (req, res) => {
  try {
    if (
      !req.body.namer ||
      !req.body.usernamer ||
      !req.body.passwordr ||
      !req.body.lastname ||
      !req.body.cedula ||
      !req.body.mobile ||
      !req.body.torre ||
      !req.body.apt
    ) {
      return res
        .status(400)
        .json({ error: "Por favor, proporciona todos los campos requeridos." });
    }
    //BUSCAR USER POR NOMBRE
    Usuario.findUserByUsername(req.body.usernamer, (error, existingUser) => {
      if (error) {
        console.error("Error al buscar usuario:", error);
        return res
          .status(500)
          .json({ error: "Error en el servidor al buscar usuario." });
      }
      if (existingUser) {
        return res
          .status(400)
          .json({ error: "El nombre de usuario ya está en uso." });
      }
      //HASH PASSWORD
      bcrypt.hash(req.body.passwordr, 12, async (err, hashedPassword) => {
        if (err) {
          console.error("Error al hashear contraseña:", err);
          return res
            .status(500)
            .json({ error: "Error en el servidor al hashear contraseña." });
        }

        //CREO NEW USER
        const newUsuario = {
          ResidenteID: req.body.cedula,
          NombreCompleto: req.body.namer,
          Apellido: req.body.lastname,
          cedula: req.body.cedula,
          NumeroContacto: req.body.mobile,
          username: req.body.usernamer,
          password: hashedPassword,
        };
        console.log(newUsuario);

        //INSERT USER IN TABLE
        Usuario.createUser(newUsuario, (error, userId) => {
          if (error) {
            console.error("Error al registrar el usuario:", error);
            return res
              .status(500)
              .json({ error: "Error al registrar el usuario." });
          }
          console.log("Registrado con éxito");
          res
            .status(201)
            .json({ mensaje: "Usuario registrado correctamente." });
        });

        //Datos unidad_residenciales
        const formData = {
          UnidadResidencialID: `${req.body.torre}_${req.body.apt}`,
        };
        console.log("unid-residencial: ", formData);
        Usuario.saveFormData(formData, (error, insertId) => {
          if (error) {
            console.error("Error al guardar los datos del formulario:", error);
          } else {
            console.log(
              "Los datos del formulario se han guardado correctamente. ID:",
              insertId
            );
          }
        });
      });
    });
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    res.status(500).json({ error: "Error al registrar el usuario." });
  }
});

// GET ALL USERS FROM DB
router.get("/listUsers", async (req, res) => {
  try {
    Usuario.listUsers((error, users) => {
      if (error) {
        console.error("Error en la solicitud: ", error);
        res.status(500).json({ error: error.message });
      } else {
        res.json(users);
        console.log("Listado de usuarios: ", users);
      }
    });
  } catch (error) {
    console.log("Error en la solicitud:", error);
    res.status(500).json({ error: error.message });
  }
});


// REMOVE USER FROM DB
router.delete("/deleteUser/:id", async (req, res) => {
  const usuarioId = req.params.id;
  if (req.user && req.user.profile === "admin") {
    try {
      const usuario = await Usuario.findUserById(usuarioId);
      if (!usuario) {
        return res.status(404).json({ error: "El usuario no existe" });
      }
      await Usuario.deleteUser(usuarioId);
      res.json({ mensaje: "Usuario eliminado exitosamente" });
    } catch (error) {
      console.error("Error en el servidor:", error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  }
});



// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await findUserByUsernameAsync(username); // Buscar usuario por nombre de usuario
    console.log("user: ", user);
    // Comprobar si el usuario existe
    if (!user) {
      console.log("El usuario no existe");
      return res.status(404).json({ error: "El usuario no existe" });
    }

    const passwordValido = await bcrypt.compare(password, user.password); // Verificar la contraseña
    if (!passwordValido) {
      console.log("Contraseña incorrecta");
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    // Generar token
    const token = jwt.sign({ usuarioId: user._id }, "secreto", {
      expiresIn: "1h",
    });
    console.log("token: ", token);

    // Determinar la redirección según el perfil del usuario
    let redirectTo = "/";
    if (user.profile === "Administrador") {
      redirectTo = "/admin";
    } else if (user.profile === "Residente") {
      redirectTo = "/residen";
    } //else {
    // redirectTo = "/normal";
    // }
    console.log("redirectTo: ", redirectTo);
    // Enviar token y redirección al cliente
    return res.json({
      token: token,
      profile: user.Perfil,
      redirectTo: redirectTo,
      mensaje: "Inicio de sesión exitoso",
    });
  } catch (error) {
    console.error("Error en el servidor:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});


// NO SE PARA QUE ES ESTA FUNCION
router.post("/logout", (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }
  try {
    const decodedToken = jwt.verify(token, "secreto");
    res.json({ mensaje: "Cierre de sesión exitoso" });
  } catch (error) {
    console.error("Error al verificar el token:", error);
    res.status(401).json({ error: "Token inválido" });
  }
});

module.exports = router;

//Funciones para:
//REGISTRO
//LOGIN
//ELIMINAR
//logout