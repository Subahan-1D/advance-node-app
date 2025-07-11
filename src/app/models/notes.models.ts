// model er code

import { model, Schema } from "mongoose";
import { INotes } from "../interfaces/notes.interface";

const noteSchema = new Schema<INotes>(
  {
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
  },
  { versionKey: false, timestamps: true }
);

export const Note = model("Note", noteSchema);
