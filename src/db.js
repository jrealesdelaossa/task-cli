const { connect, connection } = require("mongoose");
require("./config");

const connectDB = async () => {
  await connect(
    "mongodb://jreales:jandp012999@ac-ezvpmgf-shard-00-00.rsctfn9.mongodb.net:27017,ac-ezvpmgf-shard-00-01.rsctfn9.mongodb.net:27017,ac-ezvpmgf-shard-00-02.rsctfn9.mongodb.net:27017/?replicaSet=atlas-lrqzo0-shard-0&ssl=true&authSource=admin",
  );
  // console.log("DB connected");
  connection.on("error", (err) => console.log(err));
};

module.exports = {
  connectDB,
  connection,
};
