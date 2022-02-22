import { Component, OnInit } from '@angular/core';
import {ArtWork, ArtWorksService} from "../../../art-works/services/art-works.service";
import {Observable} from "rxjs";
import {debounceTime} from "rxjs/operators";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  artWorks$: Observable<ArtWork[]>;

  readonly tabs = [
    'Выставка',
    'Коллекции',
    'О галереи',
    'Контакты'
  ]

  constructor(
    private readonly artWorksService: ArtWorksService
  ) { }

  private init() {
    this.artWorks$ = this.artWorksService.getArtWorks()
  }

  ngOnInit(): void {
    this.init()
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
}
