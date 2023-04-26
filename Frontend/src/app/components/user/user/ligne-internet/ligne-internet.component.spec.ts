import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigneInternetComponent } from './ligne-internet.component';

describe('LigneInternetComponent', () => {
  let component: LigneInternetComponent;
  let fixture: ComponentFixture<LigneInternetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LigneInternetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LigneInternetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
