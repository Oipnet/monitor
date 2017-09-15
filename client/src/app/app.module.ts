import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MdCardModule, MdButtonModule } from '@angular/material';

import { AppComponent } from './app.component';
import { CpuComponent } from './components/cpu/cpu.component';

import { MonitorService } from './services/monitor.service'

@NgModule({
  declarations: [
    AppComponent,
    CpuComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    FlexLayoutModule,
    MdCardModule,
    MdButtonModule
  ],
  providers: [ MonitorService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
