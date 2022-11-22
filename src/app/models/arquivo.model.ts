export class Arquivo{
    id: string;
    nome: string;
    url: string;
    file: File;

    constructor(file: File) {
        this.file = file;
      }
}