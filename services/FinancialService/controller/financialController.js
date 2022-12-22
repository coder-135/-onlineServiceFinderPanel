const FinancialBusinessLogic = require('../businessLogic/financialBusinessLogic');
const Validator = require('../../../utility/validator');
const moment = require('moment-jalaali');


class FinancialController {
  constructor() {
  }

  async getStock(req, res) {
    try {
      let result;
      if (!req.query.id) {
        throw {
          status: 400,
          data: {
            message: 'شناسه ارسال نشده است'
          }
        }
      }
      result = await new FinancialBusinessLogic().getStock({id: req.query.id});
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: 'fail',
        data: err.data ? err.data : {message: err.message}
      });
    }
  }

  async getFactors(req, res) {
    try {
      let result;
      if (!req.query.all && !req.query.ownerId) {
        throw {
          status: 400,
          data: {
            message: 'پارامتر های ورودی بررسی شود'
          }
        }
      }
      if (req.query.all)
        result = await new FinancialBusinessLogic().getAllFactors(req.query);
      else
        result = await new FinancialBusinessLogic().getFactors(req.query);

      res.status(200).send(result);

    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: 'fail',
        data: err.data ? err.data : {message: err.message}
      });
    }
  }

  async income(req, res) {
    try {
      const inputData = {
        startDate : req.query.startDate || moment().format('jYYYYjMMjDD'),
        endDate : req.query.endDate || moment().format('jYYYYjMMjDD'),
        ownerId : req.query.ownerId || 'hive'
      };
      let result = await new FinancialBusinessLogic().income(inputData);
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

module.exports = FinancialController;