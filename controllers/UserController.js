const { Op, where } = require("sequelize");
const { encryptPwd, decryptPwd } = require("../helpers/bcrypt");
const { tokenGenerator } = require("../helpers/jsonwebtoken");
const models = require("../models");
const user = models.user;
const deleteFile = require("../helpers/deleteFile");

class UserController {
  static async register(req, res) {
    try {
      let { username, name, email, password } = req.body;

      const cekEmail = await user.findOne({ where: { email: email } });

      if (cekEmail) {
        res.status(404).json({
          status: false,
          message: `${email} already registered!`,
        });
        return;
      }

      const result = await user.create({
        username,
        name,
        password: encryptPwd(password),
        email,
      });

      res.status(201).json({
        status: true,
        message: `${username} has been created!`,
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        error: "error register",
      });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      const result = await user.findOne({ where: { email } });

      if (!result) {
        res.status(404).json({
          status: false,
          message: `${email} not registered!`,
        });
        return;
      }

      if (decryptPwd(password, result.password)) {
        const access_token = tokenGenerator(result);
        res.status(202).json({
          status: true,
          message: "login successful",
          data: {
            id: result.id,
            username: result.username,
            name: result.name,
            foto: result.foto,
            access_token: access_token,
          },
        });
      } else {
        res.status(400).json({
          status: false,
          message: "invalid password!",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error,
      });
    }
  }

  static async detailUser(req, res) {
    try {
      console.log(req.userData);
      const email = req.userData.email;
      const result = await user.findOne({ where: { email: email } });

      res.status(201).json({
        status: true,
        message: `Success`,
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error,
      });
    }
  }

  static async changeFoto(req, res) {
    try {
      const email = req.userData.email;
      const _user = await user.findOne({ where: { email } });

      const foto = req.file.filename;

      const result = await user.update(
        {
          foto,
        },
        {
          where: { email },
        }
      );

      if (result[0] === 1) {
        deleteFile(_user.foto);

        const _result = await user.findOne({
          where: { email },
        });
        res.status(201).json({
          status: true,
          message: "update foto successful",
          data: {
            foto: _result.foto
          },
        });
      } else {
        res.status(400).json({
          status: false,
          message: "update foto unsuccessful",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error,
      });
    }
  }
}

module.exports = UserController;
