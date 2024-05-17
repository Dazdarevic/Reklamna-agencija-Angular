import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanoiComponent } from './panoi.component';

describe('PanoiComponent', () => {
  let component: PanoiComponent;
  let fixture: ComponentFixture<PanoiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanoiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PanoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
