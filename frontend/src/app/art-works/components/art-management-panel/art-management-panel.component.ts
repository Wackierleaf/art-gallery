import {AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddArtModalComponent} from "../add-art-modal/add-art-modal.component";
import {fromEvent, Subscription} from "rxjs";
import {ArtWorksService} from "../../services/art-works.service";
import {ArtDialogMode} from "../art-card/art-card.component";
import {debounceTime, distinctUntilChanged, filter, map} from "rxjs/operators";
import {AuthService, IUser} from "../../../auth/services/auth.service";

@Component({
  selector: 'app-art-management-panel',
  templateUrl: './art-management-panel.component.html',
  styleUrls: ['./art-management-panel.component.scss']
})
export class ArtManagementPanelComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output() addEvent = new EventEmitter();
  @Output() searchEvent = new EventEmitter();
  @ViewChild('artWorkSearch') searchInp: ElementRef;

  private subList = new Subscription();
  loggedUser: IUser | null

  constructor(
    public readonly dialog: MatDialog,
    private readonly artWorkService: ArtWorksService,
    private readonly authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loggedUser = this.authService.getLoggedUser()
  }

  ngAfterViewInit() {
    fromEvent(this.searchInp.nativeElement, 'keyup').pipe(
      map((event: any) => event.target.value),
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe((text: string) => {
      this.searchEvent.emit(text)
    })
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
