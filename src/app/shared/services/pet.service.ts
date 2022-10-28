import { Injectable } from '@angular/core';
import { Pet } from 'src/app/models/pet.model';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
@Injectable({
    providedIn: 'root',
})

export class PetService {
    private dbPath = '/pets';
    petsRef: AngularFirestoreCollection<Pet>;

    constructor(private db: AngularFirestore, public afs: AngularFirestore,) {
        this.petsRef = db.collection(this.dbPath)
    }
   

    // const userRef: AngularFirestoreDocument<any> = this.afs.doc(
    //     `users/${user.uid}`
    //   );
    //   const userData: User = {
    //     uid: user.uid,
    //     email: user.email,
    //     displayName: user.displayName,
    //     photoURL: user.photoURL,
    //     emailVerified: user.emailVerified,
    //   };
    //   return userRef.set(userData, {
    //     merge: true,
    //   });
    // }

    create(pet: any) {
        var storagedUser = localStorage.getItem('user');
        var parsedUser = JSON.parse(storagedUser);
        // pet.usuario_uid = parsedUser.uid;           

        var id = this.db.createId();

        const petRef: AngularFirestoreDocument<any> = this.afs.doc(`/pets/${id}`)

        const petData: Pet = {
            id: id,
            nome: pet.nome,
            data_nascimento: pet.data_nascimento,
            raca: pet.raca,
            genero: pet.genero,
            tipo_pet: pet.tipo_pet,
            usuario_uid: parsedUser.uid
        }
                
        return petRef.set(petData, {
            merge: true,
          });


        // this.db.collection('pets/' + documentKey).set(petData, {
        //     merge:true,      
        // });
        // return this.petsRef.add({ ...pet }).then(function(docRef) {
        //     pet.id = docRef.id;
        //     console.log("Document written with ID: ", docRef.id);
        // });
    }

    // getUser(id: string) {
    //     return new Promise<any>((resolve) => {
    //         this.db.collection('pets', ref => ref.where('id', '==', id)).valueChanges().subscribe(user => resolve(user))
    //     })
    // }

    getPetsFromUser(userId: string): AngularFirestoreCollection<Pet> {        
        return this.db.collection('/pets', ref => ref.where('usuario_uid', '==', userId))
      }

    getPetById(id: string): AngularFirestoreCollection<Pet> {
        return this.db.collection('/pets', ref => ref.where('id', '==', id))
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