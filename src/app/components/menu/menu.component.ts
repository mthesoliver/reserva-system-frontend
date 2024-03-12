import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { TokenService } from 'src/app/services/token.service';
import { SharedModule } from 'src/app/modules/common-module/shared';
import { LoginComponent } from '../login/login.component';
import { MenuVisibilityService } from 'src/app/services/menu-visibility.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    IonicModule,
    SharedModule
  ],
  providers:[LoginComponent]
})
export class MenuComponent implements OnInit {

  logout_uri = environment.logout_url;
  isLogged: boolean;
  isAdmin: boolean;

  menuVisibility:boolean;

  constructor(private router: Router, private tokenService: TokenService, private login:LoginComponent, private menuVisibilityService: MenuVisibilityService) { }

  ngOnInit(): void {
    this.getLogged();

    this.menuVisibilityService.menuVisibility$.subscribe(visibility => {
      this.menuVisibility = visibility;
    });
  }

  onLogout(): void {
    location.href = this.logout_uri;
  }

  onLogin(){
    this.login.onLogin();
  }

  getLogged() {
    this.isLogged = this.tokenService.isLogged();
    this.isAdmin = this.tokenService.idAdmin();
  }

}
