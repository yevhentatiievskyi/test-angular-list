import { UserModel } from '../models';
import {Request} from "express";

export class UserController {
  static list({ query }: Request){
    const { role, search } = query;
    let dbQuery = role ? { role } : {};
    if(search) {
      const q = {
        $or: [
          { firstname: { $regex: search, $options: "i" }},
          { lastname: { $regex: search, $options: "i" }},
          { email: { $regex: search, $options: "i" }},
        ]
      };
      dbQuery = { ...dbQuery, ...q};
    }
    return UserModel.find(dbQuery).populate('role').exec();
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

  static async checkEmail({ params }: Request){
    return UserModel.countDocuments({ email: params.email});
  }
}
