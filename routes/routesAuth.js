<<<<<<< HEAD
=======
require("dotenv").config({ path: ".env" })
>>>>>>> desarrollo
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
<<<<<<< HEAD
const Usuario = require("../model/modelTbResident");
const util = require("util");
require("dotenv").config({ path: ".env" });
const findUserByUsernameAsync = util.promisify(Usuario.findUserByUsername);
const jwtKey = process.env.JWT_KEY;

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
=======
const jwtKey = process.env.JWT_KEY;
const { searchResidenByUsername } = require("../model/tbResident");


// LOGIN PATH
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await searchResidenByUsername(username); // SEARCH USER BY USERNAME

    // CHECK IF USER EXISTS
    if (!user) {
      return res.status(404).json({ error: "El usuario no existe" });
    }

    const passwordValido = await bcrypt.compare(password, user.password); // VERIFY PASSWORD
    if (!passwordValido) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    // GENERATE TOKEN
>>>>>>> desarrollo
    const token = jwt.sign({ usuarioId: user._id }, jwtKey, {
      expiresIn: "1h",
    });

<<<<<<< HEAD
    const userId = user._id;
    console.log("user userId: ", userId);

    // Determinar la redirección según el perfil del usuario
    let redirectTo = "/";
    if (user.profile === "Administrador") {
      redirectTo = "/admin";
    } else if (user.profile === "Residente") {
      redirectTo = "/residen";
    } else {
      redirectTo = "/normal";
    }

    // Enviar token y redirección al cliente
    return res.json({
      token: token,
      profile: user.Perfil,
      redirectTo: redirectTo,
      mensaje: "Inicio de sesión exitoso",
      userId: user._id,
=======
    // DELIVERY TO CUSTOMER idUser idUser
    idUser = user.id_resident;
    idApt = user.id_apartament;

    // DETERMINE REDIRECTION ACCORDING TO USER PROFILE
    let redirection = "/";
    if (user.Perfil === "administrador") {
      redirection = "/admin";
    } else if (user.profile === "residente") {
      redirection = "/residen";
    } else {
      redirection = "/normal";
    }

    // SEND TOKEN AND REDIRECT TO CUSTOMER
    return res.json({
      token: token,
      profile: user.profile,
      redirection: redirection,
      message: "Inicio de sesión exitoso",
      idUser: idUser,
      idApt: idApt,
>>>>>>> desarrollo
    });
  } catch (error) {
    console.error("Error en el servidor:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

<<<<<<< HEAD
// NO SE PARA QUE ES ESTA FUNCION
=======
// para cerrar sesion explicitamente
>>>>>>> desarrollo
router.post("/logout", (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }
  try {
<<<<<<< HEAD
    const decodedToken = jwt.verify(token, "secreto");
=======
    const decodedToken = jwt.verify(token, jwtKey);
>>>>>>> desarrollo
    res.json({ mensaje: "Cierre de sesión exitoso" });
  } catch (error) {
    console.error("Error al verificar el token:", error);
    res.status(401).json({ error: "Token inválido" });
  }
});

module.exports = router;
<<<<<<< HEAD
=======

/*
Path to receive the data from the login form and validate it with the data stored in the DB
Generates the token, redirects the user's page according to the profile and sends to al client the user
id an apartament
*/
>>>>>>> desarrollo
