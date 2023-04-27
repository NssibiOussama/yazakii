import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandePcComponent } from './demande-pc.component';

describe('DemandePcComponent', () => {
  let component: DemandePcComponent;
  let fixture: ComponentFixture<DemandePcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandePcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandePcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
