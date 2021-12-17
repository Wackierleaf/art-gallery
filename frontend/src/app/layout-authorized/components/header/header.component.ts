import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  isRuLang = true;

  constructor(
    private readonly translationService: TranslateService
  ) { }

  get translationKey() {
    return this.isRuLang ? 'MAIN.LANGUAGES.RUSSIAN' : 'MAIN.LANGUAGES.ENGLISH';
  }

  switchLang() {
    this.isRuLang = !this.isRuLang;
    this.translationService.use(this.isRuLang ? 'ru' : 'en');
  }
}
