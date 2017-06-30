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
import { ProgramConstructorLiteComponent, KeysPipe, DiagramComponent } from './program-constructor-lite/program-constructor-lite.component';
import { ProgramDisciplinesConstructorComponent } from './program-disciplines-constructor/program-disciplines-constructor.component';
import { ChartsModule } from 'ng2-charts/ng2-charts';

// custom module
import { AuthModule } from './auth/auth.module';
import { ConstructorModule } from './constructor/constructor.module';
import { ProfileModule } from './profile/profile.module';
 
import { RegisterPageComponent } from './register-page/register-page.component';

// custom services

//app config
import { APP_CONFIG, AppConfig } from './app.config';
import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    FooterComponent,
    ElementOpenProgramComponent,
    ProgramConstructorLiteComponent,
    DiagramComponent,
    ProgramDisciplinesConstructorComponent,
    KeysPipe,
    RegisterPageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ChartsModule,
    ConstructorModule,
    AuthModule,
    ProfileModule,
  ],
  providers: [
    GlobalService,
    { provide: APP_CONFIG, useValue: AppConfig },
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
