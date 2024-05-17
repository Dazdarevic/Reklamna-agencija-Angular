import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFaktureComponent } from './admin-fakture.component';

describe('AdminFaktureComponent', () => {
  let component: AdminFaktureComponent;
  let fixture: ComponentFixture<AdminFaktureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminFaktureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminFaktureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
