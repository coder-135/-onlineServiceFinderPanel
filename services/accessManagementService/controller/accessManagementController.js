const AccessManagementBusinessLogic = require('../businessLogic/accessManagementBusinessLogic');
const Validator = require('../../../utility/validator');
const uuid = require('uuid');


class AccessManagementController {
  constructor() {
  }

  async addRole(req, res) {
    try {
      const inputData = {
        role: req.body.role,
        persianName: req.body.persianName,
        features: [],
        id: uuid.v4()
      }
      let result = await new AccessManagementBusinessLogic().addRole(inputData);
      res.status(200).send(result);

    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: 'fail',
        data: err.data ? err.data : {message: err.message}
      });
    }
  }
  async getRole(req, res) {
    try {
      let result;
      if (!req.query.all && !req.query.id) {
        throw {
          status: 400,
          data: {
            message: 'پارامتر های ورودی بررسی شود'
          }
        }
      }
      if (req.query.all) {
        result = await new AccessManagementBusinessLogic().getAllRoles();
        res.status(200).send(result);
      } else {
        result = await new AccessManagementBusinessLogic().getRole({id: req.query.id});
        res.status(200).send(result);
      }
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: 'fail',
        data: err.data ? err.data : {message: err.message}
      });
    }
  }
  async updateRole(req, res) {
    try {
      if (!req.body.id) {
        throw {
          status: 400,
          data: {
            message: 'پارامتر های ورودی بررسی شود'
          }
        }
      }
      const inputData = req.body;
      let result = await new AccessManagementBusinessLogic().updateRole(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: 'fail',
        data: err.data ? err.data : {message: err.message}
      });
    }
  }
  async assignRoleToEmployee(req, res) {
    try {
      if (!req.body.employeeId || !req.body.id) {
        throw {
          status: 400,
          data: {
            message: 'پارامتر های ورودی بررسی شود'
          }
        }
      }
      const inputData = req.body;
      let result = await new AccessManagementBusinessLogic().assignRoleToEmployee(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: 'fail',
        data: err.data ? err.data : {message: err.message}
      });
    }
  }
  async deleteRole(req, res) {
    try {
      if (!req.query.id) {
        throw {
          data: {
            message: 'شتاسه ارسال نشده است'
          }
        }
      }
      const inputData = {
        id: req.query.id
      }
      let result = await new AccessManagementBusinessLogic().deleteRole(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: 'fail',
        data: err.data ? err.data : {message: err.message}
      });
    }
  }
  async removeFeatureFromRole(req, res) {
    try {
      if (!req.body.id && !req.body.feature) {
        throw {
          status: 400,
          data: {
            message: 'پارامتر های ورودی بررسی شود'
          }
        }
      }
      const inputData = {
        id: req.body.id,
        feature: req.body.feature
      };
      let result = await new AccessManagementBusinessLogic().removeFeatureFromRole(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: 'fail',
        data: err.data ? err.data : {message: err.message}
      });
    }
  }


  async addFeature(req, res) {
    try {
      const inputData = {
        feature: req.body.feature,
        route: req.body.route,
        featureName: req.body.featureName,
        id: uuid.v4()
      }
      let result = await new AccessManagementBusinessLogic().addFeature(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: 'fail',
        data: err.data ? err.data : {message: err.message}
      });
    }
  }
  async getFeature(req, res) {
    try {
      let result;
      if (!req.query.all && !req.query.id) {
        throw {
          status: 400,
          data: {
            message: 'پارامتر های ورودی بررسی شود'
          }
        }
      }
      if (req.query.all) {
        result = await new AccessManagementBusinessLogic().getAllFeatures();
        res.status(200).send(result);
      } else {
        result = await new AccessManagementBusinessLogic().getFeature({id: req.query.id});
        res.status(200).send(result);
      }
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: 'fail',
        data: err.data ? err.data : {message: err.message}
      });
    }
  }
  async updateFeature(req, res) {
    try {
      if (!req.body.id) {
        throw {
          status: 400,
          data: {
            message: 'پارامتر های ورودی بررسی شود'
          }
        }
      }
      const inputData = req.body;
      let result = await new AccessManagementBusinessLogic().updateFeature(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: 'fail',
        data: err.data ? err.data : {message: err.message}
      });
    }
  }
  async deleteFeature(req, res) {
    try {
      if (!req.query.id) {
        throw {
          data: {
            message: 'شتاسه ارسال نشده است'
          }
        }
      }
      const inputData = {
        id: req.query.id
      }
      let result = await new AccessManagementBusinessLogic().deleteFeature(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: 'fail',
        data: err.data ? err.data : {message: err.message}
      });
    }
  }

}

module.exports = AccessManagementController;