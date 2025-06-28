import express, { Request, Response } from "express";
import { Note } from "../models/notes.models";
export const notesRoutes = express.Router();

// controlers api

notesRoutes.post("/create-note", async (req: Request, res: Response) => {
  const body = req.body;
  const note = await Note.create(body);

  res.status(201).json({
    success: true,
    message: "note created successful",
    note,
  });
});

notesRoutes.get("/", async (req: Request, res: Response) => {
  const notes = await Note.find();

  res.status(201).json({
    success: true,
    message: "note find successful",
    notes,
  });
});

notesRoutes.patch("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateBody = req.body;

  const notes = await Note.findByIdAndUpdate(id, updateBody, { new: true });

  res.status(201).json({
    success: true,
    message: "note updated successfully",
    notes,
  });
});
notesRoutes.delete("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  const notes = await Note.findByIdAndDelete(id, { new: true });

  res.status(201).json({
    success: true,
    message: "note delete successfully",
    notes,
  });
});
