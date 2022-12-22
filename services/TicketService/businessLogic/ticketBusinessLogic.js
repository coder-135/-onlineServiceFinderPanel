const TicketRepository = require('../repository/ticketRepository');
const accessManager = require('../../accessManagementService/accessManager');

class TicketBusinessLogic {
  constructor() {
  }

  async getAllTickets() {
    const tickets = await new TicketRepository().getTicket({});
    return {
      status: 'success',
      data: {
        message: ` تیکت ها با موفقیت دریافت شد`,
        result: tickets
      }
    }
  }

  /*
let coupon = "";
let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
for (var i = 0; i < 6; i++) {
  coupon += possible.charAt(Math.floor(Math.random() * possible.length));
}
   */
  async getTicket(inputData) {
    const ticketDetail = await new TicketRepository().getTicket(inputData);
    return {
      status: 'success',
      data: {
        message: `تیکت با موفقیت دریافت شد`,
        result: ticketDetail.length > 0 ? ticketDetail[0] : []
      }
    }
  }
  async updateTicket(inputData) {
    //todo send notification to Agent that ticket is checked
    const ticketDetail = await new TicketRepository().updateTicket(inputData);
    return {
      status: 'success',
      data: {
        message: `تیکت با موفقیت ویرایش شد`,
        result: ticketDetail
      }
    }
  }

  async deleteTicket(inputData) {
    await new TicketRepository().deleteTicket(inputData);
    return {
      status: 'success',
      data: {
        message: `تیکت با موفقیت حذف شد`,
      }
    }
  }

}

module.exports = TicketBusinessLogic;