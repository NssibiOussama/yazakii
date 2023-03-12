import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrapesComponent } from './scrapes.component';

describe('ScrapesComponent', () => {
  let component: ScrapesComponent;
  let fixture: ComponentFixture<ScrapesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrapesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrapesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
