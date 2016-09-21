import { AppComponent }   from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule }      from '@angular/core';

@NgModule({
  bootstrap:    [ AppComponent ],
  declarations: [ AppComponent ],
  imports:      [ BrowserModule ]
})
export class AppModule { }