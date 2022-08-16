import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { DataServiceService } from 'src/app/core/data-service.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

import { InventoryComponent } from './inventory.component';
import {Product} from '../../shared/utils/viewmodel';
import { BASEURL, GET_PRODUCTS } from 'src/app/shared/utils/contstant';

describe('InventoryComponent', () => {
  let component: InventoryComponent;
  let fixture: ComponentFixture<InventoryComponent>;
  let httpTestingController: HttpTestingController;
  let dataServiceService:DataServiceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryComponent ],
      providers:[DataServiceService],
      imports: [HttpClientTestingModule],
    })
    .compileComponents();

    httpTestingController = TestBed.get(HttpTestingController);
    fixture = TestBed.createComponent(InventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();


  });

   beforeEach(inject(
    [DataServiceService],
    (service: DataServiceService) => {
      dataServiceService = service;
    }
  ));

  
  it("should return getAllProducts data", () => {
  let result: Product[];
  
  dataServiceService.getAllProducts().subscribe(t => {
    result = t;
    expect(result.length).toBe(4);
  });  
  expect(component).toBeTruthy();
});

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
