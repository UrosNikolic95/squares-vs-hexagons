import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TilesComponentComponent } from './tiles-component/tiles-component.component';
import { SingleTileComponentComponent } from './single-tile-component/single-tile-component.component';

@NgModule({
  declarations: [
    AppComponent,
    TilesComponentComponent,
    SingleTileComponentComponent,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
