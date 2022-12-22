const config = require('../../../utility/initializer');

class CategoryRepository {
  constructor() {
  }

  async addCategory(inputData) {
    await config.mongoDB.collection('categories').insertOne(inputData);
  }

  async getAllCategories() {
    return await config.mongoDB.collection('categories').find({type: 1}, {projection: {_id: 0}}).toArray();
  }
  async getAllCategoriesAndSubCategories() {
    return await config.mongoDB.collection('categories').find({}, {projection: {_id: 0}}).toArray();
  }

  async getCategory(inputData) {
    let result =  await config.mongoDB.collection('categories').find(inputData, {projection: {_id: 0}}).toArray();
    let categoryName;
    if(inputData.parentCategoryId) {
      categoryName = await config.mongoDB.collection('categories').findOne({id:inputData.parentCategoryId},{projection:
          {_id:0,name:1}});
      result = result.map(item=>{
        return {
          ...item,
          category: categoryName ? categoryName.name : null
        }
      })
    } else {
      categoryName = await config.mongoDB.collection('categories').findOne({id:inputData.subParentCategoryId},{projection:
          {_id:0,name:1}});
      result = result.map(item=>{
        return {
          ...item,
          subCategory: categoryName ? categoryName.name : null
        }
      })
    }

    return result;


  }

  async updateCategory(inputData) {
    await config.mongoDB.collection('categories').updateOne({id: inputData.id}, {
      $set: inputData
    });
    return await config.mongoDB.collection('categories').findOne({id: inputData.id}, {projection: {_id: 0}});
  }

  async deleteCategory(inputData) {
    await config.mongoDB.collection('categories').deleteOne({id: inputData.id});
    await config.mongoDB.collection('categoryCost').deleteOne({id: inputData.id});
    await config.redis.hdel('categoryPrice', inputData.id);
  }
}

module.exports = CategoryRepository;