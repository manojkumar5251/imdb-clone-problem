import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  yor: {
    type: String,
  },
  plot: {
    type: String,
  },
  poster: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  updatedAt: {
    type: Date,
  },
});

MovieSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

MovieSchema.pre("updateOne", { document: true, query: true }, function (next) {
  this.setUpdate({ ...this.getUpdate(), updatedAt: Date.now() })
  next();
});

export const MovieModal = mongoose.model("Movie", MovieSchema);
