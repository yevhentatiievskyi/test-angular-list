import { Document, Model } from 'mongoose';

export interface IRole extends Document {
  name: string;
  users?: any[]
}

export interface IBasicUser {
  firstname: string;
  lastname: string;
  email: string;
  role: string | any;
}

export interface IUser extends Document, IBasicUser {}

export interface IUserWithRole extends IBasicUser {
  firstname: string;
  lastname: string;
  email: string;
  role: {
    name: string
  };
}

export abstract class Seeder<T extends Document> {
  protected abstract model: Model<T>;

  async run(){
    const count = await this.model.countDocuments().exec();
    return count ? count : this.model.create(this.data);
  }

  abstract get data(): any
}

export enum RoleEnum {
  Artist = "Artist",
  Designer = "Designer",
  Manager = "Art Manager"
}

export interface ITableCell {
  readonly title: string,
  readonly key: string
}

