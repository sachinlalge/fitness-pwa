import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlankRountingComponentComponent } from './blank-rounting-component.component';

describe('BlankRountingComponentComponent', () => {
  let component: BlankRountingComponentComponent;
  let fixture: ComponentFixture<BlankRountingComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlankRountingComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlankRountingComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
