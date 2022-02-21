import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ArtWork, ArtWorksService} from "../../services/art-works.service";
import {artWorkTypesTranslationMap} from "../../services/art-works.service";
import {ART_TYPES} from "../add-art-modal/add-art-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {DeleteDialogComponent} from "../../../common/delete-dialog/delete-dialog.component";

@Component({
  selector: 'app-art-card',
  templateUrl: './art-card.component.html',
  styleUrls: ['./art-card.component.scss']
})
export class ArtCardComponent implements OnInit {
  @Input() artWorkData: ArtWork;
  @Output() delete = new EventEmitter()
  imgUrl: string;
  constructor(
    readonly artWorksService: ArtWorksService,
    private readonly dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.imgUrl = 'http://localhost:3000/api/image?path=' + this.artWorkData.imagesPaths[0]
  }

  get getTranslationKey() {
    const key = artWorkTypesTranslationMap.get(+this.artWorkData.type);
    if (typeof key === 'string') {
      return key
    } else {
      return  '';
    }
  }

  openConfirmationDialog() {
    const dialogRef = this.dialog.open(DeleteDialogComponent)
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result) {
        this.artWorksService.deleteArtWork(this.artWorkData._id).subscribe(() => this.delete.emit(result))
      }
    })
  }
}
