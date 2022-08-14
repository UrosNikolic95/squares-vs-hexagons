import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { TilesComponentComponent } from './tiles-component/tiles-component.component';
import { SingleTileComponentComponent } from './single-tile-component/single-tile-component.component';

@NgModule({
  declarations: [
    AppComponent,
    TilesComponentComponent,
    SingleTileComponentComponent,
  ],
  imports: [BrowserModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
