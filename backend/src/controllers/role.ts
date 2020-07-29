import {RoleModel} from "../models";
import {IRole} from "../../../shared/interfaces";

export class RolesController {
  public static list(): Promise<IRole[]>{
    return RoleModel.find().exec();
  }
}
