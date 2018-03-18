///<reference path="../../node_modules/angularfire2/database/database.d.ts"/>
import { Component } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import 'rxjs/add/operator/take';

@Component({
  selector: 'dd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private ngfDb: AngularFireDatabase) {
   const observable$ = this.ngfDb.object(`connected`).valueChanges();
   observable$
     .take(2)
     .subscribe(
     next => console.log("Next", next),
     error => console.log("Error", error),
     () => console.log("Completed")
   );
  }
}
