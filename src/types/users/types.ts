import { type Request } from "express";
import { type JwtPayload } from "jsonwebtoken";

export interface UserCredentials {
  password: string;
  email: string;
}

export interface UserStructure extends UserCredentials {
  username: string;
}

export interface CustomJwtPayload extends JwtPayload {
  email: string;
  id: string;
}

export interface CustomRequest extends Request {
  owner: string;
  id: string;
}
