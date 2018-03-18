import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {MatButtonModule, MatCardModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatToolbarModule} from '@angular/material';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {FlexLayoutModule} from '@angular/flex-layout';
import { CompanyEditComponent } from './company/company-edit/company-edit.component';
import {CrmService} from './services/crm.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';


const firebaseConfig = {
  apiKey: "AIzaSyBtcZeM-omx_EDY8UFAIGd480y96OhKTc8",
  authDomain: "crmwithangularfire2.firebaseapp.com",
  databaseURL: "https://crmwithangularfire2.firebaseio.com",
  projectId: "crmwithangularfire2",
  storageBucket: "crmwithangularfire2.appspot.com",
  messagingSenderId: "14041228834"
};

@NgModule({
  declarations: [
    AppComponent,
    CompanyEditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    MatButtonModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
  ],
  providers: [CrmService],
  bootstrap: [AppComponent]
})
export class AppModule { }
