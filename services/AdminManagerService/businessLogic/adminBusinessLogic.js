const AdminRepository = require('../repository/adminRepository')
const bcrypt = require('bcrypt');
const accessManager = require('../../accessManagementService/accessManager')

class AdminBusinessLogic {
  constructor() {
  }

  async login(inputData) {

    const admin = await new AdminRepository().getAdmin('username', inputData.username);
    if (admin) {
      const validPassword = await bcrypt.compare(inputData.password, admin.password);
      if (validPassword) {
        const accessToken = new accessManager().generateAccessToken(admin.adminId);
        const refreshToken = new accessManager().generateRefreshToken(admin.adminId);
        delete admin.password;
        return {
          status: 'success',
          data: {
            message: "مدیر محترم به پنل مدیریتی پلتفرم هایو خوش آمدید",
            result: {
              adminData: admin,
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

}

module.exports = AdminBusinessLogic;