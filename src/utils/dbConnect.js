import { connect, disconnect } from "mongoose";

function dbConnect() {
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    createIndexes: true,
  };
  connect(process.env.MONGODB_URL, opts)
    .then(() => {
      console.log("MongoDB is connected");
    })
    .catch((err) => console.log(err));
}

export { dbConnect, disconnect };
