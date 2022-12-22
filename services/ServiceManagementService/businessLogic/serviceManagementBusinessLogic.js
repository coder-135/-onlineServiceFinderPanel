const ServiceManagementRepository = require('../repository/serviceManagementRepository');
const accessManager = require('../../accessManagementService/accessManager');

class ServiceManagementBusinessLogic {
  constructor() {
  }

  async getAllServices() {
    const services = await new ServiceManagementRepository().getAllServices();
    return {
      data: {
        message: 'دریافت سرویس ها با موفقیت انجام شد',
        result: {
          services,
          count: services.length
        }
      }
    }
  }
  async singleService(inputData) {
    const service = await new ServiceManagementRepository().singleService(inputData);
    return {
      data: {
        message: 'دریافت سرویس با موفقیت انجام شد',
        result: service
      }
    }
  }

  async historyService(inputData) {
    const services = await new ServiceManagementRepository().getServices(inputData);
    return {
      data: {
        message: 'دریافت سرویس ها با موفقیت انجام شد',
        result: {
          services,
          count: services.length
        }
      }
    }
  }

  async getVipReserved() {
    const vipReservedServices = await new ServiceManagementRepository().getVipReserved();
    return {
      status: 'success',
      data: {
        message: `سرویس های رزروی ویژه با موفقیت دریافت شد`,
        result: {
          vipReservedServices,
          count: vipReservedServices.length
        }
      }
    }
  }

  async updateVipReserved(inputData) {

    inputData = await new ServiceManagementRepository().updateVipReserved(inputData);
    delete inputData.operatorStatus;
    await new ServiceManagementRepository().updateServicedRedis(inputData);

    return {
      status: 'success',
      data: {
        message: `سرویس رزروی vip با موفقیت آپدیت شد`,
        result: inputData
      }
    }
  }

  async getVipServices() {
    let agentsStatus = [];
    const vipReservedServices = await new ServiceManagementRepository().getVipServices();
    for (let i = 0; i < vipReservedServices.length; i++) {
      let agent = await new ServiceManagementRepository().getAgentStatusRedis({agentId: vipReservedServices[i].agentId});
      if (agent)
        agentsStatus.push({
          agentFullName: vipReservedServices[i].agentFullName,
          agentId: agent.agentId,
          socketId: agent.socketId,
          serviceStatus: agent.serviceStatus,
          serviceEndTime: agent.serviceEndTime,
          agentStatus: agent.agentStatus
        })
    }
    return {
      status: 'success',
      data: {
        message: `سرویس های vip با موفقیت دریافت شد`,
        result: {
          vipReservedServices,
          agentsStatus,
          count: vipReservedServices.length
        }
      }
    }
  }

  async updateVipServices(inputData) {

    inputData = await new ServiceManagementRepository().updateVipServices(inputData);
    delete inputData.operatorStatus;
    await new ServiceManagementRepository().updateServicedRedis(inputData);

    return {
      status: 'success',
      data: {
        message: `سرویس vip با موفقیت آپدیت شد`,
        result: inputData
      }
    }
  }

}

module.exports = ServiceManagementBusinessLogic;