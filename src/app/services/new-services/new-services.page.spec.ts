import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewServicesPage } from './new-services.page';

describe('NewServicesPage', () => {
  let component: NewServicesPage;
  let fixture: ComponentFixture<NewServicesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewServicesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewServicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
