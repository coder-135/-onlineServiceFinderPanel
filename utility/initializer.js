const mongodb = require('mongodb');
const Redis = require("ioredis");

class Config {

  static async initMongo() {
    Config.redis = new Redis(
      {
        port: process.env.HIVE_REDIS_PORT,
        host: process.env.HIVE_REDIS_SERVER,
        password: process.env.HIVE_REDIS_PASSWORD,
        connectTimeout: 10000,
        db: 0,
      });
    const mongoUsername = process.env.HIVE_MONGO_USERNAME
    const mongoPassword = process.env.HIVE_MONGO_PASSWORD
    Config.mongoConfig = {
      server: process.env.HIVE_MONGO_SERVER,
      port: process.env.HIVE_MONGO_PORT,
    };
    Config.databaseName = process.env.HIVE_MONGO_DATABASE;
    const mongoUrl = `mongodb://${mongoUsername}:${mongoPassword}@${Config.mongoConfig.server}:${Config.mongoConfig.port}`

    Config.mongoDBConnection = await mongodb.MongoClient.connect(
      mongoUrl,
      {useNewUrlParser: true}
    );
    Config.mongoDB = Config.mongoDBConnection.db(Config.databaseName);
  }


  static async Initialize() {
    await Config.initMongo();
  }
}

module.exports = Config;


