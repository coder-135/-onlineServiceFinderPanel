const AdminBusinessLogic = require('../businessLogic/adminBusinessLogic');
const Validator = require('../../../utility/validator');
const {adminSchema} = require('../../../utility/schema');

class AdminController {
  constructor() {
  }

  async login(req, res) {
    try {
      await new Validator().validate(req.body, adminSchema);
      const inputData = {
        username: req.body.username,
        password: req.body.password
      };
      let result = await new AdminBusinessLogic().login(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: 'fail',
        data: err.data ? err.data : err.message
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
        data: err.data ? err.data : err.message
      });
    }
  }

}

module.exports = AdminController;