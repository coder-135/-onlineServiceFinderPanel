const EmployeeRepository = require('../repository/employeeRepository');
const accessManager = require('../../accessManagementService/accessManager');
const AgentRepository = require('../../agentService/repository/agentRepository');
const uuid = require("uuid");
const moment = require("moment-jalaali");
const bcrypt = require("bcrypt");

class EmployeeBusinessLogic {
  constructor() {
  }

  async login(inputData) {

    const employee = await new EmployeeRepository().getEmployee({username: inputData.username});
    if (employee) {
      if (employee.role === !'sysAdmin' || !employee.ipStatus) {
        await new EmployeeRepository().updateEmployee({id: employee.id, ip: inputData.ip, ipStatus: true})
      }
      if (employee.role === !'sysAdmin' || (employee.ipStatus && employee.ip !== inputData.ip))
        throw {
          status: 403,
          data: {message: 'آی پی مدنظر در سیستم تغریف نشده است'}
        }

      const validPassword = await bcrypt.compare(inputData.password, employee.password);
      if (validPassword) {
        const accessToken = new accessManager().generateAccessToken(employee.adminId);
        const refreshToken = new accessManager().generateRefreshToken(employee.adminId);
        delete employee.password;
        return {
          status: 'success',
          data: {
            message: "کارمند محترم به پنل مدیریتی پلتفرم هایو خوش آمدید",
            result: {
              employeeData: employee,
              accessToken,
              refreshToken
            }
          }
        }
      } else {
        throw  {
          status: 400,
          data: {
            message: 'شناسه کاربری یا رمز عبور اشتباه است'
          }
        }
      }
    } else {
      throw  {
        status: 400,
        data: {
          message: 'شناسه کاربری یا رمز عبور اشتباه است'
        }
      }
    }
  }

  async addEmployee(inputData) {
    const employee = await new EmployeeRepository().getEmployee({username: inputData.username});
    if (employee)
      throw  {
        status: 409,
        data: {
          message: 'نام کاربری قبلا در سیستم ثبت شده است '
        }
      }
    await new EmployeeRepository().addEmployee(inputData);
    delete inputData._id;
    return {
      status: 'success',
      data: {
        message: `کارمند با موفقیت اضافه شد`,
        result: inputData
      }
    }
  }

  async getAllEmployees() {
    let employees = await new EmployeeRepository().getAllEmployees();
    return {
      status: 'success',
      data: {
        message: ` کارمندان با موفقیت دریافت شد`,
        result: employees
      }
    }
  }

  async getEmployee(inputData) {
    const employee = await new EmployeeRepository().getEmployee(inputData);
    return {
      status: 'success',
      data: {
        message: `کارمند با موفقیت دریافت شد`,
        result: employee
      }
    }
  }

  async updateEmployee(inputData) {
    const result = await new EmployeeRepository().updateEmployee(inputData);
    return {
      status: 'success',
      data: {
        message: ` اطلاعات کارمند با موفقیت ویرایش شد`,
        result
      }
    }
  }

  async deleteEmployee(inputData) {
    await new EmployeeRepository().deleteEmployee(inputData);
    return {
      status: 'success',
      data: {
        message: `کارمند با موفقیت حذف شد`,
      }
    }
  }

}

module.exports = EmployeeBusinessLogic;