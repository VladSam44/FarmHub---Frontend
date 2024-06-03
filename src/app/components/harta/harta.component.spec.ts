import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HartaComponent } from './harta.component';

describe('HartaComponent', () => {
  let component: HartaComponent;
  let fixture: ComponentFixture<HartaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HartaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HartaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
