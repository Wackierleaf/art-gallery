import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-art-modal',
  templateUrl: './add-art-modal.component.html',
  styleUrls: ['./add-art-modal.component.scss']
})
export class AddArtModalComponent implements OnInit {
  uploadedImages: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  onImageSelected(value: any) {
    console.log(value.target.files);
    this.uploadedImages = value.target.files;
  }
}
