const GeneralBusinessLogic = require('../businessLogic/generalBusinessLogic');
const Validator = require('../../../utility/validator');
const moment = require('moment-jalaali')
const uuid = require('uuid');

class GeneralController {
  constructor() {
  }

  //بیلبورد اپلیکیشن
  async addBillboard(req, res) {
    try {
      if (!req.file) throw {
        status: 400,
        data: {message: 'عکسی انتخاب نشده است'}
      }
      const inputData = {
        avatarUrl: `http://hivepanell.ir/uploads/billboards/${req.file.filename}`,
        redirectUrl: req.body.redirectUrl,
        dateTime: moment().format('jYYYY/jMM/jDD - HH:mm:ss')
      }
      let result = await new GeneralBusinessLogic().addBillboard(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: "fail",
        data: err.data ? err.data : err.message
      });
    }
  }


  //قوانین
  async addRules(req, res) {
    if (!req.body.rules) {
      throw {
        status: 400,
        data: {
          message: 'قوانین ارسال نشده است'
        }
      }
    }
    try {
      const inputData = {
        rules: req.body.rules,
        id: uuid.v4(),
        date: moment().format('jYYYY/jMM/jDD')
      }

      let result = await new GeneralBusinessLogic().addRules(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: "fail",
        data: err.data ? err.data : {message: err.message}
      });
    }
  }

  async getRules(req, res) {
    try {
      let result = await new GeneralBusinessLogic().getRules();
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: "fail",
        data: err.data ? err.data : {message: err.message}
      });
    }
  }

  async updateRules(req, res) {
    try {
      if (!req.body.id) {
        throw {
          status: 400,
          data: {
            message: 'شناسه ارسال نشده است'
          }
        }
      }
      const inputData = req.body;
      let result = await new GeneralBusinessLogic().updateRules(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: "fail",
        data: err.data ? err.data : {message: err.message}
      });
    }
  }

  async deleteRules(req, res) {
    try {
      if (!req.query.id) {
        throw {
          status: 400,
          data: {
            message: 'شناسه ارسال نشده است'
          }
        }
      }
      const inputData = {
        id: req.query.id
      }
      let result = await new GeneralBusinessLogic().deleteRules(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: "fail",
        data: err.data ? err.data : {message: err.message}
      });
    }
  }

  // مهارت ها
  async addSkills(req, res) {
    try {
      if (!req.body.name) {
        throw {
          status: 400,
          data: {
            message: 'مهارت ارسال نشده است'
          }
        }
      }
      const inputData = {
        name: req.body.name,
        id: uuid.v4()
      }

      let result = await new GeneralBusinessLogic().addSkills(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: "fail",
        data: err.data ? err.data : {message: err.message}
      });
    }
  }

  async getSkills(req, res) {
    try {
      let result = await new GeneralBusinessLogic().getSkills();
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: "fail",
        data: err.data ? err.data : {message: err.message}
      });
    }
  }

  async deleteSkills(req, res) {
    try {
      if (!req.query.id) {
        throw {
          status: 400,
          data: {
            message: 'شناسه ارسال نشده است'
          }
        }
      }
      const inputData = {
        id: req.query.id
      }
      let result = await new GeneralBusinessLogic().deleteSkills(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: "fail",
        data: err.data ? err.data : {message: err.message}
      });
    }
  }

  // درباره ما
  async addAboutUs(req, res) {
    try {
      if (!req.body.text) {
        throw {
          status: 400,
          data: {
            message: 'متن درباره ما ارسال نشده است'
          }
        }
      }
      const inputData = {
        text: req.body.text,
        id: uuid.v4(),
        date: moment().format('jYYYY/jMM/jDD')
      }
      let result = await new GeneralBusinessLogic().addAboutUs(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: "fail",
        data: err.data ? err.data : {message: err.message}
      });
    }
  }

  async getAboutUs(req, res) {
    try {
      let result = await new GeneralBusinessLogic().getAboutUs();
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: "fail",
        data: err.data ? err.data : {message: err.message}
      });
    }
  }

  async updateAboutUs(req, res) {
    try {
      if (!req.body.id) {
        throw {
          status: 400,
          data: {
            message: 'شناسه ارسال نشده است'
          }
        }
      }
      const inputData = req.body;
      let result = await new GeneralBusinessLogic().updateAboutUs(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: "fail",
        data: err.data ? err.data : {message: err.message}
      });
    }
  }

  async deleteAboutUs(req, res) {
    try {
      if (!req.query.id) {
        throw {
          status: 400,
          data: {
            message: 'شناسه ارسال نشده است'
          }
        }
      }
      const inputData = {
        id: req.query.id
      }
      let result = await new GeneralBusinessLogic().deleteAboutUs(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: "fail",
        data: err.data ? err.data : {message: err.message}
      });
    }
  }


  // ارتباط با ما
  async addContactUs(req, res) {
    try {
      const inputData = {
        whatsapp: req.body.whatsapp,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        id: uuid.v4(),
        date: moment().format('jYYYY/jMM/jDD')
      }
      let result = await new GeneralBusinessLogic().addContactUs(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: "fail",
        data: err.data ? err.data : {message: err.message}
      });
    }
  }

  async getContactUs(req, res) {
    try {
      let result = await new GeneralBusinessLogic().getContactUs();
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: "fail",
        data: err.data ? err.data : {message: err.message}
      });
    }
  }

  async updateContactUs(req, res) {
    try {
      if (!req.body.id) {
        throw {
          status: 400,
          data: {
            message: 'شناسه ارسال نشده است'
          }
        }
      }
      const inputData = req.body;
      let result = await new GeneralBusinessLogic().updateContactUs(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: "fail",
        data: err.data ? err.data : {message: err.message}
      });
    }
  }

  async deleteContactUs(req, res) {
    try {
      if (!req.query.id) {
        throw {
          status: 400,
          data: {
            message: 'شناسه ارسال نشده است'
          }
        }
      }
      const inputData = {
        id: req.query.id
      }
      let result = await new GeneralBusinessLogic().deleteContactUs(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: "fail",
        data: err.data ? err.data : {message: err.message}
      });
    }
  }

  // جوایز
  async addPrize(req, res) {
    try {
      const inputData = {
        title: req.body.title,
        description: req.body.description,
        expirationDate: req.body.expirationDate,
        id: uuid.v4(),
        insertedDate: moment().format('jYYYY/jMM/jDD')
      }
      let result = await new GeneralBusinessLogic().addPrize(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: "fail",
        data: err.data ? err.data : {message: err.message}
      });
    }
  }

  async getPrize(req, res) {
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
        result = await new GeneralBusinessLogic().getAllPrizes();
        res.status(200).send(result);
      } else {
        result = await new GeneralBusinessLogic().getPrize({id: req.query.id});
        res.status(200).send(result);
      }
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: "fail",
        data: err.data ? err.data : {message: err.message}
      });
    }
  }

  async updatePrize(req, res) {
    try {
      if (!req.body.id) {
        throw {
          status: 400,
          data: {
            message: 'شناسه ارسال نشده است'
          }
        }
      }
      const inputData = req.body;
      let result = await new GeneralBusinessLogic().updatePrize(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: "fail",
        data: err.data ? err.data : {message: err.message}
      });
    }
  }

  async deletePrize(req, res) {
    try {
      if (!req.query.id) {
        throw {
          status: 400,
          data: {
            message: 'شناسه ارسال نشده است'
          }
        }
      }
      const inputData = {
        id: req.query.id
      }
      let result = await new GeneralBusinessLogic().deletePrize(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: "fail",
        data: err.data ? err.data : {message: err.message}
      });
    }
  }

  //لینک های آپدیت
  async addUpdateLinks(req, res) {
    try {
      const inputData = {
        cafeBazaar: req.body.cafeBazaar,
        googlePlay: req.body.googlePlay,
        myket: req.body.myket,
        id: uuid.v4(),
        date: moment().format('jYYYY/jMM/jDD')
      }
      let result = await new GeneralBusinessLogic().addUpdateLinks(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: "fail",
        data: err.data ? err.data : {message: err.message}
      });
    }
  }

  async getUpdateLinks(req, res) {
    try {
      let result = await new GeneralBusinessLogic().getUpdateLinks();
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: "fail",
        data: err.data ? err.data : {message: err.message}
      });
    }
  }

  async updateUpdateLinks(req, res) {
    try {
      if (!req.body.id) {
        throw {
          status: 400,
          data: {
            message: 'شناسه ارسال نشده است'
          }
        }
      }
      const inputData = req.body;
      let result = await new GeneralBusinessLogic().updateUpdateLinks(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: "fail",
        data: err.data ? err.data : {message: err.message}
      });
    }
  }

  async deleteUpdateLinks(req, res) {
    try {
      if (!req.query.id) {
        throw {
          status: 400,
          data: {
            message: 'شناسه ارسال نشده است'
          }
        }
      }
      const inputData = {
        id: req.query.id
      }
      let result = await new GeneralBusinessLogic().deleteUpdateLinks(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: "fail",
        data: err.data ? err.data : {message: err.message}
      });
    }
  }

  //راهنما
  async addGuide(req, res) {
    try {
      const inputData = {
        description: req.body.description,
        instagram: req.body.instagram,
        whatsapp: req.body.whatsapp,
        phoneNumber: req.body.phoneNumber,
        id: uuid.v4(),
        date: moment().format('jYYYY/jMM/jDD')
      }
      let result = await new GeneralBusinessLogic().addGuide(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: "fail",
        data: err.data ? err.data : {message: err.message}
      });
    }
  }

  async getGuide(req, res) {
    try {
      let result = await new GeneralBusinessLogic().getGuide();
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: "fail",
        data: err.data ? err.data : {message: err.message}
      });
    }
  }

  async updateGuide(req, res) {
    try {
      if (!req.body.id) {
        throw {
          status: 400,
          data: {
            message: 'شناسه ارسال نشده است'
          }
        }
      }
      const inputData = req.body;
      let result = await new GeneralBusinessLogic().updateGuide(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: "fail",
        data: err.data ? err.data : {message: err.message}
      });
    }
  }

  async deleteGuide(req, res) {
    try {
      if (!req.query.id) {
        throw {
          status: 400,
          data: {
            message: 'شناسه ارسال نشده است'
          }
        }
      }
      const inputData = {
        id: req.query.id
      }
      let result = await new GeneralBusinessLogic().deleteGuide(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: "fail",
        data: err.data ? err.data : {message: err.message}
      });
    }
  }


  // شهر ها و استان ها
  async getCities(req, res) {
    try {
      let result = await new GeneralBusinessLogic().getCities();
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: 'fail',
        data: err.data ? err.data : {message: err.message}
      });
    }
  }

  async getProvinces(req, res) {
    try {
      let result = await new GeneralBusinessLogic().getProvinces();
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: 'fail',
        data: err.data ? err.data : {message: err.message}
      });
    }
  }

  async getDailyVisit(req, res) {
    try {

      const inputData = {
        date: moment().format('jYYYYjMMjDD')
      }
      let result = await new GeneralBusinessLogic().getDailyVisit(inputData);
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: "fail",
        data: err.data ? err.data : {message: err.message}
      });
    }
  }
  async getOnlineUsers(req, res) {
    try {

      let result = await new GeneralBusinessLogic().getOnlineUsers();
      res.status(200).send(result);
    } catch (err) {
      const status = err.status || 400;
      res.status(status).send({
        status: "fail",
        data: err.data ? err.data : {message: err.message}
      });
    }
  }


}

module.exports = GeneralController;