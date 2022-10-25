import { Injectable } from '@angular/core';
import { Pet } from 'src/app/models/pet.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
    providedIn: 'root',
})

export class PetService {
    private dbPath = '/pets';
    petsRef: AngularFirestoreCollection<Pet>;

    constructor(private db: AngularFirestore, public afAuth: AngularFireAuth) {
        this.petsRef = db.collection(this.dbPath)
    }

    create(pet: Pet): any {
        var user = localStorage.getItem('user');
        var parsedUser = JSON.parse(user);
        pet.usuario_uid = parsedUser.uid;
        return this.petsRef.add({ ...pet });
    }

    getAll(): AngularFirestoreCollection<Pet> {
        return this.petsRef;
    }

    update(id: string, data: any): Promise<void> {
        return this.petsRef.doc(id).update(data);
    }

    delete(id: string): Promise<void> {
        return this.petsRef.doc(id).delete();
    }

    // Create Pet
    // addPet(pet: Pet) : any {
    //     pet.id_pet = this.db.createId();
    //     return this.db.collection('/pets').add(pet);
    // }

    // getAllPets(){
    //     return this.db.collection('/pets').snapshotChanges();
    // }

    // deletePets(pet: Pet){
    //     return this.db.doc('/pets/'+pet.id_pet).delete();
    // }

    // }
}