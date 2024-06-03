import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilajeComponent } from './utilaje.component';

describe('UtilajeComponent', () => {
  let component: UtilajeComponent;
  let fixture: ComponentFixture<UtilajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UtilajeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UtilajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
