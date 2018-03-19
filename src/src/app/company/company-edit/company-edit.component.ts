import { Component, OnInit } from '@angular/core';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { CompanyService } from '../../services/company.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ICompany } from '../../models/company';

@Component({
  selector: 'dd-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {
  isNewCompany: boolean;
  companyKey: string;
  company$: Observable<ICompany>;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _companyService: CompanyService) { }

  ngOnInit() {
    this.companyKey = this._activatedRoute.snapshot.params['id'];
    this.isNewCompany = this.companyKey === 'new';
    !this.isNewCompany ? this.getCompany() : this.company$ = Observable.of({}) as FirebaseObjectObservable<ICompany>;
  }

  getCompany() {
    this.company$ = this._companyService.getCompany(this.companyKey);
  }

  saveCompany(company) {
    const save = this.isNewCompany
      ? this._companyService.saveCompany(company)
      : this._companyService.editCompany(company);

      save.then(_ => this._router.navigate([`company-list`]));
  }

  removeCompany(company) {
    this._companyService.removeCompany(company)
    .then(_ => this._router.navigate([`company-list`]));
  }
}
