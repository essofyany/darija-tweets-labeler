import mongoose from "mongoose";

const negLexiconSchema = new mongoose.Schema({
  neg: {
    type: Object,
    required: true,
  },
});

export default mongoose.models.NegLexicon ||
  mongoose.model("NegLexicon", negLexiconSchema);
