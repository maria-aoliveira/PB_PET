import { Injectable } from '@angular/core';
import { Pet } from 'src/app/models/pet.model';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Arquivo } from 'src/app/models/arquivo.model';
import { finalize, Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

@Injectable({
    providedIn: 'root',
})

export class PetService {
    storagedUser = localStorage.getItem('user');
    parsedUser = JSON.parse(this.storagedUser);
    private dbPath = '/pets';
    petsRef: AngularFirestoreCollection<Pet>;
    pictureId;
    downloadUrl;
    downloadURL: Observable<string>;

    constructor(private db: AngularFirestore, public afs: AngularFirestore, public storage: AngularFireStorage, private dbf: AngularFireDatabase) {
        this.petsRef = db.collection(this.dbPath)
    }

    create(pet: any) {
        var storagedUser = localStorage.getItem('user');
        var parsedUser = JSON.parse(storagedUser);
        // pet.usuario_uid = parsedUser.uid;           

        var id = this.db.createId();

        const petRef: AngularFirestoreDocument<any> = this.afs.doc(`/pets/${id}`)

        // const petData: Pet = {
        //     id: id,
        //     nome: pet.nome,
        //     data_nascimento: pet.data_nascimento,
        //     raca: pet.raca,
        //     genero: pet.genero,
        //     tipo_pet: pet.tipo_pet,
        //     usuario_uid: parsedUser.uid
        // }

        // return petRef.set(petData, {
        //     merge: true,
        // });
    }

    pushFileToStorage(fileUpload: Arquivo): Observable<string> {
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
                this.downloadURL = downloadURL
                fileUpload.nome = fileUpload.file.name;
                console.log('url'+ downloadURL)
                console.log('URL'+ this.downloadURL)

                this.saveFileData(fileUpload);
                
              });
            })
          ).subscribe();

        // uploadTask.snapshotChanges().pipe(
        //   finalize(() => {
        //     snapshot.ref.getDownloadURL().then(downloadURL => {
        //       fileUpload.url = downloadURL;
        //       this.downloadUrl = downloadURL; 
        //       fileUpload.nome = fileUpload.file.name;
        //       console.log('AAAAAAAAAAl'+ downloadURL)
        //       this.saveFileData(fileUpload);
        //     });
        //   })
        // ).subscribe(snap => {
        //     this.downloadUrl = snap
        //     console.log(snap)});

        

        // uploadTask.snapshotChanges().pipe(
        //     finalize(() => {
        //         this.downloadURL = ref.getDownloadURL();
        //         this.downloadURL.subscribe(url => { this.downloadUrl = url })
        //     })
        // )

        // const storage = getStorage();

        // getDownloadURL(ref(storage, filePath))
        //     .then((url) => {
        //         // `url` is the download URL for 'images/stars.jpg'

        //         // This can be downloaded directly:
        //         const xhr = new XMLHttpRequest();
        //         xhr.responseType = 'blob';
        //         xhr.onload = (event) => {
        //             const blob = xhr.response;
        //         };
        //         xhr.open('GET', url);
        //         xhr.send();

        //         // Or inserted into an <img> element
        //         const img = document.getElementById('myimg');
        //         img.setAttribute('src', url);

        //         console.log('seinao' + url)
        //     })
        //     .catch((error) => {
        //         // Handle any errors
        //     });

        console.log('AAAAA1' + this.downloadUrl)

        console.log('AAAAA3' + this.downloadURL)


        return this.downloadUrl
    }

    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    private saveFileData(fileUpload: Arquivo): void {
        this.dbf.list('/uploads').push(fileUpload);
    }


    // create(pet: any) {

    //     // pet.usuario_uid = parsedUser.uid;           

    //     var id = this.db.createId();

    //     const petRef: AngularFirestoreDocument<any> = this.afs.doc(`/pets/${id}`)

    //     const filePath = `${id}/${pet.imagem}`;
    //     // console.log(filePath)
    //     const storageRef = this.storage.ref(filePath);
    //     // console.log(storageRef)
    //     const uploadTask = this.storage.upload(filePath, pet.imagem.file);
    //     // console.log(uploadTask)

    //     uploadTask.snapshotChanges().pipe(
    //         finalize(() => {
    //             storageRef.getDownloadURL().subscribe(downloadURL => {
    //                 // pet.imagem.url = downloadURL;
    //                 // pet.imagem.nome = pet.imagem.file.name;
    //                 this.downloadUrl = downloadURL

    //             });
    //         })
    //     ).subscribe();

    //     console.log('url'+ this.downloadUrl)

    //     const petData: Pet = {
    //         id: this.id,
    //         nome: pet.nome,
    //         data_nascimento: pet.data_nascimento,
    //         raca: pet.raca,
    //         genero: pet.genero,
    //         tipo_pet: pet.tipo_pet,
    //         usuario_uid: this.parsedUser.uid,
    //         imagem: this.downloadUrl
    //     }

    //     return petRef.set(petData, {
    //         merge: true,

    //     });
    // }

    // pushFileToStorage(file: Arquivo) {
    //     const filePath = `${this.id}/${file.file.name}`;
    //     const storageRef = this.storage.ref(filePath);
    //     const uploadTask = this.storage.upload(filePath, file.file);

    //     uploadTask.snapshotChanges().pipe(
    //         finalize(() => {
    //             storageRef.getDownloadURL().subscribe(downloadURL => {
    //                 file.url = downloadURL;
    //                 file.nome = file.file.name;
    //                 console.log(downloadURL)
    //             });
    //         })
    //     ).subscribe();

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
}