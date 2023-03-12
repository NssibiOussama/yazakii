import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmalComponent } from './amal.component';

describe('AmalComponent', () => {
  let component: AmalComponent;
  let fixture: ComponentFixture<AmalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
