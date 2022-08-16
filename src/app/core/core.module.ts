import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DataServiceService} from './data-service.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[DataServiceService]
})
export class CoreModule { }
