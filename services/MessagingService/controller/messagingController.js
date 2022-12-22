const MessagingBusinessLogic = require('../businessLogic/messagingBusinessLogic');
const Validator = require('../../../utility/validator');
const uuid = require('uuid');


class MessagingController {
  constructor() {
  }

  async addMessage(req, res) {
    try {

      const inputData = {
        title: req.body.title,
        description: req.body.description,
        id: uuid.v4(),
        audience: req.body.audience,

      }
      let result = await new MessagingBusinessLogic().addMessage(inputData);
      res.status(200).send(result);

    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: 'fail',
        data: err.data ? err.data : {message: err.message}
      });
    }
  }

  async getMessage(req, res) {
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
        result = await new MessagingBusinessLogic().getAllMessages();
        res.status(200).send(result);
      } else {
        result = await new MessagingBusinessLogic().getMessage({id: req.query.id});
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

  async updateMessages(req, res) {
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
      let result = await new MessagingBusinessLogic().updateMessages(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: 'fail',
        data: err.data ? err.data : {message: err.message}
      });
    }
  }


  async deleteMessages(req, res) {
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
      let result = await new MessagingBusinessLogic().deleteMessages(inputData);
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

module.exports = MessagingController;