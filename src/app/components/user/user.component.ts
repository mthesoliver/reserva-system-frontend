import { SharedModule } from 'src/app/modules/common-module/shared';
import { ResourceService } from './../../services/resource.service';
import { Component, OnInit } from '@angular/core';
import { HttpModuleModule } from 'src/app/modules/http-module/http-module.module';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  standalone:true,
  imports:[
    SharedModule,
    HttpModuleModule
  ]
})
export class UserComponent  implements OnInit {

  message:string ='';

  constructor(private resourceService: ResourceService) { }

  ngOnInit():void {
    this.resourceService.user().subscribe(data =>{
      this.message = data.message;
    },
    err =>{
      console.log(err);
    });
  }

}
