import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeLigneInternetComponent } from './demande-ligne-internet.component';

describe('DemandeLigneInternetComponent', () => {
  let component: DemandeLigneInternetComponent;
  let fixture: ComponentFixture<DemandeLigneInternetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeLigneInternetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeLigneInternetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
