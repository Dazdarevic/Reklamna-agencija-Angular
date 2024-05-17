import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvereklameComponent } from './svereklame.component';

describe('SvereklameComponent', () => {
  let component: SvereklameComponent;
  let fixture: ComponentFixture<SvereklameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SvereklameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SvereklameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
