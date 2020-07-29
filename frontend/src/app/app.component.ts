import {Component, OnInit} from '@angular/core';
import {UsersDataSourceService} from './dataSources/users-data-source.service';
import {DynamicFilter} from './shared/helpers/dynamic-filter';
import {UserServiceService} from './services/user-service.service';
import {EditUserComponent} from './components/dialogs/edit-user/edit-user.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  dataSource: UsersDataSourceService;
  filter: DynamicFilter = new DynamicFilter();

  constructor(dataSource: UsersDataSourceService, private userService: UserServiceService, public dialog: MatDialog) {
    this.dataSource = dataSource;
  }

  ngOnInit(): void {
  }

  async onDelete(id: string): Promise<void>{
    try{
      await this.userService.delete(id).toPromise();
      this.dataSource.refetch();
    } catch (e){
      console.log(e, '########');
    }
  }

  onEdit(): void{
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '250px',
      data: {}
    });
  }
}
