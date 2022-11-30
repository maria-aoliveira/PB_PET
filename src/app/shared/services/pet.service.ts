import { Injectable } from '@angular/core';
import { Pet } from 'src/app/models/pet.model';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Arquivo } from 'src/app/models/arquivo.model';
import { finalize, Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

@Injectable({
    providedIn: 'root',
})

export class PetService {
    storagedUser = localStorage.getItem('user');
    parsedUser = JSON.parse(this.storagedUser);
    private dbPath = '/pets';
    private urlPath = '/uploads'
    petsRef: AngularFirestoreCollection<Pet>;
    pictureId;
    downloadUrl;

    constructor(private db: AngularFirestore, public afs: AngularFirestore, public storage: AngularFireStorage, private dbf: AngularFireDatabase) {
        this.petsRef = db.collection(this.dbPath)
    }

    create(pet: any, petUrl: string) {
        var storagedUser = localStorage.getItem('user');
        var parsedUser = JSON.parse(storagedUser);
        // pet.usuario_uid = parsedUser.uid; 

        var id = this.db.createId();

        const petRef: AngularFirestoreDocument<any> = this.afs.doc(`/pets/${id}`)

        const petData: Pet = {
            id: id,
            nome: pet.nome,
            data_nascimento: pet.data_nascimento,
            raca: pet.raca ? pet.raca: '',
            genero: pet.genero ? pet.genero : '',
            tipo_pet: pet.tipo_pet ? pet.tipo_pet : '',
            usuario_uid: parsedUser.uid,
            imagem: petUrl ? petUrl : ''
        }

        return petRef.set(petData, {
            merge: true,
        });
    }

    pushFileToStorage(fileUpload: Arquivo) {
        var id = this.db.createId();
        this.pictureId = id
        const filePath = `${id}/${fileUpload.file.name}`;
        const storageRef = this.storage.ref(filePath);
        const uploadTask = this.storage.upload(filePath, fileUpload.file);
        let snapshot = uploadTask.task.snapshot;
        const ref = this.storage.ref(filePath);

        uploadTask.snapshotChanges().pipe(
            finalize(() => {
              storageRef.getDownloadURL().subscribe(downloadURL => {
                fileUpload.url = downloadURL;
                this.downloadUrl = downloadURL; 
                fileUpload.nome = fileUpload.file.name;
                console.log('push url'+ downloadURL)
                localStorage.setItem('imageUrl', JSON.stringify(downloadURL));
                this.saveFileData(fileUpload);               
              });
            })
          ).subscribe();
    }

    getFiles(numberItems): AngularFireList<Arquivo> {
        return this.dbf.list(this.pictureId, ref =>
          ref.limitToLast(numberItems));
      }
    
      deleteFile(fileUpload: Arquivo): void {
        this.deleteFileDatabase(fileUpload.id)
          .then(() => {
            this.deleteFileStorage(fileUpload.nome);
          })
          .catch(error => console.log(error));
      }
    
      private deleteFileDatabase(key: string): Promise<void> {
        return this.dbf.list(this.pictureId).remove(key);
      }
    
      private deleteFileStorage(name: string): void {
        const storageRef = this.storage.ref(this.pictureId);
        storageRef.child(name).delete();
      }

    private saveFileData(fileUpload: Arquivo): void {
        this.dbf.list('/uploads').push(fileUpload);
    }

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
}