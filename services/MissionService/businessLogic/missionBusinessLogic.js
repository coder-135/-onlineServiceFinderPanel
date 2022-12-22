const MissionRepository = require('../repository/missionRepository');
const accessManager = require('../../accessManagementService/accessManager');
const uuid = require("uuid");
const moment = require("moment-jalaali");

class MissionBusinessLogic {
  constructor() {
  }

  async addMission(inputData) {
    await new MissionRepository().addMission(inputData);
    delete inputData._id;
    return {
      status: 'success',
      data: {
        message: 'ماموریت با موفقیت اضافه شد',
        result: inputData
      }
    }
  }

  async getAllMissions() {
    let missions = await new MissionRepository().getAllMissions();

    return {
      status: 'success',
      data: {
        message: 'ماموریت ها با موفقیت دریافت شد',
        result: missions
      }
    }
  }

  async getMission(inputData) {
    const message = await new MissionRepository().getMission(inputData);
    return {
      status: 'success',
      data: {
        message: 'ماموریت با موفقیت دریافت شد',
        result: message
      }
    }
  }

  async updateMission(inputData) {
    const mission = await new MissionRepository().updateMission(inputData);
    return {
      status: 'success',
      data: {
        message: `پیام ها با موفقیت ویرایش شد`,
        result: mission
      }
    }
  }

  async deleteMission(inputData) {
    await new MissionRepository().deleteMission(inputData);
    return {
      status: 'success',
      data: {
        message: `پیام ها با موفقیت حذف شد`,
      }
    }
  }

}

module.exports = MissionBusinessLogic;