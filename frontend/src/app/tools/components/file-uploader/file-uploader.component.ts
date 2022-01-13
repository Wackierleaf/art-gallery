import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";
@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit, OnDestroy {

  @Input() config!: {
    API: string,
    MIME_types_accepted: string,
    is_multiple_selection_allowed: boolean,
    data: any
  };

  selected_files: {
    file: any,
    is_upload_in_progress: boolean,
    upload_result: any
  }[] = [];

  @ViewChild("fileSelector", {static: false}) file_selector!: ElementRef;

  file_selection_form: FormGroup;

  // Subscriptions
  private file_selection_sub!: Subscription;
  private file_upload_sub!: Subscription;

  constructor(
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
  ) {
    this.file_selection_form = new FormGroup({
      file_selection: new FormControl()
    });
  }

  private showSnackbar(message?: string) {
    setTimeout(()=>{
      if (message != null) {
        let snackar_ref = this.snackbar.open(
          message,
          'OK',
          {panelClass: 'modhyobitto-snackbar'});
      }
    },1200);
  }

  private displayAlterDialog(options?: any) {
    let dialog_ref = this.dialog.open(
      DialogComponent,
      options,
    )
  }

  ngOnInit(): void {
    this.trackFileSelection();
  }

  openFileSelector(){
    const file_selection = this.file_selector.nativeElement;
    file_selection.click();
  }

  trackFileSelection(){
    this.file_selection_sub = this.file_selection_form.get('file_selection')?.valueChanges.subscribe(
      ()=>{
        const file_selection = this.file_selector.nativeElement;
        this.selectFiles(file_selection.files);
        this.file_selector.nativeElement.value = '';
      }
    ) as Subscription;
  }

  selectFiles(incoming_files: any[]){
    let incoming_file_count  = incoming_files.length;
    let incorrect_MIME_type = false;
    for(let i = 0; i < incoming_file_count; i++){
      let incoming_file = incoming_files[i];
      // Checking if MIME type is acceptable
      if(!this.config.MIME_types_accepted || this.config.MIME_types_accepted.indexOf(incoming_file.type)>=0){
        let selected_file = {
          file: incoming_file,
          is_upload_in_progress: false,
          upload_result: null
        };
        this.selected_files.push(selected_file);
      }else{
        incorrect_MIME_type = true;
      }
    }
    // Display error
    if(incorrect_MIME_type){
      let message = "Only files of the following MIME types are allowed: "+this.config.MIME_types_accepted;
      this.showSnackbar(message);
    }
  }

  uploadFile(index: number){
    let file_for_upload = this.selected_files[index];

    const form_data = new FormData();
    form_data.append('file', file_for_upload.file);

    // For other fields, we have to use append() as well
    // E.g. form_data.append('thikana', 'Bishadbari Lane');

    file_for_upload.is_upload_in_progress = true;
    file_for_upload.upload_result = null;

  }

  uploadAll(){
    let selected_file_count  = this.selected_files.length;
    for(let i = 0; i < selected_file_count; i++){
      let selected_file = this.selected_files[i];
      // Checking if the file can be uploaded
      if(!selected_file.is_upload_in_progress && selected_file.upload_result!='success'){
        this.uploadFile(i);
      }
    }
  }

  inititateFileCancel(index: number){
    let file_for_upload = this.selected_files[index];
    if(file_for_upload.is_upload_in_progress){
      this.displayFileUploadAbortConfirmation(
        ()=>{
          this.cancelFile(index);
        }
      );
    }else{
      this.cancelFile(index);
    }
  }

  displayFileUploadAbortConfirmation(cancel_method: any){
    this.displayAlterDialog({
      data:{
        title: "Abort File Upload?",
        message: "Upload is already in progress. Aborting now might lead to data inconsistencies.",
        dismiss_text: 'Dismiss',
        action_text: 'Abort',
        action: ()=>{
          cancel_method();
        }
      }
    });
  }

  cancelFile(index: number){
    this.selected_files.splice(index, 1);
  }

  initiateCancelAll(){
    let selected_file_count  = this.selected_files.length;
    let is_any_file_being_uploaded = false;
    for(let i = 0; i < selected_file_count; i++){
      let selected_file = this.selected_files[i];
      // Checking if the file is being uploaded
      if(selected_file.is_upload_in_progress){
        is_any_file_being_uploaded = true;
        break;
      }
    }
    if(is_any_file_being_uploaded){
      this.displayFileUploadAbortConfirmation(
        ()=>{
          this.cancelAll();
        }
      );
    }else{
      this.cancelAll();
    }
  }

  cancelAll(){
    let selected_file_count  = this.selected_files.length;
    for(let i = 0; i < selected_file_count; i++){
      this.selected_files.splice(0, 1);
    }
  }

  isAnyFileNotUploaded(){
    let selected_file_count  = this.selected_files.length;
    let is_any_file_not_uploaded = false;
    for(let i = 0; i < selected_file_count; i++){
      let selected_file = this.selected_files[i];
      // Checking if the file can be uploaded
      if(!selected_file.is_upload_in_progress && selected_file.upload_result!='success'){
        is_any_file_not_uploaded = true;
        break;
      }
    }
    return is_any_file_not_uploaded;
  }

  ngOnDestroy(): void {

  }
}
