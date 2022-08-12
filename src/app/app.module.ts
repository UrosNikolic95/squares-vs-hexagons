import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TilesComponentComponent } from './tiles-component/tiles-component.component';

@NgModule({
  declarations: [
    AppComponent,
    TilesComponentComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
