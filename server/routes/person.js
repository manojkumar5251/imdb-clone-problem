import { Router } from "express";
import { PersonModal, PersonTypeEnum } from "../models/index.js";

export const personRouter = Router();

personRouter.use("/:category", (req, res, next) => {
  const { category } = req.params;

  if (!PersonTypeEnum[category]) {
    next({ status: 404, message: "Invalid URL" });
  }
  next();
});

personRouter.get("/:category", async (req, res) => {
  const { category } = req.params;
  const allPerson = await PersonModal.find({
    category,
  });
  return res.status(200).json(allPerson);
});

personRouter.get("/:category/:id", async (req, res) => {
  const { id, category } = req.params;
  const person = await PersonModal.findOne({
    _id: id,
    category,
  });
  return res.status(200).json(person);
});

personRouter.post("/:category/", async (req, res) => {
  const { category } = req.params;
  const newPerson = new PersonModal({
    ...req.body,
    category,
  });
  const insertedPerson = await newPerson.save();
  return res.status(201).json(insertedPerson);
});

personRouter.put("/:category/:id", async (req, res) => {
  const { id, category } = req.params;
  await PersonModal.updateOne({ _id: id }, { ...req.body, category });
  const updatedPerson = await PersonModal.findById(id);
  return res.status(200).json(updatedPerson);
});

personRouter.delete("/:category/:id", async (req, res) => {
  const { id, category } = req.params;
  const deletedPerson = await PersonModal.findByIdAndDelete(id);
  return res.status(200).json(deletedPerson);
});
