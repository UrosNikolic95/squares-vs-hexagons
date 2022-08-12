import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TilesComponentComponent } from './tiles-component.component';

describe('TilesComponentComponent', () => {
  let component: TilesComponentComponent;
  let fixture: ComponentFixture<TilesComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TilesComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TilesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
