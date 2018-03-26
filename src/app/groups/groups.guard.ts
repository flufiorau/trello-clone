import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from "../_services/auth.service";
import {Globals} from "../app.component";

@Injectable()
export class GroupsGuard implements CanActivate {

    constructor(private router: Router,
                private globals: Globals,
                private authService: AuthService) {
    }

    canActivate() {
        let token = localStorage.getItem("jwt_token");
        const url = '/api/checklogin';
        const request = new Request(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            },
            body: {'token': token}
        });

        return fetch(request)
            .then(response => response.json()
            ).then(data => {
                // access data from response
                if (data['jwtToken']) {
                    this.authService.setSession({'jwtToken': data['jwtToken']});
                }
                return true
            })
            .catch(() => {
                return true
            })
    }
}