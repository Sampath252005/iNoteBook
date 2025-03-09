const mongoose = require("mongoose");

const mongoURI = "mongodb://127.0.0.1:27017/inotebook"; // Use 127.0.0.1 instead of localhost

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB Successfully!");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
    process.exit(1); // Exit process on failure
  }
};

module.exports = connectToMongo;
