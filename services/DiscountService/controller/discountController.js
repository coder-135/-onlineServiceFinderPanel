const DiscountBusinessLogic = require('../businessLogic/discountBusinessLogic');
const Validator = require('../../../utility/validator');
const uuid = require('uuid');


class DiscountController {
  constructor() {
  }

  async addDiscount(req, res) {
    try {
      const inputData = {
        expirationDate: req.body.expirationDate,
        patternId: uuid.v4(),
        amount: req.body.amount,
        audience: req.body.audience
      }
      let result = await new DiscountBusinessLogic().addDiscount(inputData);
      res.status(200).send(result);

    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: 'fail',
        data: err.data ? err.data : {message: err.message}
      });
    }
  }

  async getDiscount(req, res) {
    try {
      let result;
      if (!req.query.all && !req.query.patternId) {
        throw {
          status: 400,
          data: {
            message: 'پارامتر های ورودی بررسی شود'
          }
        }
      }
      if (req.query.all) {
        result = await new DiscountBusinessLogic().getAllDiscounts();
        res.status(200).send(result);
      } else {
        result = await new DiscountBusinessLogic().getDiscount({patternId: req.query.patternId});
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


  async deleteDiscount(req, res) {
    try {
      let inputData = {};
      if (!req.query.userId && !req.query.patternId) {
        throw {
          data: {
            message: 'شتاسه ارسال نشده است'
          }
        }
      }
      if (req.query.userId) {
        inputData.userId = req.query.userId
      } else {
        inputData.patternId = req.query.patternId
      }
      let result = await new DiscountBusinessLogic().deleteDiscount(inputData);
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

module.exports = DiscountController;