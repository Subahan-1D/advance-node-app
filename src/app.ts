import express, { Application, Request, Response } from "express";
import { model, Schema } from "mongoose";

const app: Application = express();

app.use(express.json());

const noteSchema = new Schema({
  title: { type: String, require: true, trim: true },
  content: { type: String, default: "" },
  category: {
    type: String,
    enum: ["personal", "admin", "Ghost", "Work"],
    default: "admin",
  },
  pinned: { type: Boolean, default: false },
  tags: {
    label: { type: String, require: true },
    color: { type: String, default: "gray" },
  },
});

const Note = model("Note", noteSchema);

app.post("/create-note", async (req: Request, res: Response) => {
  const body = req.body;
  const note = await Note.create(body);

  res.status(201).json({
    success: true,
    message: "note created successful",
    note,
  });
});

app.get("/notes", async (req: Request, res: Response) => {
  const notes = await Note.find();

  res.status(201).json({
    success: true,
    message: "note find successful",
    notes,
  });
});

app.patch("/notes/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateBody = req.body;

  const notes = await Note.findByIdAndUpdate(id, updateBody, { new: true });

  res.status(201).json({
    success: true,
    message: "note updated successfully",
    notes,
  });
});
app.delete("/notes/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  const notes = await Note.findByIdAndDelete(id, { new: true });

  res.status(201).json({
    success: true,
    message: "note delete successfully",
    notes,
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send(`Welcome to advance node app`);
});

export default app;
