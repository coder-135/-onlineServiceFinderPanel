const UserBusinessLogic = require('../businessLogic/userBusinessLogic');
const Validator = require('../../../utility/validator');
const {userSchema} = require("../../../utility/schema");

class UserController {
  constructor() {
  }


  async addUser(req, res) {
    try {
      await new Validator().validate(req.body, userSchema);
      const inputData = {
        fullName: req.body.fullName,
        phoneNumber: req.body.phoneNumber,
        nationalId: req.body.nationalId,
        birthDate: req.body.birthDate,
        fatherName: req.body.fatherName,
        gender: req.body.gender,
        role: 'user',
        avatarUrl:'https://hive1400.ir/uploads/avatars/880bcef8-2037-4890-8dbe-730d903e6f00.jpg',
        serviceCounter: 0,
        totalRates : 0,
        raterCount : 0,
        rate : 0,
        VIP:[],
        password: req.body.password,
        ip : 'admin-'+ req.headers["x-real-ip"] || req.ip
      };
      let result = await new UserBusinessLogic().addUser(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: "fail",
        data: err.data ? err.data : {message: err.message}
      });
    }
  }

  async getUser(req, res) {
    try {
      let result;
      if (!req.query.all && !req.query.id) {
        throw {
          status: 400,
          data: {
            message: 'پارامتر های ورودی بررسی شود'
          }
        }
      }
      if (req.query.all) {
        result = await new UserBusinessLogic().getAllUsers();
        res.status(200).send(result);
      } else {
        result = await new UserBusinessLogic().getUser({id: req.query.id});
        res.status(200).send(result);
      }
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: "fail",
        data: err.data ? err.data : {message: err.message}
      });
    }
  }

  async updateUser(req, res) {
    try {
      if (!req.body.userId) {
        throw {
          status: 400,
          data: {
            message: 'شناسه ارسال نشده است'
          }
        }
      }
      const inputData = req.body;
      let result = await new UserBusinessLogic().updateUser(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: "fail",
        data: err.data ? err.data : {message: err.message}
      });
    }
  }

  async deleteUser(req, res) {
    try {
      if (!req.query.id) {
        throw {
          status: 400,
          data: {
            message: 'شناسه ارسال نشده است'
          }
        }
      }
      const inputData = {
        userId: req.query.id
      }
      let result = await new UserBusinessLogic().deleteUser(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: "fail",
        data: err.data ? err.data : {message: err.message}
      });
    }
  }







  async deleteAllUsers(req, res) {
    try {
      let result = await new UserBusinessLogic().deleteAllUsers();
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: "fail",
        data: err.data ? err.data : err.message
      });
    }
  }

  async deleteAgents(req, res) {
    try {
      let result = await new UserBusinessLogic().deleteAgents();
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: "fail",
        data: err.data ? err.data : err.message
      });
    }
  }


}

module.exports = UserController;