const MissionBusinessLogic = require('../businessLogic/missionBusinessLogic');
const Validator = require('../../../utility/validator');
const uuid = require('uuid');


class MissionController {
  constructor() {
  }

  async addMission(req, res) {
    try {
      const inputData = {
        title: req.body.title,
        description: req.body.description,
        categoryId: req.body.categoryId,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        value: req.body.value,
        count: req.body.count,
        id: uuid.v4()
      }

      let result = await new MissionBusinessLogic().addMission(inputData);
      res.status(200).send(result);

    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: 'fail',
        data: err.data ? err.data : {message: err.message}
      });
    }
  }

  async getMission(req, res) {
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
        result = await new MissionBusinessLogic().getAllMissions();
        res.status(200).send(result);
      } else {
        result = await new MissionBusinessLogic().getMission({id: req.query.id});
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

  async updateMission(req, res) {
    try {
      if (!req.body.id) {
        throw {
          status: 400,
          data: {
            message: 'پارامتر های ورودی بررسی شود'
          }
        }
      }
      const inputData = req.body;
      let result = await new MissionBusinessLogic().updateMission(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: 'fail',
        data: err.data ? err.data : {message: err.message}
      });
    }
  }


  async deleteMission(req, res) {
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
      let result = await new MissionBusinessLogic().deleteMission(inputData);
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

module.exports = MissionController;