import {Component, Injectable} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor() {
    }
}

@Injectable()
export class Globals {
    userIsLogged: boolean = false;
    userIsRegistered: boolean = true;
}
