import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcProvisoireComponent } from './pc-provisoire.component';

describe('PcProvisoireComponent', () => {
  let component: PcProvisoireComponent;
  let fixture: ComponentFixture<PcProvisoireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcProvisoireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PcProvisoireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
