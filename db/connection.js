const mongoose = require("mongoose");

const connection = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URL}`);
    console.log(" MongoDB is now Connected");
  } catch (error) {
    console.log(`Error While Connecting to the DataBase -${error}`);
  }
};
module.exports = connection;
