const FinancialRepository = require('../repository/financialRepository');

class FinancialBusinessLogic {
  constructor() {
  }

  async getStock(inputData) {
    const stock = await new FinancialRepository().getStock(inputData);
    return {
      status: 'success',
      data: {
        message: ` موجودی با موفقیت دریافت شد`,
        result: stock
      }
    }
  }

  async getAllFactors(inputData) {
    let query = {}
    if (inputData.startDate && inputData.endDate)
      query.date = {
        $gte: inputData.startDate,
        $lte: inputData.endDate
      }
    let queryData = {
      page: inputData.page ? parseInt(inputData.page) : 1,
      limit: inputData.limit ? parseInt(inputData.limit) : 20
    }
    const factors = await new FinancialRepository().getFactors(query, queryData);
    return {
      status: 'success',
      data: {
        message: ` فاکتور ها با موفقیت دریافت شد`,
        result: {
          factors: factors.data,
          totalItem: factors.totalItem
        }
      }
    }
  }

  async getFactors(inputData) {
    let query = {ownerId: inputData.ownerId};
    if (inputData.startDate && inputData.endDate)
      query.date = {
        $gte: inputData.startDate,
        $lte: inputData.endDate
      }
    const queryData = {
      page: inputData.page ? parseInt(inputData.page) : 1,
      limit: inputData.limit ? parseInt(inputData.limit) : 20
    }
    const factors = await new FinancialRepository().getFactors(query, queryData);
    return {
      status: 'success',
      data: {
        message: ` فاکتور های کاربر مدنظر با موفقیت دریافت شد`,
        result: {
          factors: factors.data,
          totalItem: factors.totalItem
        }
      }
    }
  }

  async income(inputData) {
    inputData = {
      date: {
        $gte: inputData.startDate,
        $lte: inputData.endDate
      },
      ownerId: inputData.ownerId
    }
    const factors = await new FinancialRepository().getAllFactors(inputData);
    let income = 0;
    if (factors.length > 0)
      factors.forEach(item => {
        income += item.amount
      })
    return {
      status: 'success',
      data: {
        message: ` درآمد با موفقیت دریافت شد`,
        result: {income}
      }
    }
  }

}

module.exports = FinancialBusinessLogic;