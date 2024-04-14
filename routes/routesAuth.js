require("dotenv").config({ path: ".env" })
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
    const token = jwt.sign({ usuarioId: user._id }, jwtKey, {
      expiresIn: "1h",
    });

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
    });
  } catch (error) {
    console.error("Error en el servidor:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// para cerrar sesion explicitamente
router.post("/logout", (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }
  try {
    const decodedToken = jwt.verify(token, jwtKey);
    res.json({ mensaje: "Cierre de sesión exitoso" });
  } catch (error) {
    console.error("Error al verificar el token:", error);
    res.status(401).json({ error: "Token inválido" });
  }
});

module.exports = router;

/*
Path to receive the data from the login form and validate it with the data stored in the DB
Generates the token, redirects the user's page according to the profile and sends to al client the user
id an apartament
*/