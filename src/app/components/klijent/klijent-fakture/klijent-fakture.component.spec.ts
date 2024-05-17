import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KlijentFaktureComponent } from './klijent-fakture.component';

describe('KlijentFaktureComponent', () => {
  let component: KlijentFaktureComponent;
  let fixture: ComponentFixture<KlijentFaktureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KlijentFaktureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KlijentFaktureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
