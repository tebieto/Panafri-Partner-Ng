import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddServicesPage } from './add-services.page';

describe('AddServicesPage', () => {
  let component: AddServicesPage;
  let fixture: ComponentFixture<AddServicesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddServicesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddServicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
