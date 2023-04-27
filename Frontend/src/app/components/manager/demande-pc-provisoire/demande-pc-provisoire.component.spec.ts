import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandePcProvisoireComponent } from './demande-pc-provisoire.component';

describe('DemandePcProvisoireComponent', () => {
  let component: DemandePcProvisoireComponent;
  let fixture: ComponentFixture<DemandePcProvisoireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandePcProvisoireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandePcProvisoireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
