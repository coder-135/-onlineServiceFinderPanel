const config = require('../../../utility/initializer');

class MessagingRepository {
  constructor() {
  }

  async addMessages(inputData) {
    await config.mongoDB.collection('messages').insertMany(inputData);
  }

  async getAllMessages() {
    return await config.mongoDB.collection('messages').aggregate([
      {
        '$group': {
          _id: {
            id: '$id',
            title: '$title',
            description: '$description'
          }
        }
      }
    ]).toArray()
  }

  async getMessage(inputData) {
    return await config.mongoDB.collection('messages').findOne(inputData, {projection: {_id: 0}});
  }

  async updateMessages(inputData) {
    await config.mongoDB.collection('messages').updateMany({id: inputData.id}, {
      $set: inputData
    });

    return await config.mongoDB.collection('messages').findOne({id: inputData.id}, {projection: {_id: 0}});
  }

  async deleteMessages(inputData) {
    await config.mongoDB.collection('messages').deleteMany(inputData);
  }

}

module.exports = MessagingRepository;