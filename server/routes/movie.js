import { Router } from "express";
import { MovieModal } from "../models/index.js";

export const movieRouter = Router();

movieRouter.get("/", async (req, res) => {
  const allMovies = await MovieModal.find();
  return res.status(200).json(allMovies);
});

movieRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const movie = await MovieModal.findById(id);
  return res.status(200).json(movie);
});

movieRouter.post("/", async (req, res) => {
  const newMovie = new MovieModal({ ...req.body });
  const insertedMovie = await newMovie.save();
  return res.status(201).json(insertedMovie);
});

movieRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  await MovieModal.updateOne({ _id: id }, req.body);
  const updatedMovie = await MovieModal.findById(id);
  return res.status(200).json(updatedMovie);
});

movieRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedMovie = await MovieModal.findByIdAndDelete(id);
  return res.status(200).json(deletedMovie);
});
