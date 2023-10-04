const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connection = mongoose
  .connect(process.env.mongo_db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async (res) => {
    console.log("Database connected successfully!!!");
  })
  .catch((error) => {
    console.log("Not connected sorry!!", error);
    process.exit(1);
  });

exports = connection;
