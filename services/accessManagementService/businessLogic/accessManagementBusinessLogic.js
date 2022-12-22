const AccessManagementRepository = require('../repository/accessManagementRepository');
const EmployeeRepository = require('../../EmployeeService/repository/employeeRepository');
const accessManager = require('../accessManager');
const uuid = require("uuid");
const moment = require("moment-jalaali");

class AccessManagementBusinessLogic {
  constructor() {
  }

  async addRole(inputData) {
    const role = await new AccessManagementRepository().getRole({role: inputData.role});
    if (role) {
      throw {
        status: 409,
        data: {message: 'اسم نقش تکراری می باشد'}
      }
    }
    await new AccessManagementRepository().addRole(inputData);
    delete inputData._id;
    return {
      status: 'success',
      data: {
        message: 'نقش با موفقیت اضافه شد',
        result: inputData
      }
    }
  }

  async getAllRoles() {
    const roles = await new AccessManagementRepository().getAllRoles();

    return {
      status: 'success',
      data: {
        message: 'نقش ها با موفقیت دریافت شد',
        result: roles
      }
    }
  }

  async getRole(inputData) {
    const role = await new AccessManagementRepository().getRole(inputData);
    return {
      status: 'success',
      data: {
        message: 'نقش با موفقیت دریافت شد',
        result: role
      }
    }
  }

  async updateRole(inputData) {

    if (inputData.feature) {
      const numberOfFields = Object.keys(inputData).length;
      // درصورتی که بیش از دو فیلد وجود دارو و فیلد ویژگی را هم شامل می شود
      if (numberOfFields > 2) {
        const updateFeatureData = {
          id: inputData.id,
          feature: inputData.feature
        }
        delete inputData.feature;
        await new AccessManagementRepository().assignFeatureToRole(updateFeatureData);
        inputData = await new AccessManagementRepository().updateRole(inputData);
      } else {
        // آپدیت ویژگی
        inputData = await new AccessManagementRepository().assignFeatureToRole(inputData);
      }
    } else {
      //آپدیت فیلد های نقش
      inputData = await new AccessManagementRepository().updateRole(inputData);
    }
    return {
      status: 'success',
      data: {
        message: `نقش با موفقیت ویرایش شد`,
        result: inputData
      }
    }
  }

  async deleteRole(inputData) {
    await new AccessManagementRepository().deleteRole(inputData);
    return {
      status: 'success',
      data: {
        message: `نقش با موفقیت حذف شد`,
      }
    }
  }


  async assignRoleToEmployee(inputData) {
    let role = await new AccessManagementRepository().getRole({id: inputData.id});
    if (!role) {
      throw {
        status: 404,
        data: {message: 'نقش مورد نظر یافت نشد'}

      }
    }
    const updateEmployeeData = {
      role: role.role,
      id: inputData.employeeId
    }
    inputData = await new EmployeeRepository().updateEmployee(updateEmployeeData)
    return {
      status: 'success',
      data: {
        message: `نقش به کارمند با موفقیت انتصاب داده شد `,
        result: inputData
      }
    }
  }

  async removeFeatureFromRole(inputData) {
    let features;
    let role = await new AccessManagementRepository().getRole({id: inputData.id});
    // let role = 'test';
    if (!role) {
      throw {
        status: 404,
        data: {message: 'نقش مورد نظر یافت نشد'}
      }
    }

    if (role.features.includes(inputData.feature))
      features = role.features.filter((item)=>item !== inputData.feature)
    else
      throw {
        status: 400,
        data: {message: 'این ویژگی برای این نقش یافت نشد'}
      }

    const updateRoleData = {
      id: inputData.id,
      features
    }
    inputData = await new AccessManagementRepository().updateRole(updateRoleData)
    return {
      status: 'success',
      data: {
        message: `ویژگی مد نظر با موفقیت از نقش حذف شد`,
        result: inputData
      }
    }
  }


  async addFeature(inputData) {
    const feature = await new AccessManagementRepository().getFeature({feature: inputData.feature});
    if (feature) {
      throw {
        status: 409,
        data: {message: 'اسم ویژگی تکراری می باشد'}
      }
    }
    await new AccessManagementRepository().addFeature(inputData);
    await new AccessManagementRepository().assignFeatureToRole({
      id: "86163e65-250c-49ba-8c73-d83880e97170",
      feature: inputData.feature
    });
    delete inputData._id;
    return {
      status: 'success',
      data: {
        message: 'ویژگی با موفقیت اضافه شد',
        result: inputData
      }
    }
  }

  async getAllFeatures() {
    const features = await new AccessManagementRepository().getAllFeatures();
    return {
      status: 'success',
      data: {
        message: 'ویژگی ها با موفقیت دریافت شد',
        result: features
      }
    }
  }

  async getFeature(inputData) {
    const feature = await new AccessManagementRepository().getFeature(inputData);
    return {
      status: 'success',
      data: {
        message: 'ویژگی با موفقیت دریافت شد',
        result: feature
      }
    }
  }

  async updateFeature(inputData) {

    inputData = await new AccessManagementRepository().updateFeature(inputData);

    return {
      status: 'success',
      data: {
        message: `ویژگی با موفقیت ویرایش شد`,
        result: inputData
      }
    }
  }

  async deleteFeature(inputData) {
    await new AccessManagementRepository().deleteFeature(inputData);
    return {
      status: 'success',
      data: {
        message: `ویژگی با موفقیت حذف شد`,
      }
    }
  }


}

module.exports = AccessManagementBusinessLogic;