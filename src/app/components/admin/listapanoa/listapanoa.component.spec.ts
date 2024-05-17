import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListapanoaComponent } from './listapanoa.component';

describe('ListapanoaComponent', () => {
  let component: ListapanoaComponent;
  let fixture: ComponentFixture<ListapanoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListapanoaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListapanoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
