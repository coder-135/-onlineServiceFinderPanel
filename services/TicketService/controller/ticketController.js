const TicketBusinessLogic = require('../businessLogic/ticketBusinessLogic');
const Validator = require('../../../utility/validator');
const uuid = require('uuid');


class TicketController {
  constructor() {
  }

  async getTicket(req, res) {
    try {
      let result;
      if (!req.query.all && !req.query.ticketId) {
        throw {
          status: 400,
          data: {
            message: 'پارامتر های ورودی بررسی شود'
          }
        }
      }
      if (req.query.all) {
        result = await new TicketBusinessLogic().getAllTickets();
        res.status(200).send(result);
      } else {
        result = await new TicketBusinessLogic().getTicket({ticketId: req.query.ticketId});
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

  async updateTicket(req, res) {
    try {
      let result;
      if (!req.body.ticketId) {
        throw {
          status: 400,
          data: {
            message: 'پارامتر های ورودی بررسی شود'
          }
        }
      }
      const inputData = req.body;
      result = await new TicketBusinessLogic().updateTicket(inputData);
      res.status(200).send(result);


    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: 'fail',
        data: err.data ? err.data : {message: err.message}
      });
    }
  }


  async deleteTicket(req, res) {
    try {
      if (!req.query.ticketId) {
        throw {
          data: {
            message: 'شتاسه ارسال نشده است'
          }
        }
      }
      const inputData = {
        ticketId: req.query.ticketId
      }
      let result = await new TicketBusinessLogic().deleteTicket(inputData);
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

module.exports = TicketController;