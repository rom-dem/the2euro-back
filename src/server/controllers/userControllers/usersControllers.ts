import "../../../loadEnvironments.js";
import { type NextFunction, type Request, type Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  type UserCredentials,
  type CustomJwtPayload,
  type UserStructure,
} from "../../../types/users/types.js";
import User from "../../../database/models/User/User.js";
import { CustomError } from "../../../CustomError/CustomError.js";

export const loginUser = async (
  req: Request<
    Record<string, unknown>,
    Record<string, unknown>,
    UserCredentials
  >,
  res: Response,
  next: NextFunction
) => {
  const { password, email } = req.body;

  try {
    const user = await User.findOne({ email }).exec();

    if (!user) {
      const error = new CustomError(
        "No user with this email",
        401,
        "Wrong credentials"
      );

      throw error;
    }

    if (!(await bcrypt.compare(password, user.password))) {
      const error = new CustomError("Wrong password", 401, "Wrong credentials");

      throw error;
    }

    const jwtPayload: CustomJwtPayload = {
      email: user.email,
      id: user._id.toString(),
    };

    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET!);

    res.status(200).json({ token });
  } catch (error: unknown) {
    next(error);
  }
};

export const registerUser = async (
  req: Request<Record<string, unknown>, Record<string, unknown>, UserStructure>,
  res: Response,
  next: NextFunction
) => {
  const { password, email, username } = req.body;
  const saltLength = 10;

  try {
    const hashedPassword = await bcrypt.hash(password, saltLength);
    await User.create({ email, username, password: hashedPassword });

    res.status(201).json({ message: "The user has been created" });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      500,
      "There was an issue creating a new user"
    );
    next(customError);
  }
};
