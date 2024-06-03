import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanciarComponent } from './financiar.component';

describe('FinanciarComponent', () => {
  let component: FinanciarComponent;
  let fixture: ComponentFixture<FinanciarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinanciarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinanciarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
