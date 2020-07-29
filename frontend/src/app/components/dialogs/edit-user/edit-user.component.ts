import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RolesDataSourceService} from '../../../dataSources/roles-data-source.service';
import {Observable} from 'rxjs';

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
    private rolesDataSource: RolesDataSourceService
  ) { }

  ngOnInit(): void {
    this.isNew = !this.data;
    this.userForm = this.fb.group({
      firstname: [this.data?.firstname, Validators.required],
      lastname: [this.data?.lastname, Validators.required],
      email: [this.data?.email, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      role: [this.data?.role, Validators.required],
    });
    this.roles = this.rolesDataSource.data;
  }

  onSubmit(): void {
    console.log(this.userForm);
  }

  cancel(): void{
    this.dialogRef.close();
  }

}
