import { Schema, Model, model } from 'mongoose';
import {IRole} from "../../../shared/interfaces";

const role= new Schema({
  name: {type: Schema.Types.String, ref: 'User'}
})

export const RoleModel: Model<IRole> = model('Role', role);
