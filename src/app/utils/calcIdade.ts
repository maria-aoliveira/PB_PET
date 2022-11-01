import * as moment from "moment";

export default function calcIdade(dataNasc: string) {
    const momentDataNasc = moment(dataNasc);
    return moment().diff(momentDataNasc, "years");
} 