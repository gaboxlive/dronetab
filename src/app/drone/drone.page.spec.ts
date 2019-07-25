import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DroneTab } from './drone.page';

describe('DroneTab', () => {
  let component: DroneTab;
  let fixture: ComponentFixture<DroneTab>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DroneTab],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DroneTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
