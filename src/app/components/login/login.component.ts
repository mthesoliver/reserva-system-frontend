import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { SharedModule } from 'src/app/modules/common-module/shared';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';
import { TokenService } from 'src/app/services/token.service';


const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone:true,
  imports:[
    SharedModule
  ]
})
export class LoginComponent  implements OnInit {
  authorize_uri = environment.authorize_uri;

  params: any = {
    client_id: environment.client_id,
    redirect_uri: environment.redirect_uri,
    scope: environment.scope,
    response_type: environment.response_type,
    response_mode: environment.response_mode,
    code_challenge_method: environment.code_challenge_method
  }

  constructor(private tokenService:TokenService) { 
  }

  ngOnInit() {
    this.onLogin();
  }

  onLogin(): void {
    const code_verifier = this.generateCodeVerifier();
    this.tokenService.setVerifier(code_verifier);
    this.params.code_challenge = this.generateCodeChallenge(code_verifier);
    const httpParams = new HttpParams({fromObject: this.params});
    const codeUrl = this.authorize_uri + httpParams.toString();
    location.href = codeUrl;
  }

  generateCodeVerifier(): string {
    let result = '';
    const char_length = CHARACTERS.length;
    for(let i =0; i < 44; i++) {
      result += CHARACTERS.charAt(Math.floor(Math.random() * char_length));
    }
    return result;
  }

  generateCodeChallenge(code_verifier: string): string {
    const codeverifierHash = CryptoJS.SHA256(code_verifier).toString(CryptoJS.enc.Base64);
    const code_challenge = codeverifierHash.replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_');
    return code_challenge;
  }

}
