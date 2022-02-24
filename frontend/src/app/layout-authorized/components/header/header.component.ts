import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import {AuthService, IUser} from "../../../auth/services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  isRuLang = true;
  loggedUser: IUser

  constructor(
    private readonly translationService: TranslateService,
    private readonly authService: AuthService
  ) { }

  ngOnInit() {
    this.loggedUser = this.authService.getLoggedUser()
  }

  get translationKey() {
    return this.isRuLang ? _('MAIN.LANGUAGES.RUSSIAN') : _('MAIN.LANGUAGES.ENGLISH');
  }

  get initials() {
    const userName = this.loggedUser.name.split(' ')
    return userName[0].slice(0,1) + userName[1].slice(0,1)
  }

  switchLang() {
    this.isRuLang = !this.isRuLang;
    this.translationService.use(this.isRuLang ? 'ru' : 'en');
  }
}
