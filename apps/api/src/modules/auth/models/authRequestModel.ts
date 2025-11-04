import { Request } from "express";
import { User } from "src/modules/user/entities/User";
export interface AuthRequestModel extends Request {
    user: User
}