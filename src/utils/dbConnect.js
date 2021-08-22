import { connect, disconnect } from "mongoose";

function dbConnect() {
  //   const MONGODB_URL = process.env.MONGODB_URL;
  const MONGODB_URL =
    "mongodb+srv://bilal:bilal_1996@tweetscluster.vmmub.mongodb.net/tweetLaber?authSource=admin&replicaSet=atlas-7va01t-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    createIndexes: true,
  };
  connect(MONGODB_URL, opts)
    .then(() => {
      console.log("MongoDB is connected");
    })
    .catch((err) => console.log(err));
}

export { dbConnect, disconnect };
