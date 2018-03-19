import * as firebase from 'firebase/app'; // typings only
import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { IContact } from '../../models/contact';
import { CompanyService } from '../../services/company.service';
import { ICompany } from '../../models/company';

@Component({
  selector: 'dd-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  companies$: Observable<ICompany[]>;
  isNewContact: boolean;
  contactKey: string;
  contact = {name: ''} as IContact;
  selectedCompany: ICompany;
  contactCompanies = [];

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _contactService: ContactService,
    private _companyService: CompanyService) { }

  ngOnInit() {
    this.companies$ = this._companyService.getCompanies();
    this.contactKey = this._activatedRoute.snapshot.params['id'];
    this.isNewContact = this.contactKey === 'new';
    if (!this.isNewContact) { this.getContact(); };
  }

  uploadFile(event: any) {
    const file = event.srcElement.files[0];
    const storageRef = firebase.storage().ref(`contacts/${this.contactKey}`);
    storageRef.put(file)
      .then(uploadTask => this.contact.imageUrl = uploadTask.downloadURL);
  }

  addCompany() {
    this.contact.contactCompanies[this.selectedCompany.$key] = { name: this.selectedCompany.name };
    this.setContactCompanies();
  }

  getContact() {
    this._contactService.getContact(this.contactKey)
      .subscribe(contact => {
        this.contact = contact;
        this.setContactCompanies();
      });
  }

  setContactCompanies() {
    if (this.contact.contactCompanies == null) { this.contact.contactCompanies = {}; };
    this.contactCompanies = Object.keys(this.contact.contactCompanies).map(key => this.contact.contactCompanies[key]);
  }

  saveContact(contact) {
    const save = this.isNewContact
      ? this._contactService.saveContact(contact)
      : this._contactService.editContact(contact);

    save.then(_ => this._router.navigate([`contact-list`]));
  }

  removeContact(contact) {
    this._contactService.removeContact(contact)
      .then(_ => this._router.navigate([`contact-list`]));
  }
}
