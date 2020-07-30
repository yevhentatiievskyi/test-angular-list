import { Schema, Model, model } from 'mongoose';
import {IRole} from "../../../shared/interfaces";

const role= new Schema({
  name: {type: Schema.Types.String, ref: 'User'}
}, { toJSON: { virtuals: true } });

role.virtual('users', {
  ref: 'User',
  localField: '_id',
  foreignField: 'role'
})

export const RoleModel: Model<IRole> = model('Role', role);
