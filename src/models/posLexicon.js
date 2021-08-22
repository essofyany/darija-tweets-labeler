import mongoose from "mongoose";

const posLexiconSchema = new mongoose.Schema({
  pos: {
    type: Object,
    required: true,
  },
});

export default mongoose.models.PosLexicon ||
  mongoose.model("PosLexicon", posLexiconSchema);
