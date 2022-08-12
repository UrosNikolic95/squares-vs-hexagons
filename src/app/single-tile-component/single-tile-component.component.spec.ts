import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTileComponentComponent } from './single-tile-component.component';

describe('SingleTileComponentComponent', () => {
  let component: SingleTileComponentComponent;
  let fixture: ComponentFixture<SingleTileComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleTileComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleTileComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
