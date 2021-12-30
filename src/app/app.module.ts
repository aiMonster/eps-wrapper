import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { DropdownModule } from 'primeng/dropdown';
import { ChartViewComponent } from './components/chart-view/chart-view.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { SearchViewComponent } from './components/search-view/search-view.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartViewComponent,
    SearchFormComponent,
    SearchViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    ButtonModule,
    ChartModule,
    DropdownModule,
    SelectButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
