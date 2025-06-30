import express, { Request, Response } from "express";
import { User } from "../models/user.model";
import { z } from "zod";
import bcyrpt from "bcryptjs";
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
  try {
    // const body = await CreateUserZodSchema.parse(req.body);
    const body = req.body;
    // console.log(body, "Zod Validation");

    // const password = await bcyrpt.hash(body.password, 10);
    // console.log(password)

    // const users = await User.create(body);

    const user = new User(body);
    const password = await user.hashPassword(body.password);
    user.password = password;
    await user.save();

    res.status(201).json({
      success: true,
      message: "User Create Successfully",
      user,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
      error,
    });
  }
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
