import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { IContact } from '../../models/contact';
import { CompanyService } from '../../services/company.service';
import { ICompany } from '../../models/company';

@Component({
  selector: 'dd-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  companies$: Observable<ICompany[]>;
  contacts$: FirebaseListObservable<IContact[]> | Observable<string>;

  constructor(
    private _companyService: CompanyService,
    public contactService: ContactService) { }

  ngOnInit() {
    this.companies$ = this._companyService.getCompanies();
    this.getContacts();
  }

  getContacts() {
    this.contacts$ = this.contactService.getContacts();
  }

}
