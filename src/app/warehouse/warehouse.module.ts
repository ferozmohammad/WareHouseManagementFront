import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryComponent } from './inventory/inventory.component';
import { UpdateInventoryComponent } from './update-inventory/update-inventory.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    InventoryComponent,
    UpdateInventoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    InventoryComponent
  ]
})
export class WarehouseModule { }
