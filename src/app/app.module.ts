import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {MatButtonModule, MatCheckboxModule, MatToolbarModule} from '@angular/material';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';

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
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatToolbarModule,
    MatCheckboxModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
