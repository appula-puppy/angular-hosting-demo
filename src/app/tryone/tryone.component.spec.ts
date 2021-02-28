import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TryoneComponent } from './tryone.component';

describe('TryoneComponent', () => {
  let component: TryoneComponent;
  let fixture: ComponentFixture<TryoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TryoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TryoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
