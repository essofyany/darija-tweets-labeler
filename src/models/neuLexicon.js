import mongoose from "mongoose";

const neuLexiconSchema = new mongoose.Schema({
  neu: {
    type: Object,
    required: true,
  },
});

export default mongoose.models.NeuLexicon ||
  mongoose.model("NeuLexicon", neuLexiconSchema);
