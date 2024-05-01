const { request, response } = require("express");
const sequelize = require("../db");
const User = require("../models/User.js")(sequelize);
const sendMailResetPassword = require("../helpers/sendMailResetPassword.js");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const resetPasswordMail = async (req = request, res = response) => {
  const { email } = req.body;
  const token = req.header("x-token");
  console.log("Controller", email);
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    console.log("Controller", user);

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "El correo del usuario no existe en la Base de Datos",
      });
    }

    const link = `${process.env.URL_BASE}#/resetPassword/${user.id}/${token}`;

    //const link = `http://localhost:3000/#/resetPassword/${user.id}/${token}`
    await sendMailResetPassword(
      email,
      "Cambio de Contraseña",
      `Da clic al siguiente enlace
        para modificar tu contraseña -> ${link}`
    );

    res.json({
      ok: true,
      msg: "Correo enviado, revisa tu bandeja",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const resetPassword = async (req = request, res = response) => {
  const { idUser, password } = req.body;
  const token = req.header("Authorization");

  console.log("Body", idUser, token, password);
  try {
    const user = await User.findByPk(idUser);
    console.log("User", user);
    if (!user) {
      return res.status(400).send("Usuario Invalido");
    }
    if (token) {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      console.log("entre");
      console.log(decoded);
      if (!decoded) {
        return res.status(401).json({
          msg: "Token Invalido",
        });
      }
    }
    const hash = bcryptjs.hashSync(password, 10);
    const newPassword = await user.update({
      password: hash,
    });
    console.log(newPassword);
    res.json({
      ok: true,
      msg: "Contraseña cambiada con exito",
    });
    res.json({
      ok: true,
      msg: "Contraseña cambiada con exito",
    });
  } catch (error) {
    console.log(error);
    res.json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  resetPasswordMail,
  resetPassword,
};
