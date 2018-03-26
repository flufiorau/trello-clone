import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators, NgForm, FormControl} from "@angular/forms";
import {AuthService} from "../_services/auth.service";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Globals} from "../app.component";
import {User} from "../_models/user";

@Component({
    selector: 'app-login',
    styleUrls: ['./login.component.css'],
    templateUrl: './login.component.html',
})
export class LoginComponent {

    hidePasswordAtForm = true;
    userFromFormInput: User = new User();

    constructor(private fb: FormBuilder,
                public authService: AuthService,
                public globals: Globals,
                public dialog: MatDialog,
                private router: Router) {

        this.userFromFormInput.email = new FormControl('', [Validators.required, Validators.email]);
        this.userFromFormInput.password = new FormControl('', [Validators.required, Validators.pattern('\\D{8,20}')]);
    }

    getErrorMessage(place) {
        if (place == 'email') {
            return this.userFromFormInput.email.hasError('required') ? 'You must enter a value' :
                this.userFromFormInput.email.hasError('email') ? 'Not a valid email' :
                    '';
        }
        if (place == 'password') {
            return this.userFromFormInput.password.hasError('required') ? 'You must enter from 8 symbols' :
                this.userFromFormInput.password.hasError('email') ? 'Not a valid password' :
                    '';
        }
    }

    toUserSignIn() {
        this.globals.userIsRegistered = true;
        this.globals.userIsLogged = false;
    }

    toUserSignUp() {
        this.globals.userIsRegistered = false;
        if (!this.globals.userIsRegistered && !this.globals.userIsLogged) {
            return true;
        }
    }

    login() {
        if (this.userFromFormInput.email.value && this.userFromFormInput.password.value) {
            this.authService.login(this.userFromFormInput.email.value, this.userFromFormInput.password.value)
                .subscribe(
                    () => {
                        this.router.navigateByUrl('');

                    }, (response) => {
                        this.openDialog('<p>Error ' + response.status + '. <br>' + response.error.error + '</p>');
                    }
                );
        }
    }

    register() {
        if (this.userFromFormInput.email.value && this.userFromFormInput.password.value) {
            this.authService.register(this.userFromFormInput.email.value, this.userFromFormInput.password.value)
                .subscribe(
                    () => {
                        this.router.navigateByUrl('');
                    }, (response) => {
                        this.openDialog('<p>Error ' + response.status + '. <br>' + response.error.error + '</p>');
                    }
                );
        }
    }

    logout() {
        this.authService.logout();
    }

    public openDialog(message): void {
        if (!message) {
            message = `<p>Please use next data</p>
                    <p>Login: <b>xxxxxxx@xxxxx</b></p>
                    <p>Password: <b>from 8 to 20 symbols</b></p>
                    <p>Registered users can do changes,</p>
                    <p>unregistered - only view</p>`;
        }
        let dialogRef = this.dialog.open(MessageDialogComponent, {
            width: 'auto',
            data: message
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }
}


@Component({
    template: `
        <div class="message" [innerHTML]="data"></div>`
})

export class MessageDialogComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<MessageDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit() {
    }
}
