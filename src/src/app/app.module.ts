import 'hammerjs';
import 'firebase/storage'; // global firebase storage js;
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AngularFireModule} from 'angularfire2';
import {AppComponent} from './app.component';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CompanyEditComponent} from './company/company-edit/company-edit.component';
import {CompanyService} from './company/company.service';
import {CompanyListComponent} from './company/company-list/company-list.component';
import {ContactService} from './contact/contact.service';
import {ContactEditComponent} from './contact/contact-edit/contact-edit.component';
import {ContactListComponent} from './contact/contact-list/contact-list.component';
import {AuthService} from './auth/auth.service';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './auth/auth.guard';
import {
  MatCardModule, MatButtonModule, MatInputModule, MatToolbarModule, MatProgressBarModule, MatSelectModule,
  MatIconModule, MatListModule, MatGridListModule
} from '@angular/material';

import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

import {CompanyEffects} from './state/company.effects';
import {companyReducer} from './state/company.reducers';
import {HttpClientModule} from '@angular/common/http';

const firebaseConfig = {
  apiKey: 'AIzaSyBtcZeM-omx_EDY8UFAIGd480y96OhKTc8',
  authDomain: 'crmwithangularfire2.firebaseapp.com',
  databaseURL: 'https://crmwithangularfire2.firebaseio.com',
  projectId: 'crmwithangularfire2',
  storageBucket: 'crmwithangularfire2.appspot.com',
  messagingSenderId: '14041228834'
};

@NgModule({
  declarations: [
    AppComponent,
    CompanyEditComponent,
    CompanyListComponent,
    ContactEditComponent,
    ContactListComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatGridListModule,
    MatListModule,
    MatProgressBarModule,
    MatSelectModule,
    StoreModule.forRoot({companies: companyReducer}),
    EffectsModule.forRoot([CompanyEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    })
  ],
  providers: [
    AuthGuard,
    CompanyService,
    ContactService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
