import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BASEURL,GET_PRODUCTS,GET_WAREHOUSE, GET_INVENTORY,GET_PRODUCT_CATEGORY,UPDATE_INVENTORY} from'../shared/utils/contstant';
import {Product,Warehouse,Category, Inventory} from'../shared/utils/viewmodel';
import { catchError, retry } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

 constructor(private http: HttpClient) { }

getAllProducts() : Observable<any> {
  return this.http.get<Product[]>(`${BASEURL}${GET_PRODUCTS}`);
}

getAllWarehouses() : Observable<any> {
  return this.http.get<Warehouse[]>(`${BASEURL}${GET_WAREHOUSE}`);
}

getAllInventories() : Observable<any> {
  return this.http.get<Inventory[]>(`${BASEURL}${GET_INVENTORY}`);
}

getAllCategories() : Observable<any> {
  return this.http.get<Category[]>(`${BASEURL}${GET_PRODUCT_CATEGORY}`);
}

updateInventory(obj:Inventory) : Observable<any> {
  return this.http.post<Inventory>(`${BASEURL}${UPDATE_INVENTORY}`, obj);
}


}
