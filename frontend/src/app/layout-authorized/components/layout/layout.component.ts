import { Component, OnInit } from '@angular/core';
import {ArtWork, ArtWorksService} from "../../../art-works/services/art-works.service";
import {Observable} from "rxjs";
import {debounceTime} from "rxjs/operators";
import {AuthService, IUser} from "../../../auth/services/auth.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  artWorks$: Observable<ArtWork[]>;
  loggedUser: IUser

  readonly tabs = [
    'Выставка',
    'Коллекции',
    'О галереи',
    'Контакты'
  ]

  constructor(
    private readonly artWorksService: ArtWorksService,
    private readonly authSerive: AuthService
  ) { }

  private init() {
    this.artWorks$ = this.artWorksService.getArtWorks()
  }

  ngOnInit(): void {
    this.init()
    this.loggedUser = this.authSerive.getLoggedUser()
  }


  addNewArtWorkHandler() {
    this.init()
  }

  artWorkDeleteHandler(result: boolean) {
    if (result) {
      this.init()
    }
  }

  artWorkEditHandler($event: any) {
    if ($event) {
      this.init()
    }
  }

  search(searchValue: string) {
    if (searchValue.length === 0) {
      this.init()
    }
    if (searchValue.length > 2) {
      this.artWorks$ = this.artWorksService.search(searchValue)
    }
  }
}
