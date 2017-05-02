import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GlobalService } from './global.service';
import { ContainerComponent } from './container/container.component';
import { FooterComponent } from './footer/footer.component';
import { ElementOpenProgramComponent } from './element-open-program/element-open-program.component';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    FooterComponent,
    ElementOpenProgramComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [GlobalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
