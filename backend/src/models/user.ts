import { Schema, Model, model } from 'mongoose';
import {IUser} from "../../../shared/interfaces";

const user = new Schema({
  firstname: {type: Schema.Types.String, required: [true, 'First name required']},
  lastname: {type: Schema.Types.String, required: [true, 'Last name required']},
  email: {type: Schema.Types.String, required: [true, 'Email required'], validate:[ /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/, 'Email is invalid']},
  role: {type: Schema.Types.ObjectId, ref: 'Role', required: [true, 'Role required']},
});

export const UserModel: Model<IUser> = model('User', user);
