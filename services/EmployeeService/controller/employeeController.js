const EmployeeBusinessLogic = require('../businessLogic/employeeBusinessLogic');
const Validator = require('../../../utility/validator');
const uuid = require('uuid');
const {adminSchema} = require("../../../utility/schema");
const bcrypt = require("bcrypt");


class EmployeeController {
  constructor() {
  }

  async login(req, res) {
    try {
      await new Validator().validate(req.body, adminSchema);
      const inputData = {
        username: req.body.username,
        password: req.body.password,
        ip: req.headers['x-real-ip'] || req.ip
      };
      let result = await new EmployeeBusinessLogic().login(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: 'fail',
        data: err.data ? err.data : {message: err.message}
      });
    }
  }

  async logout(req, res) {
    try {
      const header = req.headers;
      if (!header.hasOwnProperty.call(header, 'refresh-token')) {
        throw {
          message: 'کاربر لاگین نیست یا توکن ارسال نشده است'
        }
      }
      res.removeHeader('refresh-token');
      if (header.hasOwnProperty.call(header, 'access-token')) {
        res.removeHeader('access-token');
      }

      res.status(200).send({
        status: 'success',
        data: {
          message: 'کاربر با موفقیت از سامانه خارج شد'
        }
      });
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: 'fail',
        data: err.data ? err.data : {message: err.message}
      });
    }
  }


  async addEmployee(req, res) {
    try {
      //todo add validation
      const inputData = {
        fullName: req.body.fullName,
        phoneNumber: req.body.phoneNumber,
        username: req.body.username,
        id: uuid.v4(),
        nationalId: req.body.nationalId,
        personnelCode: req.body.personnelCode,
        birthDate: req.body.birthDate,
        landline: req.body.landline,
        role: req.body.role,
        avatarUrl: 'https://hive1400.ir/uploads/avatars/880bcef8-2037-4890-8dbe-730d903e6f00.jpg',
        password: req.body.password,
        registerDate: req.body.registerDate,
        ipStatus: false,
        ip: null
      }
      const salt = await bcrypt.genSalt(10);
      inputData.password = await bcrypt.hash(inputData.password, salt);
      let result = await new EmployeeBusinessLogic().addEmployee(inputData);
      res.status(200).send(result);

    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: 'fail',
        data: err.data ? err.data : {message: err.message}
      });
    }
  }

  async getEmployee(req, res) {
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
        result = await new EmployeeBusinessLogic().getAllEmployees();
        res.status(200).send(result);
      } else {
        result = await new EmployeeBusinessLogic().getEmployee({id: req.query.id});
        res.status(200).send(result);
      }
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: 'fail',
        data: err.data ? err.data : {message: err.message}
      });
    }
  }

  async updateEmployee(req, res) {
    try {
      if (!req.body.id) {
        throw {
          status: 400,
          data: {
            message: 'شناسه کاربر ارسال نشده است'
          }
        }
      }
      const inputData = req.body;
      let result = await new EmployeeBusinessLogic().updateEmployee(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: 'fail',
        data: err.data ? err.data : {message: err.message}
      });
    }
  }

  async updateAvatar(req, res) {
    try {
      if (!req.file) throw {
        status: 400,
        data: {message: 'عکسی انتخاب نشده است'}
      }
      const inputData = {
        avatarUrl: `http://hivepanell.ir/uploads/employee/${req.file.filename}`,
        id: req.body.id
      }
      let result = await new EmployeeBusinessLogic().updateEmployee(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: 'fail',
        data: err.data ? err.data : {message: err.message}
      });
    }
  }

  async deleteEmployee(req, res) {
    try {
      if (!req.query.id) {
        throw {
          data: {
            message: 'شتاسه ارسال نشده است'
          }
        }
      }
      const inputData = {
        id: req.query.id
      }
      let result = await new EmployeeBusinessLogic().deleteEmployee(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: 'fail',
        data: err.data ? err.data : {message: err.message}
      });
    }
  }

}

module.exports = EmployeeController;