import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';
const CODE_VERIFIER = 'code_verifier';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  setTokens(access_token:string, refresh_token:string):void{
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.setItem(ACCESS_TOKEN, access_token);
    localStorage.removeItem(REFRESH_TOKEN);
    localStorage.setItem(REFRESH_TOKEN, refresh_token);
  }

  getAccesToken():string | null{
    return localStorage.getItem(ACCESS_TOKEN);
  }

  getRefreshToken():string | null{
    return localStorage.getItem(REFRESH_TOKEN);
  }

  clear(){
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
  }

  isLogged():boolean{
    return localStorage.getItem(ACCESS_TOKEN) != null;
  }

  idAdmin():boolean{
    if (!this.isLogged()) {
      return false;
    }
    const token = this.getAccesToken();
    const payload = token!.split('.')[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const roles = values.roles;
    if(roles.indexOf('ADMIN') < 0){
      return false;
    }
    return true;
  }

  setVerifier(code_verifier:string):void{
    if(localStorage.getItem(CODE_VERIFIER)) {
      this.deleteVerifier();
    }
    const encrypted = CryptoJS.AES.encrypt(code_verifier, environment.secret_pkce);
    localStorage.setItem(CODE_VERIFIER, encrypted.toString());
  }

  getVerifier():string{
    const encrypted = localStorage.getItem(CODE_VERIFIER);
    const decrypted = CryptoJS.AES.decrypt(encrypted, environment.secret_pkce).toString(CryptoJS.enc.Utf8);
    return decrypted;
  }
  
  deleteVerifier():void{
    localStorage.removeItem(CODE_VERIFIER);
  }
}
