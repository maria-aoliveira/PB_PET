import { Injectable } from '@angular/core';
import { Pet } from 'src/app/models/pet.model';
import { Sintoma } from 'src/app/models/sintoma.model';
import * as moment from "moment";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
@Injectable({
    providedIn: 'root',
})

export class SintomaService {
    storagedPet = localStorage.getItem('currentPet');
    parsedPet = JSON.parse(this.storagedPet);

    constructor(private db: AngularFirestore, public afs: AngularFirestore) {
    }

    create(pet: any) {

        var id = this.db.createId();

        const petRef: AngularFirestoreDocument<any> = this.afs.doc(`/pets/${this.parsedPet.id}/sintomas/${id}`)

        const petData: Sintoma = {
            id: id,
            pet_id: this.parsedPet.id,
            data: moment(pet.data, 'DD/MM/YYYY').toDate(),
            observacoes: pet.observacoes
        }

        return petRef.set(petData, {
            merge: true,
        });
    }

    getSintomaFromPet(): AngularFirestoreCollection<Sintoma> {
        return this.db.collection(`/pets/${this.parsedPet.id}/sintomas`, ref => ref.orderBy('data', 'desc').limit(5))
    }

    getSintomaById(id: string): AngularFirestoreCollection<Sintoma> {
        return this.db.collection(`/pets/${this.parsedPet.id}/sintomas`, ref => ref.where('id', '==', id))
    }

    update(id: string, data: any): Promise<void> {
        return this.db.collection(`/pets/${this.parsedPet.id}/sintomas`).doc(id).update(data);
    }

    delete(id: string): Promise<void> {
        return this.db.collection(`/pets/${this.parsedPet.id}/sintomas`).doc(id).delete();
    }
}