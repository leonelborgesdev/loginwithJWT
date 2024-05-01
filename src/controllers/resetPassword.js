const { request, response } = require("express");
const { UserModel } = require("../models");
const sendMailResetPassword = require("../helpers/sendMailResetPassword.js");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const resetPasswordMail = async (req = request, res = response) => {
  const { email } = req.body;
  const token = req.header("x-token");
  console.log("Controller", email);
  try {
    const user = await UserModel.findOne({
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
