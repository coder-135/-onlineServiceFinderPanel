const PricingBusinessLogic = require('../businessLogic/pricingBusinessLogic');
const Validator = require('../../../utility/validator');
const {districtPriceSchema} = require('../../../utility/schema');
const uuid = require('uuid');

class PricingController {
  constructor() {
  }

  async addDistrictPrice(req, res) {
    try {
      await new Validator().validate(req.body, districtPriceSchema);

      const inputData = {
        city: req.body.city,
        district: +req.body.district,
        costType: +req.body.costType,
        distance: +req.body.distance,
        id: uuid.v4()
      }
      let result = await new PricingBusinessLogic().addDistrictPrice(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: 'fail',
        data: err.data ? err.data : {message: err.message}
      });
    }
  }
  async addRegionalizedCities(req, res) {
    try {
      const inputData = {
        city: req.body.city,
        id: uuid.v4()
      }
      let result = await new PricingBusinessLogic().addRegionalizedCities(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: 'fail',
        data: err.data ? err.data : {message: err.message}
      });
    }
  }
  async getRegionalizedCities(req, res) {
    try {
      let result = await new PricingBusinessLogic().getRegionalizedCities();
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: 'fail',
        data: err.data ? err.data : {message: err.message}
      });
    }
  }
  async deleteRegionalizedCities(req, res) {
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
      let result = await new PricingBusinessLogic().deleteRegionalizedCities(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: 'fail',
        data: err.data ? err.data : {message: err.message}
      });
    }
  }

  async getDistrictPrice(req, res) {
    try {
      let result;
      if (!req.query.all && !req.query.city) {
        throw {
          status: 400,
          data: {
            message: 'پارامتر های ورودی بررسی شود'
          }
        }
      }
      if (req.query.all) {
        result = await new PricingBusinessLogic().getAllDistrictPrice();
        res.status(200).send(result);
      } else {
        result = await new PricingBusinessLogic().getDistrictPrice({city: req.query.city});
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

  async updateDistrictPrice(req, res) {
    try {
      if (!req.body.id) {
        throw {
          data: {
            message: 'شتاسه ارسال نشده است'
          }
        }
      }
      const inputData = req.body;
      let result = await new PricingBusinessLogic().updateDistrictPrice(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: 'fail',
        data: err.data ? err.data : {message: err.message}
      });
    }
  }

  async deleteDistrictPrice(req, res) {
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
      let result = await new PricingBusinessLogic().deleteDistrictPrice(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: 'fail',
        data: err.data ? err.data : {message: err.message}
      });
    }
  }



  async addCategoryPrice(req, res) {
    try {
      const inputData = {
        id: req.body.id,
        name: req.body.name,
        cost: +req.body.cost
      }
      let result = await new PricingBusinessLogic().addCategoryPrice(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: 'fail',
        data: err.data ? err.data : {message: err.message}
      });
    }
  }

  async getCategoryPrice(req, res) {
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
        result = await new PricingBusinessLogic().getAllCategoryPrice();
        res.status(200).send(result);
      } else {
        result = await new PricingBusinessLogic().getCategoryPrice({id: req.query.id});
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

  async updateCategoryPrice(req, res) {
    try {
      if (!req.body.id) {
        throw {
          data: {
            message: 'شتاسه ارسال نشده است'
          }
        }
      }
      const inputData = req.body;
      let result = await new PricingBusinessLogic().updateCategoryPrice(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: 'fail',
        data: err.data ? err.data : {message: err.message}
      });
    }
  }

  async deleteCategoryPrice(req, res) {
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
      let result = await new PricingBusinessLogic().deleteCategoryPrice(inputData);
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

module.exports = PricingController;