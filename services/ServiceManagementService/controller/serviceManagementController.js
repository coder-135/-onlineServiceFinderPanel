const ServiceManagementBusinessLogic = require('../businessLogic/serviceManagementBusinessLogic');
const Validator = require('../../../utility/validator');
const uuid = require('uuid');


class ServiceManagementController {
  constructor() {
  }

  async getAllServices(req, res) {
    try {

      let result = await new ServiceManagementBusinessLogic().getAllServices();
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: "fail",
        data: err.data ? err.data : {message: err.message}
      });
    }
  }
  async singleService(req, res) {
    try {
      if (!req.query.serviceCode) {
        throw {
          data: {
            message: 'کد سرویس ارسال نشده است'
          }
        }
      }
      const inputData = {serviceCode: req.query.serviceCode};
      let result = await new ServiceManagementBusinessLogic().singleService(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: "fail",
        data: err.data ? err.data : {message: err.message}
      });
    }
  }


  async historyService(req, res) {
    try {
      let inputData = {};
      if (!req.query.agentId && !req.query.userId) {
        throw {
          data: {
            message: 'شناسه کارگذار یا کاربر ارسال نشده است'
          }
        }
      }
      if (req.query.agentId) {
        inputData.agentId = req.query.agentId
      } else {
        inputData.userId = req.query.userId
      }

      let result = await new ServiceManagementBusinessLogic().historyService(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: "fail",
        data: err.data ? err.data : {message: err.message}
      });
    }
  }


  async getVipReserved(req, res) {
    try {
      let result = await new ServiceManagementBusinessLogic().getVipReserved();
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: 'fail',
        data: err.data ? err.data : {message: err.message}
      });
    }
  }
  async updateVipReserved(req, res) {
    try {
      if (!req.body.serviceCode) {
        throw {
          data: {
            message: 'کد سرویس ارسال نشده است'
          }
        }
      }
      const inputData = {
        serviceCode: req.body.serviceCode,
        state: 2,
        operatorStatus: true
      };
      let result = await new ServiceManagementBusinessLogic().updateVipReserved(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: 'fail',
        data: err.data ? err.data : {message: err.message}
      });
    }
  }
  async updateVipServices(req, res) {
    try {
      if (!req.body.serviceCode) {
        throw {
          data: {
            message: 'کد سرویس ارسال نشده است'
          }
        }
      }
      const inputData = {
        serviceCode: req.body.serviceCode,
        state: 2,
        operatorStatus: true
      };
      let result = await new ServiceManagementBusinessLogic().updateVipServices(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: 'fail',
        data: err.data ? err.data : {message: err.message}
      });
    }
  }

  async getVipServices(req, res) {
    try {
      let result = await new ServiceManagementBusinessLogic().getVipServices();
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

module.exports = ServiceManagementController;