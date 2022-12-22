const jwt = require("jsonwebtoken");
const {promisify} = require("util");
const UserRepository = require('../AdminManagerService/repository/adminRepository')
const AgentRepository = require('../categoryrService/repository/categoryRepository')

class AccessManager {
  constructor() {
  }

  async checkAccessControl(req, res, feature) {

    try {
      let token;
      const header = req.headers;
      if (header.hasOwnProperty.call(header, 'refresh-token')) {
        let refreshToken = header['refresh-token'];
        let jwtPayload = this.parseJwt(refreshToken);
        let uid = jwtPayload.id;
        let user = await new UserRepository().getUser('userId', uid);
        if (user) {
          try {
            const refreshTokenExists = await userRepository.findTokenBlackList(refreshToken);
            if (refreshTokenExists.length > 0) {
              throw new Error;
            }
            await promisify(jwt.verify)(refreshToken, process.env.REFRESH_JWT_SECRET);
          } catch (err) {
            res.removeHeader('refresh-token');
            throw{
              message: 'توکن منقی شده است ، لطفا دوباره لاگین کنید',
              status: 401
            };
          }
          token = generate.access(uid);
          res.setHeader('access-token', token);
        } else {
          throw {
            message: 'کاربری با این توکن وجود ندارد'
          }
        }

      }
      const accessToken = header['access-token'] || token;
      if (!accessToken)
        throw {message: 'توکنی ارسال نشده است'}
      const jwtPayload = parseJwt(accessToken);
      const uid = jwtPayload.id;
      let userData = await model.findUserRole({uid});
      if (userData === null) {
        userData = await model.findEmployeeRole({employeeId: uid});
        if (userData === null) {
          throw {
            status: 401,
            message: 'توکن منقضی شده است دوباره لاگین کنید'
          }
        }
      }
      let {activeRole} = userData;
      let {features} = await model.findFeature({role: activeRole});

      if (!(features.includes(feature))) {
        throw {
          status: 403,
          message: "شما اجازه دسترسی به این پلت فرم را ندارید",
        }
      }
      try {
        await promisify(jwt.verify)(accessToken, process.env.ACCESS_JWT_SECRET);
      } catch (e) {
        throw {
          status: 401,
          message: 'توکن ارسالی منقضی شده است لطفا دوباره لاگین کنید'
        }
      }

      req.userId = uid;
      req.userRole = activeRole;

    } catch (err) {
      err.status = err.status || 400;
      throw{
        status: err.status,
        message: err.message
      }
    }
  }

  checkToken() {

  }

  parseJwt(token) {
    let base64Url = token.split('.')[1];
    let payload = Buffer.from(base64Url, 'base64');
    return JSON.parse(payload.toString());
  }

  generateAccessToken(adminId) {
    return jwt.sign({adminId}, process.env.ACCESS_JWT_SECRET, {
      expiresIn: process.env.ACCESS_JWT_EXPIRES_IN,
    });
  }

  generateRefreshToken(adminId) {
    return jwt.sign({adminId}, process.env.REFRESH_JWT_SECRET, {
      expiresIn: process.env.REFRESH_JWT_EXPIRES_IN,
    });
  }
}


module.exports = AccessManager;