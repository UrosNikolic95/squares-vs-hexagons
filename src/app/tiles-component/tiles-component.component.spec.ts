import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from '../app.component';
import { SingleTileComponentComponent } from '../single-tile-component/single-tile-component.component';

import { TilesComponentComponent } from './tiles-component.component';

describe('TilesComponentComponent', () => {
  let component: TilesComponentComponent;
  let fixture: ComponentFixture<TilesComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TilesComponentComponent, SingleTileComponentComponent],
      imports: [BrowserModule, BrowserAnimationsModule],
    }).compileComponents();
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
