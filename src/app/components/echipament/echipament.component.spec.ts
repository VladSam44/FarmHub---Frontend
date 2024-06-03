import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EchipamentComponent } from './echipament.component';

describe('EchipamentComponent', () => {
  let component: EchipamentComponent;
  let fixture: ComponentFixture<EchipamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EchipamentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EchipamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
