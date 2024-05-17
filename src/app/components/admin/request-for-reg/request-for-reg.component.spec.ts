import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestForRegComponent } from './request-for-reg.component';

describe('RequestForRegComponent', () => {
  let component: RequestForRegComponent;
  let fixture: ComponentFixture<RequestForRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestForRegComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestForRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
