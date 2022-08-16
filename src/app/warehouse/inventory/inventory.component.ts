import { Component, OnInit, OnChanges } from '@angular/core';
import {DataServiceService} from '../../core/data-service.service';
import {Product, Warehouse,Category, Inventory, TotalProduct} from'../../shared/utils/viewmodel';
import {sumBy} from 'lodash';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent implements OnInit {
   products: Product[] = [];
   warehouse: Warehouse[] = [];
   categories: Category[] = [];
   inventories: Inventory[] = [];
    filteredInventories: Inventory[] = [];
   productSummery: TotalProduct[]=[];

   selectedwarehouse:string="";
  selectedproduct:string="";
  updatedstock:number=0;
  filterwarehouse:string="";
  filtercategory:string="";

  constructor(private dataService: DataServiceService,) { }


  getProductName(x:any){
 var result=this.products.find(y=> y.id==x.productId);
 return result;
  }
  getWarehouseDetails(x:any) {
 var result=this.warehouse.find(y=> y.id==x.warehouseId);
 return result;
  }

  renderInvetory(){
var _filteredInventories=this.inventories;
if (this.filterwarehouse) {
  _filteredInventories=_filteredInventories.filter(x=> x.warehouseId==this.filterwarehouse);
}

if (this.filtercategory) {
  var catProds=this.products.find(x=> x.categoryId==this.filtercategory);
 _filteredInventories=_filteredInventories.filter(x=> x.productId==catProds?.id);  
}
this.filteredInventories=_filteredInventories;


  }

  handleFilterWarehouse(x:any){
this.filterwarehouse=x.target?.value;
this.renderInvetory();
}

handleFilterCategory(x:any){
this.filtercategory=x.target?.value;
this.renderInvetory();
}

handleWarehouse(x:any){
this.selectedwarehouse=x.target?.value;
}
handleProduct(x:any){
this.selectedproduct=x.target?.value;
}
getCategoryName(z:any){
var result = this.categories.find(x=> x.id==z.categoryId);
return result?.name;
}
handleUpdate(){
  if (this.selectedwarehouse!="" && this.selectedproduct!="" && this.updatedstock > 0) {
    var _input={
      id:"",
      warehouseId:this.selectedwarehouse,
      productId:this.selectedproduct,
      stock:this.updatedstock 
    }

     this.dataService.updateInventory(_input as Inventory).subscribe((data: any)=>{
    if (data) {
      alert("Inventory Successfully Updated");
      this.getAllInventories();
    }
    
    });
  }
  else{
    alert("Please fill required field")
  }
}

  ngOnInit(): void {
    this.InitialCall();
    
  }

  InitialCall() { 
    this.dataService.getAllProducts().subscribe((data: Product[])=>{
      this.products = data;
    });
     this.dataService.getAllCategories().subscribe((data: Category[])=>{
      this.categories = data;
    });

     this.dataService.getAllWarehouses().subscribe((data: Warehouse[])=>{
      this.warehouse = data;
    });  

         this.getAllInventories();    
  }

  getAllInventories(){
    this.dataService.getAllInventories().subscribe((data: Inventory[])=>{
      this.inventories = data; 
      this.filteredInventories=data;  
      this.productSummery  =this.mappingProductSummery();
    }); 
  }

  mappingProductSummery(){

   try {
    var productSummery=[];
    this.products.forEach(element => {
      var sum=sumBy(this.inventories.filter(x=> x.productId==element.id), function(y:Inventory) { return y.stock; });      
      var catName=this.categories.find(x=> x.id==element.categoryId);
      
      var totalInv  ={ name: element.name, category: catName?.name, stock: sum, price:element.price };
      productSummery.push(totalInv as TotalProduct);

    });
   } catch (error) {
    
   }

   return  productSummery as TotalProduct[];
  }

}
