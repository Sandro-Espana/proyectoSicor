const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
    const token = jwt.sign({ usuarioId: user._id }, jwtKey, {
      expiresIn: "1h",
    });

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
