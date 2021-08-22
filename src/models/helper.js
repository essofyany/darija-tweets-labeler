import mongoose from "mongoose";

const helperSchema = new mongoose.Schema({
  chunckIndifier: {
    type: Number,
    required: true,
  },
});

export default mongoose.models.Helper || mongoose.model("Helper", helperSchema);
