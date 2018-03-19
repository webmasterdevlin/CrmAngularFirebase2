import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ICompany } from '../../models/company';

import { AppState } from '../../state/appState';
import { Store } from '@ngrx/store';
import * as CompanyActions from './../../state/company.actions';

@Component({
  selector: 'dd-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnDestroy {
  companies$: Observable<ICompany[]>;

  constructor(private _store: Store<AppState>) {
    this._store.dispatch(new CompanyActions.ConnectCompaniesAction());
    this.companies$ = this._store.select(state => state.companies);
  }

  ngOnDestroy() {
    this._store.dispatch(new CompanyActions.DisconnectCompaniesAction());
  }

}
