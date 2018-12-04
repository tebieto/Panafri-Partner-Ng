import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddstorePage } from './addstore.page';

describe('AddstorePage', () => {
  let component: AddstorePage;
  let fixture: ComponentFixture<AddstorePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddstorePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddstorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
