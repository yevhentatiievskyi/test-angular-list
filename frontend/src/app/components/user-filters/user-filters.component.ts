import {Component, Input, OnInit} from '@angular/core';
import {RolesDataSourceService} from '../../dataSources/roles-data-source.service';
import {Observable} from 'rxjs';
import {DynamicFilter} from '../../shared/helpers/dynamic-filter';
import {MatDialog} from '@angular/material/dialog';
import {EditUserComponent} from '../dialogs/edit-user/edit-user.component';

@Component({
  selector: 'app-user-filters',
  templateUrl: './user-filters.component.html',
  styleUrls: ['./user-filters.component.scss']
})
export class UserFiltersComponent implements OnInit {
  data: Observable<any>;
  @Input() filter: DynamicFilter;
  role = '';
  search = '';

  constructor(private rolesDataSource: RolesDataSourceService, public dialog: MatDialog) {
    this.data = rolesDataSource.data;
  }

  onChange(): void {
    const { role, search } = this;
    this.filter.values = { role, search };
  }

  onCreate(): void {
    const dialogRef = this.dialog.open(EditUserComponent, { width: '500px'});
  }

  ngOnInit(): void {
    this.rolesDataSource.fetch();
  }
}
