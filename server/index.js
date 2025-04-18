import express from "express";
import { dbConnect } from "./db/index.js";
import { movieRouter, personRouter } from "./routes/index.js";

const app = express();

app.use(express.json());

app.use("/movies", movieRouter);
app.use(`/person`, personRouter);

app.use((err, _req, res, next) => {
  console.err(err);
  if (err?.status) {
    res
      .status(err?.status)
      .send(err?.message || "Uh oh! An unexpected error occured.");
  }
  res.status(500).send("Uh oh! An unexpected error occured.");
});

try {
  await dbConnect();
  app.listen(3000, () => console.log("Server started on port 3000"));
} catch (error) {
  console.error(error);
}
