import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProductsPage } from './new-products.page';

describe('NewProductsPage', () => {
  let component: NewProductsPage;
  let fixture: ComponentFixture<NewProductsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewProductsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProductsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
