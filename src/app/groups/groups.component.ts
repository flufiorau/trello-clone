import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, DoCheck, OnChanges} from '@angular/core';
import {GroupService} from '../_services/group.service';
import {Group} from '../_models/Group';
import {Globals} from "../app.component";
import {Router} from "@angular/router";


@Component({
    selector: 'app-groups',
    templateUrl: './groups.component.html',
    styleUrls: ['./groups.component.css']
})

export class GroupsComponent {
    notLoaded: boolean = true;
    counter: string;
    activeInput: boolean = false;
    groups: Group[];
    editState: string = '';
    groupToEdit: Group;

    constructor(public globals: Globals,
                private groupService: GroupService,
                private router: Router) {
    }

    ngOnInit() {
        this.groupService.getGroups().subscribe(groups => {
            this.groups = groups;
            this.counter = groups.length.toString();
        });
    }

    // for adds
    newGroup: Group = {
        groupId: '',
        title: ''
    };

    onLoaded() {
        this.notLoaded = !this.notLoaded;
    }

    addBoard() {
        this.globals.userIsLogged ?
            (this.newGroup.title != '') ? (
                    this.newGroup.groupId = this.counter,
                        this.groupService.addGroup(this.newGroup),
                        this.newGroup.title = '')
                : null
            : this.goToLogin();
    }

    goToLogin() {
        this.router.navigateByUrl('login');
    }

    cancelInputs(event) {
        if (this.activeInput && event.target.tagName == 'DIV') {
            this.activeInput = false;
        }
    }

    deleteGroup(event, group: Group) {
        this.clearState();
        this.groupService.deleteGroup(group);
    }

    editGroup(group: Group) {
        this.editState = group.id;
        console.log('this.editState  ',this.editState);
        this.groupToEdit = group;
    }

    updateGroup(group: Group) {
        this.groupService.updateGroup(group);
        this.clearState();
    }

    clearState() {
        this.editState = '';
        this.groupToEdit = null;
    }
}
