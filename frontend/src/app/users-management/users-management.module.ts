import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from './user-management/user-management.component';
import {MaterialExModule} from "../tools/material.module";



@NgModule({
  declarations: [
    UserManagementComponent
  ],
  imports: [
    CommonModule,
    MaterialExModule,
  ]
})
export class UsersManagementModule { }
