import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(
    private readonly dialogRef: MatDialogRef<RegistrationComponent>,
  ) { }

  ngOnInit(): void {
  }

  submitRegisterForm() {

  }

  close() {
    this.dialogRef.close();
  }
}
