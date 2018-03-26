import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatExpansionModule, MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatToolbarModule
} from '@angular/material';
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {environment} from '../environments/environment';
import {AppComponent, Globals} from './app.component';
import {TodosComponent} from './todos/todos.component';
import {GroupsComponent} from './groups/groups.component';
import {TaskComponent} from './task/task.component';
import {LoginComponent, MessageDialogComponent} from './login/login.component';
import {GroupService} from './_services/group.service';
import {TaskService} from './_services/task.service';
import {AuthService} from "./_services/auth.service";
import {RouterModule, Routes} from "@angular/router";
import {GroupsGuard} from "./groups/groups.guard";

// definition of routes
const appRoutes: Routes = [
    {path: '', component: GroupsComponent, canActivate: [GroupsGuard]},
    {path: 'login', component: LoginComponent, canActivate: [GroupsGuard]}
];


@NgModule({
    declarations: [
        AppComponent,
        TodosComponent,
        GroupsComponent,
        TaskComponent,
        LoginComponent,
        MessageDialogComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        MatProgressBarModule,
        MatIconModule,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatListModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatToolbarModule,
        MatCheckboxModule,
        MatExpansionModule,
        AngularFontAwesomeModule,
        MatDialogModule,
        AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
        AngularFirestoreModule, // imports firebase/firestore, only needed for database features
        AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    ],
    providers: [
        Globals,
        GroupService,
        GroupsGuard,
        TaskService,
        AuthService
    ],
    entryComponents: [MessageDialogComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
