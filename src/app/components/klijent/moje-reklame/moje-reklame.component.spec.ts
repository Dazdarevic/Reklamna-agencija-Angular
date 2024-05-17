import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MojeReklameComponent } from './moje-reklame.component';

describe('MojeReklameComponent', () => {
  let component: MojeReklameComponent;
  let fixture: ComponentFixture<MojeReklameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MojeReklameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MojeReklameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
