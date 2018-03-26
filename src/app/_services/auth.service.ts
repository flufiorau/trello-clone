import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Globals} from "../app.component";
import {User} from "../_models/user";
import "rxjs/add/operator/shareReplay";
import "rxjs/add/operator/do";


@Injectable()

export class AuthService {
    constructor(private globals: Globals,
                private http: HttpClient) {
    }

    register(email: string, password: string) {
        return this.http.post<User>('/api/register', {email, password})
            .do(res => this.setSession(res),
                res => this.errSetSession(res))
            .shareReplay();
    }

    login(email: string, password: any) {
        return this.http.post<User>('/api/login', {email, password})
            .do(res => this.setSession(res),
                res => this.errSetSession(res))
            .shareReplay();
    }

    errSetSession(response: any) {
        return response;
    }

    setSession(authResult) {
        localStorage.setItem("jwt_token", authResult['jwtToken']);
        this.globals.userIsLogged = true;
    }

    logout() {
        localStorage.removeItem("jwt_token");
        this.globals.userIsLogged = false;
    }
}