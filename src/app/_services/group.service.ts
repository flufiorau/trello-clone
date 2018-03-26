import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {Group} from '../_models/Group';

@Injectable()
export class GroupService {
    groupsCollection: AngularFirestoreCollection<Group>;
    groups: Observable<Group[]>;
    groupDoc: AngularFirestoreDocument<Group>;

    constructor(public afs: AngularFirestore) {
    }

    getGroups() {
        //this.groups = this.afs.collection('groups').valueChanges();
        this.groupsCollection = this.afs.collection('groups', ref => ref.orderBy('groupId', 'asc'));

        this.groups = this.groupsCollection.snapshotChanges().map(changes => {
            return changes.map(a => {
                const data = a.payload.doc.data() as Group;
                data.id = a.payload.doc.id;
                return data;
            });
        });
        return this.groups;
    }

    addGroup(group: Group) {
        this.groupsCollection.add(group);
    }

    checkedGroup(group: Group) {
        this.groupDoc = this.afs.doc(`groups/${group.id}`);
    }

    deleteGroup(group: Group) {
        this.groupDoc = this.afs.doc(`groups/${group.id}`);
        this.groupDoc.delete();
    }

    updateGroup(group: Group) {
        this.groupDoc = this.afs.doc(`groups/${group.id}`);
        this.groupDoc.update(group);
    }
}
