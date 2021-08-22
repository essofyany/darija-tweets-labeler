import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  polarity: {
    type: String,
    required: true,
    default: " ",
  },
});

export default mongoose.models.Tweet || mongoose.model("Tweet", tweetSchema);
