import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ResourceInterceptor } from 'src/app/interceptors/resource.interceptor';



@NgModule({
  declarations: [],
  imports: [
    HttpClientModule
  ],
  exports:[
    HttpClientModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: ResourceInterceptor, multi:true}]
})
export class HttpModuleModule { }
