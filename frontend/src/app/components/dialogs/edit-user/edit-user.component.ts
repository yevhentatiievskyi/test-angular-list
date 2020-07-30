import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RolesDataSourceService} from '../../../dataSources/roles-data-source.service';
import {Observable} from 'rxjs';
import {UserServiceService} from '../../../services/user-service.service';
import {UsersDataSourceService} from '../../../dataSources/users-data-source.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  userForm: FormGroup;
  isNew = false;
  roles: Observable<any[]>;

  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private rolesDataSource: RolesDataSourceService,
    private userService: UserServiceService,
    private userDataSource: UsersDataSourceService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.isNew = !this.data;
    this.userForm = this.fb.group({
      firstname: [this.data?.firstname, [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
      lastname: [this.data?.lastname, [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
      email: [this.data?.email, [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          ], [ this.checkEmail.bind(this) ]
      ],
      role: [this.data?.role, Validators.required],
    });
    this.roles = this.rolesDataSource.availableRoles(this.data?._id);
  }

  async onSubmit(): Promise<void> {
    if (this.userForm.valid){
      const targetFn = this.isNew
        ? this.userService.create.bind(this.userService, this.userForm.value)
        : this.userService.update.bind(this.userService, this.data._id, this.userForm.value);
      try {
        await targetFn().toPromise();
        this.userDataSource.refetch();
        this.snackBar.open('Item saved', 'success', { duration: 2000});
        this.cancel();
      }catch (e){
        this.snackBar.open(e.message, 'error', { duration: 2000});
      }
    }
  }

  cancel(): void{
    this.dialogRef.close();
  }

  async checkEmail(e: FormControl): Promise<any>{
    if (!this.isNew) { return null; }
    const isExists = await this.userService.checkEmail(e.value).toPromise();
    return isExists ? { exists: true} : null;
  }

}
