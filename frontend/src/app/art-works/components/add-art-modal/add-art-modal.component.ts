import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ArtWork} from "../../services/art-works.service";
import {ArtDialogMode} from "../art-card/art-card.component";
import {TranslateService} from "@ngx-translate/core";
import {marker as _} from '@biesbjerg/ngx-translate-extract-marker';

export enum ART_TYPES {
  SCULPTURE,
  PICTURES,
  PHOTOS,
  ARCHITECTURE,
}

export interface ArtModalData extends ArtWork{
  mode: ArtDialogMode
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
  mode: ArtDialogMode = 1;
  imagesPreviews: any[] = []
  imagesWasEdit: boolean = false;

  private checkImgCount() {
   this.filesCountError = this.uploadedImages.length > 4;
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<AddArtModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ArtModalData,
    private readonly translateService: TranslateService
  ) {
    this.mode = data.mode
  }

  ngOnInit(): void {
    this.buildForm()
    if (this.mode === ArtDialogMode.Editing) {
      this.data.imagesPaths.forEach(path => {
        this.imagesPreviews.push('http://localhost:3000/api/image?path=' + path)
      })
    }
  }

  private buildForm() {
    if (this.mode === ArtDialogMode.Editing) {
      this.artWorkForm = this.formBuilder.group({
        name: [this.data.name, Validators.required],
        type: [Number(this.data.type), Validators.required],
        description: [this.data.description, Validators.required],
        files: ['']
      })
    }

    if (this.mode === ArtDialogMode.Creation) {
      this.artWorkForm = this.formBuilder.group({
        name: ['', Validators.required],
        type: ['', Validators.required],
        description: ['', Validators.required],
        files: ['']
      })
    }
  }

  get dialogTitle() {
    if (this.mode === ArtDialogMode.Creation) {
      return this.translateService.get(_('ART-MANAGEMENT.DIALOG.TITLE'))
    }

    if (this.mode === ArtDialogMode.Editing) {
      return this.translateService.get(_('ART-MANAGEMENT.DIALOG.EDITING-TITLE'))
    }

    return
  }

  get submitBtnName() {
    if (this.mode === ArtDialogMode.Creation) {
      return this.translateService.get(_('COMMON.ADD'))
    }

    if (this.mode === ArtDialogMode.Editing) {
      return this.translateService.get(_('COMMON.SAVE'))
    }

    return
  }

  onImageSelected(value: any) {
    this.uploadedImages = [...value.target.files];
    this.artWorkForm.get('files')?.patchValue(this.uploadedImages);
    this.checkImgCount();

    this.uploadedImages.forEach(img => this.getPrevsOfImages(img))
  }

  deleteSelectedFile(imgIndex: number) {
    if (this.mode === ArtDialogMode.Creation) {
      this.uploadedImages.splice(imgIndex, 1);
      this.imagesPreviews.splice(imgIndex, 1)
      this.artWorkForm.get('files')?.patchValue(this.uploadedImages);
      this.checkImgCount();
    }

    if (this.mode === ArtDialogMode.Editing) {
      this.data.imagesPaths.splice(imgIndex, 1)
      this.imagesPreviews.splice(imgIndex, 1)
      this.imagesWasEdit = true;
    }
  }

  deleteImagePath(pathIdx: number) {
    this.data.imagesPaths.splice(pathIdx, 1)
  }

  getPrevsOfImages(file: any) {
     const reader = new FileReader()
     reader.onloadend =  () => {
       this.imagesPreviews.push(reader.result)
     }

     if(file) {
       reader.readAsDataURL(file)
     }
   }


  submit() {
    const result = {id: this.data._id, imagesWasEdit: this.imagesWasEdit, paths: this.data.imagesPaths, mode: this.mode,...this.artWorkForm.value}
    this.dialogRef.close(result)
  }
}
