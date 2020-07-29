import { Schema, Model, model, Document } from 'mongoose';
import {IUser} from "../../../shared/interfaces";

const user = new Schema({
  firstname: {type: Schema.Types.String},
  lastname: {type: Schema.Types.String},
  email: {type: Schema.Types.String},
  role: {type: Schema.Types.ObjectId, ref: 'Role'},
});

export const UserModel: Model<IUser> = model('User', user);
