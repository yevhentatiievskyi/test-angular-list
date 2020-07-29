import { Injectable } from '@angular/core';
import {IUserWithRole} from '../../../../shared/interfaces';
import {MatPaginator} from '@angular/material/paginator';
import {BaseDataSourceService} from './base-data-source.service';
import {UserServiceService} from '../services/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class UsersDataSourceService extends BaseDataSourceService<IUserWithRole> {
  data: IUserWithRole[] = [];
  paginator: MatPaginator;
  columns: string[] = ['firstname', 'lastname', 'email', 'role.name', 'actions'];

  constructor(service: UserServiceService) {
    super(service);
  }
}
