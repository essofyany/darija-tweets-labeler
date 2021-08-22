import mongoose from "mongoose";

const labeledTweetSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  polarity: {
    type: String,
    required: true,
  },
});

export default mongoose.models.LabeledTweet ||
  mongoose.model("LabeledTweet", labeledTweetSchema);
