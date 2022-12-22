const AgentBusinessLogic = require('../businessLogic/agentBusinessLogic');
const Validator = require('../../../utility/validator');
const {agentSchema} = require('../../../utility/schema');
const uuid = require("uuid");
const moment = require("moment-jalaali");

class AgentController {
  constructor() {
  }

  async addAgent(req, res) {
    try {
      await new Validator().validate(req.body, agentSchema);
      const inputData = {
        fullName: req.body.fullName,
        phoneNumber: req.body.phoneNumber,
        nationalId: req.body.nationalId,
        birthDate: req.body.birthDate,
        maritalStatus: req.body.maritalStatus,
        skills: req.body.skills,
        landline: req.body.landline,
        address: req.body.address,
        geoLocation: {lat: +req.body.lat, lng: +req.body.lng},
        fatherName: req.body.fatherName,
        gender: req.body.gender,
        role: 'agent',
        avatarUrl: 'https://hive1400.ir/uploads/avatars/880bcef8-2037-4890-8dbe-730d903e6f00.jpg',
        password: req.body.password,
        serviceCounter: 0,
        amazingServiceCounter: 0,
        totalRates: 0,
        raterCount: 0,
        rate: 0,
        status: false,
        paymentStatus: false,
        categoryIds: req.body.categoryIds || null,
        ip: 'admin-' + req.headers["x-real-ip"] || req.ip
      };

      let result = await new AgentBusinessLogic().addAgent(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: "fail",
        data: err.data ? err.data : {message: err.message}
      });
    }
  }

  async getAgent(req, res) {
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
        result = await new AgentBusinessLogic().getAllAgents();
        res.status(200).send(result);
      } else {
        result = await new AgentBusinessLogic().getAgent({id: req.query.id});
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

  async updateAgent(req, res) {
    try {
      if (!req.body.agentId) {
        throw {
          status: 400,
          data: {
            message: 'شناسه ارسال نشده است'
          }
        }
      }
      const inputData = req.body;
      if (inputData.lat && inputData.lng) {
        inputData.geoLocation = {
          lat: inputData.lat,
          lng: inputData.lng
        };
        delete inputData.lat;
        delete inputData.lng;
      }
      let result = await new AgentBusinessLogic().updateAgent(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: "fail",
        data: err.data ? err.data : {message: err.message}
      });
    }
  }

  async updateAgentStatus(req, res) {
    try {
      if (!req.body.agentId) {
        throw {
          status: 400,
          data: {
            message: 'شناسه ارسال نشده است'
          }
        }
      }
      const inputData = {
        agentId: req.body.agentId,
        status: req.body.status
      }
      let result = await new AgentBusinessLogic().updateAgentStatus(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: "fail",
        data: err.data ? err.data : {message: err.message}
      });
    }
  }

  async deleteAgent(req, res) {
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
        agentId: req.query.id
      }
      let result = await new AgentBusinessLogic().deleteAgent(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: "fail",
        data: err.data ? err.data : {message: err.message}
      });
    }
  }

}

module.exports = AgentController;