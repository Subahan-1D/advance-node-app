import express, { Request, Response } from "express";
import { User } from "../models/user.model";
import { z } from "zod";

export const userRoutes = express.Router();

const CreateUserZodSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  age: z.number(),
  email: z.string(),
  password: z.string(),
  role: z.string().optional(),
});

userRoutes.post("/create-user", async (req: Request, res: Response) => {
  const body = req.body;

  const users = await User.create(body);

  res.status(201).json({
    success: true,
    message: "User Create Successfully",
    users,
  });
});
userRoutes.get("/", async (req: Request, res: Response) => {
  const users = await User.find();

  res.status(201).json({
    success: true,
    message: "User get Successfully",
    users,
  });
});
userRoutes.patch("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const userBody = req.body;
  const users = await User.findByIdAndUpdate(id, userBody, { new: true });
  res.status(201).json({
    success: true,
    message: "User update  Successfully",
    users,
  });
});
userRoutes.delete("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const users = await User.findByIdAndDelete(id, { new: true });
  res.status(201).json({
    success: true,
    message: "User delete  Successfully",
    users,
  });
});
