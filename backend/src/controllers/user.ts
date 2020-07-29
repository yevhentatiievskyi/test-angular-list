import { UserModel } from '../models';
import {Request} from "express";

export class UserController {
  static list(){
    return UserModel.find().populate('role').exec();
  }

  static addUser({ body }: Request){
    return UserModel.create(body);
  }

  static updateUser({ body, params }: Request){
    return UserModel.findByIdAndUpdate(params.id, body, { new: true }).populate('role');
  }

  static deleteUser({ params }: Request){
    return UserModel.findByIdAndDelete(params.id);
  }
}
