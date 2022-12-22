const config = require('../../../utility/initializer');

class TicketRepository {
  constructor() {
  }


  async getTicket(query) {
    return await config.mongoDB.collection('tickets').find(query, {projection: {_id: 0}}).toArray();
  }

  async updateTicket(inputData) {
    await config.mongoDB.collection('tickets').updateOne({ticketId: inputData.ticketId}, {
      $set: inputData
    });
    return await config.mongoDB.collection('tickets').findOne({ticketId: inputData.ticketId}, {projection: {_id: 0}});
  }

  async deleteTicket(inputData) {
    inputData = await config.mongoDB.collection('tickets').deleteOne(inputData);
    if (inputData.deletedCount !== 1) {
      throw {
        status: 404,
        data: {
          message: 'داده ای برای حذف شدن یافت نشد'
        }
      }
    }
  }

}

module.exports = TicketRepository;