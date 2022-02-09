import {Component, Input, OnInit} from '@angular/core';
import {ArtWork, ArtWorksService} from "../../services/art-works.service";
import {artWorkTypesTranslationMap} from "../../services/art-works.service";
import {ART_TYPES} from "../add-art-modal/add-art-modal.component";

@Component({
  selector: 'app-art-card',
  templateUrl: './art-card.component.html',
  styleUrls: ['./art-card.component.scss']
})
export class ArtCardComponent implements OnInit {
  @Input() artWorkData: ArtWork;
  imgUrl: string;
  constructor(
    readonly artWorksService: ArtWorksService,
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

}
