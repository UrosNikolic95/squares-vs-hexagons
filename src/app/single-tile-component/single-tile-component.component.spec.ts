import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from '../app.component';

import { SingleTileComponentComponent } from './single-tile-component.component';

describe('SingleTileComponentComponent', () => {
  let component: SingleTileComponentComponent;
  let fixture: ComponentFixture<SingleTileComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingleTileComponentComponent],
      imports: [BrowserModule, BrowserAnimationsModule],
    }).compileComponents();
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
