import { Injectable } from '@angular/core';
import { Alimentacao } from 'src/app/models/alimentacao.model';
import * as moment from "moment";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
@Injectable({
    providedIn: 'root',
})

export class AlimentacaoService {
    storagedPet = localStorage.getItem('currentPet');
    parsedPet = JSON.parse(this.storagedPet);

    constructor(private db: AngularFirestore, public afs: AngularFirestore) {
    }

    create(pet: any) {

        var id = this.db.createId();

        const petRef: AngularFirestoreDocument<any> = this.afs.doc(`/pets/${this.parsedPet.id}/alimentacao/${id}`)

        const petData: Alimentacao = {
            id: id,
            pet_id: this.parsedPet.id,
            data: moment(pet.data, 'DD/MM/YYYY').toDate(),
            racao: pet.racao,
            quantidade: pet.quantidade
        }

        return petRef.set(petData, {
            merge: true,
        });
    }

    getAlimentacaoFromPet(): AngularFirestoreCollection<Alimentacao> {
        return this.db.collection(`/pets/${this.parsedPet.id}/alimentacao`, ref => ref.orderBy('data', 'desc').limit(5))
    }

    getAlimentacaoById(id: string): AngularFirestoreCollection<Alimentacao> {
        return this.db.collection(`/pets/${this.parsedPet.id}/alimentacao`, ref => ref.where('id', '==', id))
    }

    update(id: string, data: any): Promise<void> {
        return this.db.collection(`/pets/${this.parsedPet.id}/alimentacao`).doc(id).update(data);
    }

    delete(id: string): Promise<void> {
        return this.db.collection(`/pets/${this.parsedPet.id}/alimentacao`).doc(id).delete();
    }
}