import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ArtWork, ArtWorksService} from "../../services/art-works.service";
import {artWorkTypesTranslationMap} from "../../services/art-works.service";
import {AddArtModalComponent, ART_TYPES} from "../add-art-modal/add-art-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {DeleteDialogComponent} from "../../../common/delete-dialog/delete-dialog.component";
import {Subscription} from "rxjs";

export enum ArtDialogMode {
  Creation,
  Editing
}

@Component({
  selector: 'app-art-card',
  templateUrl: './art-card.component.html',
  styleUrls: ['./art-card.component.scss']
})
export class ArtCardComponent implements OnInit, OnDestroy {
  @Input() artWorkData: ArtWork;
  @Output() delete = new EventEmitter()
  @Output() edit = new EventEmitter()
  imgUrl: string;

  private subList = new Subscription();
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

  editArtWork() {
    const dialogData = {
      width: window.innerWidth < 500 && innerWidth < 1000 ? '100vw' : '40%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: window.innerHeight < 900 && window.innerWidth < 500 ? '100%' : 'fit-content',
      data: {mode: ArtDialogMode.Editing,...this.artWorkData}
    }
    const dialogRef = this.dialog.open(AddArtModalComponent, dialogData)
    this.subList.add(
      dialogRef.afterClosed().subscribe(result => {
        if (result.mode === ArtDialogMode.Editing) {
          this.artWorksService.deleteArtWork(result.id).subscribe(() => {
            // @ts-ignore
            this.artWorksService.createArtWorks(result.name, result.type, result.description, result.files).subscribe((newArtWork) => {
              if (result.paths.lenght !== 0) {
                // @ts-ignore
                this.artWorksService.patchPaths(newArtWork.id, result.paths).subscribe(() => {
                  this.edit.emit(true)
                })
              } else {
                this.edit.emit(true)
              }
            })
          })
        }
      })
    )
  }

  ngOnDestroy() {
    this.subList.unsubscribe()
  }
}
