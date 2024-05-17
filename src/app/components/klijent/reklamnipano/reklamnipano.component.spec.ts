import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReklamnipanoComponent } from './reklamnipano.component';

describe('ReklamnipanoComponent', () => {
  let component: ReklamnipanoComponent;
  let fixture: ComponentFixture<ReklamnipanoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReklamnipanoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReklamnipanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
