const MessagingRepository = require('../repository/messagingRepository');
const accessManager = require('../../accessManagementService/accessManager');
const AgentRepository = require('../../agentService/repository/agentRepository');
const uuid = require("uuid");
const moment = require("moment-jalaali");

class MessagingBusinessLogic {
  constructor() {
  }

  async addMessage(inputData) {
    const agents = await new AgentRepository().getAllAgents();
    let messages = [];
    if (inputData.audience === 'all') {
      for (let i = 0; i < agents.length; i++) {
        let messageData = {
          id: inputData.id,
          date: moment().format('jYYYY/jMM/jDD'),
          time: moment().format('HH:mm:ss'),
          agentId: agents[i].agentId,
          title: inputData.title,
          description: inputData.description,
        }
        messages.push(messageData);
      }
      await new MessagingRepository().addMessages(messages);
    } else {
      if (typeof inputData.audience === 'object' && inputData.audience.length === 0) {
        throw {
          data: {
            message: 'شناسه کارگذاران جهت ارسال پیام ، ارسال نشده است'
          }
        }
      }
      inputData.audience.forEach(item => {
        let messageData = {
          id: inputData.id,
          date: moment().format('jYYYY/jMM/jDD'),
          time: moment().format('HH:mm:ss'),
          agentId: item,
          title: inputData.title,
          description: inputData.description,
        }
        messages.push(messageData);
      })
      await new MessagingRepository().addMessages(messages);
    }
    return {
      status: 'success',
      data: {
        message: `پیام با موفقیت به کارگذاران ارسال شد`,
        result : inputData
      }
    }
  }


  async getAllMessages() {
    let messages = await new MessagingRepository().getAllMessages();
    messages =  messages.map(item=>{
      return {
        id: item._id.id,
        title: item._id.title,
        description: item._id.description
      }
    })
    return {
      status: 'success',
      data: {
        message: ` پیام ها با موفقیت دریافت شد`,
        result: messages
      }
    }
  }

  async getMessage(inputData) {
    const message = await new MessagingRepository().getMessage(inputData);
    return {
      status: 'success',
      data: {
        message: `پیام با موفقیت دریافت شد`,
        result: message
      }
    }
  }

  async updateMessages(inputData) {
    const message = await new MessagingRepository().updateMessages(inputData);
    return {
      status: 'success',
      data: {
        message: `پیام ها با موفقیت ویرایش شد`,
        result: message
      }
    }
  }

  async deleteMessages(inputData) {
    await new MessagingRepository().deleteMessages(inputData);
    return {
      status: 'success',
      data: {
        message: `پیام ها با موفقیت حذف شد`,
      }
    }
  }

}

module.exports = MessagingBusinessLogic;