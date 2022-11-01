import { Alimentacao } from "./alimentacao.model";
import { Comportamento } from "./comportamento.model";
import { Exame } from "./exame.model";
import { Medicamento } from "./medicamento.model";
import { Peso } from "./peso.model";
import { Sintoma } from "./sintoma.model";
import { Vacina } from "./vacina.model";

export class Pet {
    public id: string;
    public nome: string;
    public data_nascimento: Date;
    public raca: string;
    public genero: string;
    public tipo_pet: number;
    public usuario_uid: string;
    public comportamentos?: Comportamento[];
    public sintomas?: Sintoma[];
    public exames?: Exame[];
    public pesos?: Peso[];
    public alimentacao?: Alimentacao[];
    public medicamentos?: Medicamento[];
    public vacinas?: Vacina[];

    public idade?(): number {
        console.log(new Date(new Date().getDate() - this.data_nascimento.getDate()).getFullYear())
        return new Date(new Date().getDate() - this.data_nascimento.getDate()).getFullYear();
    }
}