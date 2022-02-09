import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

export enum ART_TYPES {
  SCULPTURE,
  PICTURES,
  PHOTOS,
  ARCHITECTURE,
}

@Component({
  selector: 'app-add-art-modal',
  templateUrl: './add-art-modal.component.html',
  styleUrls: ['./add-art-modal.component.scss']
})
export class AddArtModalComponent implements OnInit {
  uploadedImages: File[] = [];
  filesCountError: boolean = false;
  artWorkForm: FormGroup;
  art_types = ART_TYPES;

  private checkImgCount() {
   this.filesCountError = this.uploadedImages.length > 4;
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<AddArtModalComponent>,
  ) { }

  ngOnInit(): void {
    this.artWorkForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      files: ['']
    })
  }

  onImageSelected(value: any) {
    this.uploadedImages = [...value.target.files];
    this.artWorkForm.get('files')?.patchValue(this.uploadedImages);
    this.checkImgCount();
  }

  deleteSelectedFile(imgIndex: number) {
    this.uploadedImages.splice(imgIndex, 1);
    this.artWorkForm.get('files')?.patchValue(this.uploadedImages);
    this.checkImgCount();
  }

  submit() {
    const result = {...this.artWorkForm.value}
    this.dialogRef.close(result)
  }
}
