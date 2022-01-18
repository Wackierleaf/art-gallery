import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-art-modal',
  templateUrl: './add-art-modal.component.html',
  styleUrls: ['./add-art-modal.component.scss']
})
export class AddArtModalComponent implements OnInit {
  uploadedImages: File[] = [];
  filesCountError: boolean = false;

  private checkImgCount() {
   this.filesCountError = this.uploadedImages.length > 4;
  }

  constructor() { }

  ngOnInit(): void {
  }

  onImageSelected(value: any) {
    this.uploadedImages = [...value.target.files];
    this.checkImgCount();
  }

  deleteSelectedFile(imgIndex: number) {
    this.uploadedImages.splice(imgIndex, 1);
    this.checkImgCount();
  }
}
