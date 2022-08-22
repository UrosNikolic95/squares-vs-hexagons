import { TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { SingleTileComponentComponent } from './single-tile-component/single-tile-component.component';
import { TilesComponentComponent } from './tiles-component/tiles-component.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TilesComponentComponent,
        SingleTileComponentComponent,
      ],
      imports: [BrowserModule, BrowserAnimationsModule],
      providers: [],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'squares-vs-hexagons'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('squares-vs-hexagons');
  });
});
