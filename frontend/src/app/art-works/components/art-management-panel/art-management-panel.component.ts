import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddArtModalComponent} from "../add-art-modal/add-art-modal.component";
import {Subscription} from "rxjs";
import {ArtWorksService} from "../../services/art-works.service";

@Component({
  selector: 'app-art-management-panel',
  templateUrl: './art-management-panel.component.html',
  styleUrls: ['./art-management-panel.component.scss']
})
export class ArtManagementPanelComponent implements OnInit, OnDestroy {
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
    }).afterClosed().subscribe(result => {
      const {name, type, description, files} = result;
      this.artWorkService.createArtWorks(name, type, description, files)
        .subscribe();
    });

    this.subList.add(sub);
  }

  ngOnDestroy() {
    this.subList.unsubscribe()
  }
}
