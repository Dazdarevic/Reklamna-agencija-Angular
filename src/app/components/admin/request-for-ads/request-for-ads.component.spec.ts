import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestForAdsComponent } from './request-for-ads.component';

describe('RequestForAdsComponent', () => {
  let component: RequestForAdsComponent;
  let fixture: ComponentFixture<RequestForAdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestForAdsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestForAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
