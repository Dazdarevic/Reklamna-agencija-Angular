import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPanoComponent } from './add-pano.component';

describe('AddPanoComponent', () => {
  let component: AddPanoComponent;
  let fixture: ComponentFixture<AddPanoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPanoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
