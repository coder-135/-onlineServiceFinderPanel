const SurveyBusinessLogic = require('../businessLogic/surveyBusinessLogic');
const Validator = require('../../../utility/validator');
const uuid = require('uuid');


class SurveyController {
  constructor() {
  }

  async getSurvey(req, res) {
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
      if (req.query.all)
        result = await new SurveyBusinessLogic().getAllSurvey();
      else
        result = await new SurveyBusinessLogic().getSurvey({id: req.query.id});
      res.status(200).send(result);

    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: 'fail',
        data: err.data ? err.data : {message: err.message}
      });
    }
  }

  async updateSurvey(req, res) {
    try {
      if (!req.body.id) {
        throw {
          data: {
            message: 'شتاسه ارسال نشده است'
          }
        }
      }
      const inputData = req.body;
      let result = await new SurveyBusinessLogic().updateSurvey(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: 'fail',
        data: err.data ? err.data : {message: err.message}
      });
    }
  }

  async deleteSurvey(req, res) {
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
      let result = await new SurveyBusinessLogic().deleteSurvey(inputData);
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

module.exports = SurveyController;