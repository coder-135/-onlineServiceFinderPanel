const QuestionBusinessLogic = require('../businessLogic/questionBusinessLogic');
const Validator = require('../../../utility/validator');
const {surveySchema,cancellationSchema} = require('../../../utility/schema');
const uuid = require('uuid');


class QuestionController {
  constructor() {
  }

  async addSurveyQuestion(req, res) {
    try {
      await new Validator().validate(req.body,surveySchema);
      const inputData = {
        text: req.body.text,
        category: 'survey',
        type: req.body.type,
        id: uuid.v4()
      }
      let result = await new QuestionBusinessLogic().addSurveyQuestion(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: 'fail',
        data: err.data ? err.data : {message: err.message}
      });
    }
  }
  async getSurveyQuestion(req, res) {
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
        result = await new QuestionBusinessLogic().getAllSurveyQuestion();
        res.status(200).send(result);
      } else {
        result = await new QuestionBusinessLogic().getSurveyQuestion({id: req.query.id});
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
  async updateSurveyQuestion(req, res) {
    try {
      if (!req.body.id) {
        throw {
          data: {
            message: 'شتاسه ارسال نشده است'
          }
        }
      }
      const inputData = req.body;
      let result = await new QuestionBusinessLogic().updateSurveyQuestion(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: 'fail',
        data: err.data ? err.data : {message: err.message}
      });
    }
  }
  async deleteSurveyQuestion(req, res) {
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
      let result = await new QuestionBusinessLogic().deleteSurveyQuestion(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: 'fail',
        data: err.data ? err.data : {message: err.message}
      });
    }
  }


  async addCancellationQuestion(req, res) {
    try {
      await new Validator().validate(req.body,cancellationSchema);
      const inputData = {
        text: req.body.text,
        category: 'cancellation',
        type: req.body.type,
        id: uuid.v4()
      }
      let result = await new QuestionBusinessLogic().addCancellationQuestion(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: 'fail',
        data: err.data ? err.data : {message: err.message}
      });
    }
  }
  async getCancellationQuestion(req, res) {
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
        result = await new QuestionBusinessLogic().getAllCancellationQuestion();
        res.status(200).send(result);
      } else {
        result = await new QuestionBusinessLogic().getCancellationQuestion({id: req.query.id});
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
  async updateCancellationQuestion(req, res) {
    try {
      if (!req.body.id) {
        throw {
          data: {
            message: 'شتاسه ارسال نشده است'
          }
        }
      }
      const inputData = req.body;
      let result = await new QuestionBusinessLogic().updateCancellationQuestion(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: 'fail',
        data: err.data ? err.data : {message: err.message}
      });
    }
  }
  async deleteCancellationQuestion(req, res) {
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
      let result = await new QuestionBusinessLogic().deleteCancellationQuestion(inputData);
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

module.exports = QuestionController;