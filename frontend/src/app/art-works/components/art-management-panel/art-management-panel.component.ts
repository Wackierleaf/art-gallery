import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddArtModalComponent} from "../add-art-modal/add-art-modal.component";
import {Subscription} from "rxjs";
import {ArtWorksService} from "../../services/art-works.service";
import {ArtDialogMode} from "../art-card/art-card.component";

@Component({
  selector: 'app-art-management-panel',
  templateUrl: './art-management-panel.component.html',
  styleUrls: ['./art-management-panel.component.scss']
})
export class ArtManagementPanelComponent implements OnInit, OnDestroy {
  @Output() addEvent = new EventEmitter();

  private subList = new Subscription();

  constructor(
    public readonly dialog: MatDialog,
    private readonly artWorkService: ArtWorksService,
  ) { }

  ngOnInit(): void {
  }

  openArtModal() {
   const sub = this.dialog.open(AddArtModalComponent, {
      width: window.innerWidth < 500 && innerWidth < 1000 ? '100vw' : '40%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: window.innerHeight < 900 && window.innerWidth < 500 ? '100%' : 'fit-content',
      data: {mode: ArtDialogMode.Creation}
    }).afterClosed().subscribe(result => {
      const {name, type, description, files} = result;
      this.artWorkService.createArtWorks(name, type, description, files)
        .subscribe(() => this.addEvent.emit());
    });

    this.subList.add(sub);
  }

  ngOnDestroy() {
    this.subList.unsubscribe()
  }
}
