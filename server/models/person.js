import mongoose from "mongoose";

export const PersonTypeEnum = {
  actor: "actor",
  producer: "producer",
};

const PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
  },
  dob: {
    type: Number,
  },
  bio: {
    type: String,
  },
  category: {
    type: String,
    required: true,
    enum: Object.keys(PersonTypeEnum),
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

PersonSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

PersonSchema.pre("updateOne", { document: true, query: true }, function (next) {
  this.setUpdate({ ...this.getUpdate(), updatedAt: Date.now() });
  next();
});

export const PersonModal = mongoose.model("Person", PersonSchema);
