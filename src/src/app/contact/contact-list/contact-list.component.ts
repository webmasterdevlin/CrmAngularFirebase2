import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { IContact } from '../contact';
import { CompanyService } from '../../company/company.service';
import { ICompany } from '../../company/company';

@Component({
  selector: 'dd-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  companies$: Observable<ICompany[]>;
  contacts$: FirebaseListObservable<IContact[]> | Observable<string>;

  constructor(
    private companyService: CompanyService,
    public contactService: ContactService) { }

  ngOnInit() {
    this.companies$ = this.companyService.getCompanies();
    this.getContacts();
  }

  getContacts() {
    this.contacts$ = this.contactService.getContacts();
  }

}
