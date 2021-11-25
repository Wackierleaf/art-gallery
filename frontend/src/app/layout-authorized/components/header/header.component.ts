import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isRuLang = true;

  constructor(
    private readonly translationService: TranslateService
  ) { }

  ngOnInit(): void {

  }

  switchLang() {
    this.isRuLang = !this.isRuLang;
    this.translationService.use(this.isRuLang ? 'ru' : 'en');
  }
}
