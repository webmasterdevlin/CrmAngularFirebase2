import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';

import { IContact } from '../models/contact';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ContactService {
  subject$ = new BehaviorSubject<string>(undefined);
  contacts$: FirebaseListObservable<IContact[]>;
  contact$: FirebaseObjectObservable<IContact>;

  constructor(private _ngfDb: AngularFireDatabase) {
    this.contact$ = this._ngfDb.object(`contact`);
    this.contacts$ = this._ngfDb.list(`contacts`);
  }

  getContact(contactKey: string) {
    return this._ngfDb.object(`contacts/${contactKey}`)
      .catch(this.errorHandler);
  }

  getContacts() {
    return this.subject$
      .switchMap(companyKey => companyKey === undefined
        ? this.contacts$
        : this._ngfDb.list(`companyContacts/${companyKey}`))
      .catch(this.errorHandler);
  }

  // obs$: Observable<Observable[]>;
  companyContactsJoin(companyKey) {
    return this._ngfDb.list(`companyContacts/${companyKey}`)
      .map(contactKeys => contactKeys
        .map(contact => this._ngfDb.object(`contacts/${contact.$key}`)))
      .switchMap(contactObsArray => contactObsArray.length >= 1
        ? Observable.combineLatest(contactObsArray)
        : Observable.of([]))
      .catch(this.errorHandler);
  }

  saveContact(contact: IContact) {
    return this.contacts$.push(contact)
      .then(_ => console.log('success'))
      .catch(error => console.log(error));
  }

  editContact(contact: IContact) {
    const updateContact = {};

    updateContact[`contacts/${contact.$key}`] = contact;
    Object.keys(contact.contactCompanies).forEach(companyKey => {
      updateContact[`companyContacts/${companyKey}/${contact.$key}`] = {name: contact.name};
    });

    return this._ngfDb.object('/').update(updateContact)
      .then(_ => console.log('success'))
      .catch(error => console.log(error));
  }

  removeContact(contact) {
    const removeContact = {};

    removeContact[`contacts/${contact.$key}`] = null;
    Object.keys(contact.contactCompanies).forEach(companyKey => {
      removeContact[`companyContacts/${companyKey}/${contact.$key}`] = null;
    });

    return this._ngfDb.object('/').update(removeContact)
      .then(_ => console.log('success'))
      .catch(error => console.log(error));
  }

  private errorHandler(error) {
    console.log(error);
    return Observable.throw(error.message);
  }

}
