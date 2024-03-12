import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HttpModuleModule } from '../modules/http-module/http-module.module';
import { UsersService } from '../services/users.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    HttpModuleModule
  ],
})
export class HomePage implements OnInit {

  message: any;

  constructor(private userService: UsersService, private tokenService: TokenService) {
  }


  ngOnInit(): void {
    console.log(btoa('reserva-com:secret'));

  }

}
