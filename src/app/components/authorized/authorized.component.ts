import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from 'src/app/modules/common-module/shared';
import { HttpModuleModule } from 'src/app/modules/http-module/http-module.module';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-authorized',
  templateUrl: './authorized.component.html',
  styleUrls: ['./authorized.component.scss'],
  standalone:true,
  imports: [SharedModule,HttpModuleModule],
})
export class AuthorizedComponent  implements OnInit {
  code! :string;

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService, private tokenService: TokenService, private router: Router) { }

  ngOnInit():void {
    this.activatedRoute.queryParams.subscribe(data =>{
      this.code = data['code'];
      const code_verifier = this.tokenService.getVerifier();
      this.tokenService.deleteVerifier();
      this.getToken(this.code, code_verifier);
    });
  }

  getToken(code: string, code_verifier: string):void{
    this.authService.getToken(code, code_verifier).subscribe(
      data =>{
        this.tokenService.setTokens(data.access_token, data.refresh_token);
        this.router.navigate(['home']);
      },
      err =>{
        console.log(err);
      }
    );
  }

}
