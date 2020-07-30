import {RoleModel} from "../models";
import {IRole} from "../../../shared/interfaces";
import {Request} from "express";

export class RolesController {
  public static list(): Promise<IRole[]>{
    return RoleModel.find().exec();
  }

  public static async availableList({ params }: Request): Promise<IRole[]>{
    const roles = await RoleModel.find().populate('users').exec();
    return roles.filter(({ name, users }) => RolesController.isExist(users, params.id) || name !== 'Art Manager');
  }

  public static isExist(users: any[], id: string){
    return !users.length || users.find(({_id}: any) => _id.toString() === id);
  }
}
