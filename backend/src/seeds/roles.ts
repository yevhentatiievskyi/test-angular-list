import {IRole, RoleEnum, Seeder} from "../../../shared/interfaces";
import {RoleModel} from "../models";

export class RolesSeeder extends Seeder<IRole>{
  get data(): any {
    return Object.values(RoleEnum).map((v) => ({ name: v}));
  }

  protected model = RoleModel;
}
