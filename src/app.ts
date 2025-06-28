import express, { Application, Request, Response } from "express";
import { model, Schema } from "mongoose";
import { Note } from "./app/models/notes.models";
import { notesRoutes } from "./app/controlers/notes.controlers";

const app: Application = express();

app.use(express.json());


app.use("/nodes", notesRoutes)

app.get("/", (req: Request, res: Response) => {
  res.send(`Welcome to advance node app`);
});

export default app;
